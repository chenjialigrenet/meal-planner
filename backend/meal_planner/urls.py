from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from meal_planner import views
from rest_framework_simplejwt import views as jwt_views
from .views import *

router = routers.DefaultRouter()
router.register(r"users", views.UserView, 'user') # TODO can do retrieve and put, ?? remove create and delete
router.register(r"plans", views.PlanView, 'plan')
router.register(r"meals", views.MealView, 'meal')
router.register(r"recipes", views.RecipeView, 'recipe')
router.register(r"ingredients", views.IngredientView, 'ingredient')

urlpatterns = router.urls + [
    path('user/create/', views.UserCreate.as_view(), name='create_user'),
    # path('ingredients/', IngredientListApiView.as_view(), name="ingredient_list"), # show all ingredients and create new ingredient
    # path('ingredients/<int:ingredient_id>', IngredientDetailApiView.as_view(), name="ingredient_detail"), # show, update, delete one ingredient
    path('token/obtain/', jwt_views.TokenObtainPairView.as_view(), name='token_create'),  # override sjwt stock token
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    # path('hello/', views.HelloWorld.as_view(), name="hello") # test
    path('recipes/create/', RecipePhotoUpload.as_view())
]