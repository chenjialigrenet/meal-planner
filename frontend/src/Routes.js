import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import NotFound from './components/NotFound';
import Plan from './components/Plan';
import Recipe from './components/Recipe';
import IngredientForm from './components/IngredientForm';
import Ingredients from './components/Ingredients';
import RecipeForm from './components/RecipeForm';
import Recipes from './components/Recipes';
import User from './components/User';

function AppRoutes() {
	return (
		<Routes>
			<Route exact path="/" element={<Home />} />
			<Route exact path="/signup" element={<Signup />} />
			<Route exact path="/login" element={<Login />} />
			<Route exact path="/plan" element={<Plan />} />
			<Route exact path="/recipe" element={<Recipe />} />
			<Route
				exact
				path="/ingredients/create"
				element={<IngredientForm />}
			/>
			<Route exact path="/ingredients" element={<Ingredients />} />
			<Route exact path="/recipes/create" element={<RecipeForm />} />
			<Route exact path="/recipes" element={<Recipes />} />
			<Route exact path="/user" element={<User />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}

export default AppRoutes;
