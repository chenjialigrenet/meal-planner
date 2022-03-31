from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
import hashlib
import pdb

def upload_to(instance, filename):
    md5 = hashlib.md5(str(instance.title).encode('utf-8')).hexdigest()[0:5]
    return '{md5}/{filename}'.format(filename=filename,md5=md5)

class User(AbstractUser):
    # username = models.CharField(max_length=200)
    email = models.EmailField(unique=True)
    # password = models.CharField(max_length=200)
    photo = models.ImageField(_("Photo"),upload_to=upload_to, null=True, blank=True, default='default_user.png')
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']


class Plan(models.Model):
    title = models.CharField(max_length=200)
    creation_date = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey('User', on_delete=models.CASCADE)


class Meal(models.Model):
    plan = models.ForeignKey('Plan', on_delete=models.CASCADE, related_name='meals')
    recipes = models.ManyToManyField('Recipe')

    BREAKFAST = 1
    LUNCH = 2
    DINNER = 3
    DESSERT = 4
    MEAL_CHOICES = [
       (BREAKFAST, ('Breakfast')),
       (LUNCH, ('Lunch')),
       (DINNER, ('Dinner')),
       (DESSERT, ('Dessert/Snacks')),
   ]
    meal = models.PositiveSmallIntegerField(
        choices=MEAL_CHOICES,
        default=BREAKFAST,
    )

    MONDAY = 1
    TUESDAY = 2
    WEDNESDAY = 3
    THURSDAY = 4
    FRIDAY = 5
    SATURDAY = 6
    SUNDAY = 7
    DAY_CHOICES = [
        (MONDAY, ('Monday')),
        (TUESDAY, ('Tuesday')),
        (WEDNESDAY, ('Wednesday')),
        (THURSDAY, ('Thursday')),
        (FRIDAY, ('Friday')),
        (SATURDAY, ('Saturday')),
        (SUNDAY, ('Sunday')),
    ]
    day = models.PositiveSmallIntegerField(
        choices=DAY_CHOICES,
        default=MONDAY,
    )
    

class Recipe(models.Model):
    title = models.CharField(max_length=200)
    summary = models.CharField(max_length=600)
    serves = models.IntegerField()
    cooking_temperature = models.FloatField()
    cooking_time = models.IntegerField()
    prep_time = models.IntegerField()
    instructions = models.TextField()
    photo = models.ImageField(_("Photo"), upload_to=upload_to, blank=True, null=True, default='default.png')
    creation_date = models.DateTimeField(auto_now_add=True)
    
    BEGINNER = 1 
    EASY = 2
    NORMAL = 3
    HARD = 4
    EXPERT = 5
    DIFFICULTY_CHOICES = [
        (BEGINNER, ('1-Beginner')),
        (EASY, ('2-Easy')),
        (NORMAL, ('3-Normal')),
        (HARD, ('4-Hard')),
        (EXPERT, ('5-Expert')),
   ]
    difficulty = models.PositiveSmallIntegerField(
        choices=DIFFICULTY_CHOICES,
        default=BEGINNER,
    )


class Ingredient(models.Model):
    name = models.CharField(max_length=200)

    PCS = 1
    LB = 2
    OZ = 3
    MG = 4
    G = 5
    KG = 6
    ML = 7
    L = 8
    TSP = 9
    TBSP = 10
    FLOZ = 11
    CUP = 12
    DR = 13
    PN = 14
    UNIT_CHOICES = (
        (PCS, ('piece')),
        (LB, ('pound')),
        (OZ, ('once')),
        (MG, ('miligramme')),
        (G, ('gramme')),
        (KG, ('kilogramme')),
        (ML, ('mililiter/cc')),
        (L, ('liter')),
        (TSP, ('teaspoon')),
        (TBSP, ('tablespoon')),
        (FLOZ, ('fluid once')),
        (CUP, ('cup')),
        (DR, ('drop')),
        (PN, ('pinch'))
    )
    unit = models.PositiveSmallIntegerField(
        choices=UNIT_CHOICES,
        default=PCS,
    )
    

class RecipeIngredient(models.Model):
    recipe = models.ForeignKey('Recipe', on_delete=models.CASCADE, related_name="recipe_ingredients")
    ingredient = models.ForeignKey("Ingredient", on_delete=models.CASCADE)
    quantity = models.FloatField(max_length=30, blank=True, null=True)










