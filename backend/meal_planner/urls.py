from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from meal_planner import views
from rest_framework_simplejwt import views as jwt_views

router = routers.DefaultRouter()
router.register(r"users", views.UserView, 'user')
router.register(r"plans", views.PlanView, 'plan')
router.register(r"meals", views.MealView, 'meal')
router.register(r"recipes", views.RecipeView, 'recipe')
router.register(r"ingredients", views.IngredientView, 'ingredient')

urlpatterns = router.urls + [
    path('user/create/', views.UserCreate.as_view(), name="create_user"),
    path('token/obtain/', jwt_views.TokenObtainPairView.as_view(), name='token_create'),  # override sjwt stock token
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('hello/', views.HelloWorld.as_view(), name="hello")
]