import React from 'react';
import { Link } from 'react-router-dom';
import './Recipe.css';

function RecipePage() {
	return (
		<div className="Recipe">
			<Link to="/ingredients/create">Add Ingredient</Link>
			<Link to="/ingredients">All Ingredients</Link>
			<Link to="/">Create Recipe</Link>
			<Link to="/">All Recipes</Link>
		</div>
	);
}

export default RecipePage;
