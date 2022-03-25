import React from 'react';
import { Link } from 'react-router-dom';
import './Recipe.css';
import Recipes from '../components/Recipes';
import Ingredients from '../components/Ingredients';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function RecipePage() {
	return (
		<div className="Recipe">
			<Row>
				<Col md="8">
					<div>
						<Link to="/recipes/create">Create Recipe</Link>
					</div>
					<Recipes />
				</Col>
				<Col md="4">
					<div>
						<Link to="/ingredients/create">Add Ingredient</Link>
					</div>
					<Ingredients />
				</Col>
			</Row>

			{/* <Link to="/ingredients">All Ingredients</Link>
			<Link to="/ingredients/create">Add Ingredient</Link>
			<Link to="/recipes">All Recipes</Link>
			<Link to="/recipes/create">Create Recipe</Link> */}
		</div>
	);
}

export default RecipePage;
