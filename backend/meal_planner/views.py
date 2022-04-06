from django.shortcuts import render
from rest_framework import viewsets, pagination
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import *
from .models import *
from django.db.models import Q


class CustomPlanPagination(pagination.PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 50
    page_query_param = 'page'

    def get_paginated_response(self, data):
        return Response({
            'count': self.page.paginator.count,
            'total_pages': self.page.paginator.num_pages,
            'plans': data
        })


class PlanView(viewsets.ModelViewSet):
    serializer_class = PlanSerializer
    pagination_class = CustomPlanPagination

    def get_queryset(self):
        queryset = Plan.objects.all().filter(user=self.request.user)
        query = self.request.query_params.get('query')
        if query:
            queryset = queryset.filter(title__icontains=query).distinct()
        return queryset.order_by('id')
    

class CustomRecipePagination(pagination.PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 50
    page_query_param = 'page'

    def get_paginated_response(self, data):
        return Response({
            'count': self.page.paginator.count,
            'total_pages': self.page.paginator.num_pages,
            'recipes': data
        })


class RecipeView(viewsets.ModelViewSet):
    serializer_class = RecipeSerializer
    pagination_class = CustomRecipePagination
    parse_classes = [MultiPartParser, FormParser]

    def get_queryset(self):
        queryset = Recipe.objects.all()
        query = self.request.query_params.get("query")
        if query:
            queryset = queryset.filter(
                Q(title__icontains=query)|
                Q(summary__icontains=query)|
                Q(instructions__icontains=query)
            ).distinct()
        return  queryset.order_by("id")


class MealView(viewsets.ModelViewSet):
    serializer_class = MealSerializer
    queryset = Meal.objects.all()


class IngredientView(viewsets.ModelViewSet):
    serializer_class = IngredientSerializer
    queryset = Ingredient.objects.all()

# CRUD example
# # Show all ingredients and create new ingredient
# class IngredientListApiView(APIView):
#     # add permission to check if user is authenticated
#     permission_classes = [permissions.IsAuthenticated]

#     def get(self, request):
#         # users are able to see all ingredients even though not created by themselves
#         ingredients = Ingredient.objects.all()
#         serializer = IngredientSerializer(ingredients, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)

#     def post(self, request):
#         data = {
#             'id': request.data.get('id'), 
#             'name': request.data.get('name'), 
#             'quantity': request.data.get('quantity'), 
#             'unit': request.data.get('unit'),
#             'user': request.user.id
#         }
#         serializer = IngredientSerializer(data=data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# # Show, update and delete one ingredient  
# class IngredientDetailApiView(APIView):
#     permission_classes = [permissions.IsAuthenticated]

#     # Helper method to get the object with given ingredient_id
#     def get_object(self, ingredient_id):
#         try:
#             return Ingredient.objects.get(id=ingredient_id)
#         except Ingredient.DoesNotExist:
#             return None
    
#     # Retrieve the ingredient with given ingredient_id
#     def get(self, request, ingredient_id):
#         ingredient_instance = self.get_object(ingredient_id)
#         if not ingredient_instance:
#             return Response(
#                 {"res": "Object with ingredient id does not exist"},
#                 status=status.HTTP_400_BAD_REQUEST
#             )
#         serializer = IngredientSerializer(ingredient_instance)
#         return Response(serializer.data, status=status.HTTP_200_OK)

#     # Update
#     def put(self, request, ingredient_id):
#         ingredient_instance = self.get_object(ingredient_id)
#         if not ingredient_instance:
#             return Response(
#                 {"res": "Object with ingredient id does not exist"},
#                 status=status.HTTP_400_BAD_REQUEST
#             )
#         data = {
#             'id': request.data.get('id'), 
#             'name': request.data.get('name'), 
#             'quantity': request.data.get('quantity'), 
#             'unit': request.data.get('unit'),
#             'user': request.user.id
#         }
#         serializer = IngredientSerializer(instance = ingredient_instance, data=data, partial = True)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     # Delete
#     def delete(self, request, ingredient_id):
#         ingredient_instance = self.get_object(ingredient_id)
#         if not ingredient_instance:
#             return Response(
#                 {"res": "Object with ingredient id does not exist"},
#                 status=status.HTTP_400_BAD_REQUEST
#             )
#         ingredient_instance.delete()
#         return Response(
#             {"res": "Object deleted!"},
#             status=status.HTTP_200_OK
#         )


class RecipeIngredientView(viewsets.ModelViewSet):
    serializer_class = RecipeIngredientSerializer
    queryset = RecipeIngredient.objects.all()


#TODO should not be able to remove user
class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class UserCreate(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format='json'):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserUpdate(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def put(self, request):
        user = request.user
        serializer = UserSerializer(instance=user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
       

# Auth test
# class HelloWorld(APIView):
#     def get(self, request):
#         return Response(data={"hello": "world"}, status=status.HTTP_200_OK)