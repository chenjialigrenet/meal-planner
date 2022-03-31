from rest_framework import serializers
from .models import *
import pdb

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'photo', 'date_joined']
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)  # as long as the fields are the same, we can just use this
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


# Helper method
class KeyValueField(serializers.Field):
    # A field that takes a field's value as the key and returns
    # the associated value for serialization 

    labels = {}
    inverted_labels = {}

    def __init__(self, labels, *args, **kwargs):
        self.labels = {}
        # Check to make sure the labels dict is reversible, otherwise
        # deserialization may produce unpredictable results
        inverted = {}
        for k,v in labels:
            self.labels[k] = v
            if v in inverted:
                raise ValueError(
                    'The field is not deserializable with the given labels.'
                    ' Please ensure that labels map 1:1 with values'
                )
            inverted[v] = k
        self.inverted_labels = inverted
        return super(KeyValueField, self).__init__(*args, **kwargs)

    def to_representation(self, obj):
        if type(obj) is list:
            return [self.labels.get(o, None) for o in obj]
        else:
            return self.labels.get(obj, None)

    def to_internal_value(self, data):
        if type(data) is list:
            return [self.inverted_labels.get(o, None) for o in data]
        else:
            return self.inverted_labels.get(data, None)


class IngredientSerializer(serializers.ModelSerializer):
    unit = KeyValueField(labels=Ingredient.UNIT_CHOICES)

    class Meta:
        model = Ingredient
        fields = ['id', 'name', 'unit']

    # From frontend to Django
    def to_internal_value(self, data):
        if isinstance(data, Ingredient):
            return data 
        else: # Default behaviour
            return super().to_internal_value(data)


class RecipeIngredientSerializer(serializers.ModelSerializer):
    ingredient = IngredientSerializer()
    class Meta:
        model = RecipeIngredient
        fields = ['id', 'ingredient', 'quantity']
    # From frontend to Django
    def to_internal_value(self, data):
        if data["id"]:
            recipe_ingredient = RecipeIngredient.objects.get(pk=data["id"])
        else:
            recipe_ingredient = RecipeIngredient() # If no data, create an empty instance
        
        if data["ingredient"]: # Prepare ingredient attribute without saving
            recipe_ingredient.ingredient =  Ingredient.objects.get(pk=data['ingredient'])
        
        if data["quantity"]: # Prepare quantity attribut without saving
            recipe_ingredient.quantity = data["quantity"]

        return recipe_ingredient


class RecipeSerializer(serializers.ModelSerializer):
    recipe_ingredients = RecipeIngredientSerializer(many=True)
    class Meta:
        model = Recipe
        fields = ['id', 'title', 'summary', 'serves', 'cooking_temperature', 'cooking_time', 'prep_time', 'recipe_ingredients', 'instructions', 'photo', 'creation_date', 'difficulty']

    def create(self, validated_data):
        recipe_ingredients = validated_data.pop("recipe_ingredients")
        recipe = Recipe.objects.create(**validated_data)
        for recipe_ingredient in recipe_ingredients:
            recipe_ingredient.recipe = recipe 
            recipe_ingredient.save()
        return recipe 

    def update(self, instance, validated_data):
        recipe_ingredients = validated_data.pop("recipe_ingredients")
        if recipe_ingredients:
            for recipe_ingredient in recipe_ingredients:
                if recipe_ingredient.id:
                    recipe_ingredient.save()
                else:
                    recipe_ingredient.recipe = instance 
                    recipe_ingredient.save()
        for name, value in validated_data.items():
            setattr(instance, name, value)
        instance.save()

        return instance 


class MealSerializer(serializers.ModelSerializer):
    recipes = RecipeSerializer(many=True)
    class Meta:
        model = Meal
        fields = ['id', 'plan', 'recipes', 'day', 'meal']


class PlanSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    meals = MealSerializer(many=True, read_only=True)
    class Meta:
        model = Plan
        fields = ['id', 'title', 'creation_date', 'user', 'meals']

    # TODO missing meals
    def create(self, validated_data):
            plan = Plan.objects.create(
                title = validated_data["title"],
                user = self.context['request'].user
            )
            for (day, day_label) in Meal.DAY_CHOICES:
                for (meal, meal_label) in Meal.MEAL_CHOICES:
                    recipe = Recipe.objects.order_by("?").first()
                    meal = Meal.objects.create(
                        plan = plan,
                        day = day,
                        meal = meal
                    )
                    meal.recipes.add(recipe)
            return plan 
    