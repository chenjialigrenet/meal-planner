from rest_framework import serializers
from .models import *

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


class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ['id', 'title', 'summary', 'serves', 'cooking_tempreture', 'cooking_time', 'prep_time', 'ingredients', 'instructions', 'photo', 'creation_date', 'difficulty']


class IngredientSerializer(serializers.ModelSerializer):
    # unit = serializers.ChoiceField(choices=Ingredient.UNIT_CHOICES)
    class Meta:
        model = Ingredient
        fields = ['id', 'name', 'unit']



class RecipeIngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipeIngredient
        fields = ['id', 'recipe', 'ingredient', 'quantity']