import { useEffect, useState } from 'react';
import axiosInstance from '../axiosApi';
import { useAppContext } from '../lib/contextLib';
import { v4 as uuidv4 } from 'uuid';
import { Card } from 'react-bootstrap';
import './GroceryPage.css';

function GroceryPage() {
	const [recipes, setRecipes] = useState([]);
	// Get active plan from current user data
	const { currentUser } = useAppContext();
	const activePlanId = currentUser.active_plan;

	// Fetch active plan
	const fetchActivePlan = async () => {
		try {
			const response = await axiosInstance.get(`/plans/${activePlanId}`);
			// console.log('ACTIVE PLAN', response.data);
			setRecipes(recipesOfTheDay(response.data));
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchActivePlan();
	}, []);

	// Prepare for active table row
	const currentdate = new Date();
	let currentWeekDay = currentdate.getDay();

	// Get recipesOfTheDay
	const recipesOfTheDay = (plan) => {
		const recipes = [];
		plan.meals.forEach((planDay) => {
			if (planDay.day === currentWeekDay) {
				planDay.recipes.forEach((recipe) => recipes.push(recipe));
			}
		});
		console.log(recipes);
		return recipes;
	};

	return (
		<div className="GroceryPage">
			<div className="grocery-day">
				<h4>Grocery of the day</h4>
				{recipes.map((recipe) => {
					return (
						<Card
							className="grocery-day-recipe-card"
							key={uuidv4()}
						>
							<Card.Header>
								<b>{recipe.title}</b>
							</Card.Header>
							<Card.Body>
								{recipe.recipe_ingredients.map((recipe_ing) => {
									return (
										<div key={uuidv4()}>
											{recipe_ing.ingredient.name}:{' '}
											{recipe_ing.quantity}{' '}
											{recipe_ing.ingredient.unit}
										</div>
									);
								})}
							</Card.Body>
						</Card>
					);
				})}
			</div>
			<div className="grocery-week">
				<h4>Grocery of the week</h4>
			</div>
		</div>
	);
}

export default GroceryPage;
