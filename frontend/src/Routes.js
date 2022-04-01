import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import NotFound from './components/NotFound';
import Plan from './pages/Plan';
import Recipe from './pages/Recipe';
import IngredientForm from './components/IngredientForm';
import Ingredients from './components/Ingredients';
import RecipeForm from './components/RecipeForm';
import Recipes from './components/Recipes';
import User from './pages/User';
import PlanForm from './components/PlanForm';
import Plans from './components/Plans';
import PlanDetails from './components/PlanDetails';
import RecipeDetails from './components/RecipeDetails';
import RecipeUpdateForm from './components/RecipeUpdateForm';

function AppRoutes() {
	return (
		<Routes>
			<Route exact path="/" element={<Home />} />
			<Route exact path="/signup" element={<Signup />} />
			<Route exact path="/login" element={<Login />} />
			<Route exact path="/plan" element={<Plan />} />
			<Route exact path="/recipe" element={<Recipe />} />
			<Route exact path="/user" element={<User />} />
			<Route
				exact
				path="/ingredients/create"
				element={<IngredientForm />}
			/>
			<Route exact path="/ingredients" element={<Ingredients />} />
			<Route exact path="/recipes/create" element={<RecipeForm />} />
			<Route exact path="/recipes" element={<Recipes />} />
			<Route path="/recipes/:recipeId" element={<RecipeDetails />} />
			<Route
				path="/recipes/update/:recipeId"
				element={<RecipeUpdateForm />}
			/>
			<Route exact path="/plans/create" element={<PlanForm />} />
			<Route exact path="/plans" element={<Plans />} />
			<Route path="/plans/:planId" element={<PlanDetails />} />
			<Route path="/plans/update/:planId" element={<PlanForm />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}

export default AppRoutes;
