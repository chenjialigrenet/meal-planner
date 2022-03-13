from django.contrib import admin

from .models import User, Plan, Recipe, Meal, Ingredient

admin.site.register(User)
admin.site.register(Plan)
admin.site.register(Recipe)
admin.site.register(Meal)
admin.site.register(Ingredient)