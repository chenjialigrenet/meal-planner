import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import NotFound from './components/utilities/NotFound';
import PlanPage from './pages/PlanPage';
import RecipePage from './pages/RecipePage';
import IngredientForm from './components/IngredientForm';
import Ingredients from './components/Ingredients';
import RecipeForm from './components/RecipeForm';
import Recipes from './components/Recipes';
import UserPage from './pages/UserPage';
import PlanForm from './components/PlanForm';
import Plans from './components/Plans';
import PlanDetails from './components/PlanDetails';
// import PlanUpdateForm from './components/PlanUpdateForm';
import RecipeDetails from './components/RecipeDetails';

function AppRoutes() {
	return (
		<Routes>
			<Route exact path="/" element={<HomePage />} />
			<Route exact path="/signup" element={<SignupPage />} />
			<Route exact path="/login" element={<LoginPage />} />
			<Route exact path="/plan" element={<PlanPage />} />
			<Route exact path="/recipe" element={<RecipePage />} />
			<Route exact path="/user" element={<UserPage />} />
			<Route
				exact
				path="/ingredients/create"
				element={<IngredientForm />}
			/>
			<Route exact path="/ingredients" element={<Ingredients />} />
			<Route exact path="/recipes/create" element={<RecipeForm />} />
			<Route exact path="/recipes" element={<Recipes />} />
			<Route path="/recipes/:recipeId" element={<RecipeDetails />} />
			<Route path="/recipes/update/:recipeId" element={<RecipeForm />} />
			<Route exact path="/plans/create" element={<PlanForm />} />
			<Route exact path="/plans" element={<Plans />} />
			<Route path="/plans/:planId" element={<PlanDetails />} />
			<Route path="/plans/update/:planId" element={<PlanForm />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}

export default AppRoutes;
