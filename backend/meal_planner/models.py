from django.db import models



class User(models.Model):
    username = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    photo = models.ImageField(upload_to='users')
    

class Plan(models.Model):
    title = models.CharField(max_length=200)
    creation_date = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey('User', on_delete=models.CASCADE)


class Meal(models.Model):
    plan = models.ForeignKey('Plan', on_delete=models.CASCADE)
    recipes = models.ManyToManyField('Recipe')

    BREAKFAST = 1
    LUNCH = 2
    DINNER = 3
    DESSERT = 4
    MEAL_CHOICES = [
       (BREAKFAST, ('breakfast')),
       (LUNCH, ('lunch')),
       (DINNER, ('dinner')),
       (DESSERT, ('dessert/snacks')),
   ]
    name = models.PositiveSmallIntegerField(
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
        (MONDAY, ('monday')),
        (TUESDAY, ('tuesday')),
        (WEDNESDAY, ('wednesday')),
        (THURSDAY, ('thursday')),
        (FRIDAY, ('friday')),
        (SATURDAY, ('saturday')),
        (SUNDAY, ('sunday')),
    ]
    date = models.PositiveSmallIntegerField(
        choices=DAY_CHOICES,
        default=MONDAY,
    )
    

class Recipe(models.Model):
    title = models.CharField(max_length=200)
    summary = models.CharField(max_length=600)
    serves = models.IntegerField()
    cooking_tempreture = models.FloatField()
    cooking_time = models.IntegerField()
    prep_time = models.IntegerField()
    ingredients = models.ManyToManyField('Ingredient')
    instructions = models.TextField()
    photo = models.ImageField(upload_to='recipe')
    creation_date = models.DateTimeField(auto_now_add=True)
    
    BEGINNER = 1 
    EASY = 2
    NORMAL = 3
    HARD = 4
    EXPERT = 5
    DIFFICULTY_CHOICES = [
        (BEGINNER, ('1-beginner')),
        (EASY, ('2-easy')),
        (NORMAL, ('3-normal')),
        (HARD, ('4-hard')),
        (EXPERT, ('5-expert')),
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
    UNIT_CHOICES = (
        (PCS, ('pices')),
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
    )
    unit = models.PositiveSmallIntegerField(
        choices=UNIT_CHOICES,
        default=PCS,
    )
    












