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


class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan
        fields = ['id', 'title', 'creation_date', 'user']

    
class MealSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meal
        fields = ['id', 'plan', 'recipes', 'name', 'date']


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
        if data['ingredient']:
            data['ingredient'] = Ingredient.objects.get(pk=data['ingredient'])
        return super().to_internal_value(data) # Default behaviour


class RecipeSerializer(serializers.ModelSerializer):
    recipe_ingredients = RecipeIngredientSerializer(many=True)
    class Meta:
        model = Recipe
        fields = ['id', 'title', 'summary', 'serves', 'cooking_temperature', 'cooking_time', 'prep_time', 'recipe_ingredients', 'instructions', 'photo', 'creation_date', 'difficulty']

    def create(self, validated_data):
        recipe_ingredients = validated_data.pop("recipe_ingredients")
        recipe = Recipe.objects.create(**validated_data)
        for ingredient_attributes in recipe_ingredients:
            RecipeIngredient.objects.create(
                ingredient=ingredient_attributes["ingredient"], 
                recipe=recipe, 
                quantity=ingredient_attributes["quantity"]
            )
        return recipe 

