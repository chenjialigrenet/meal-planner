import { useEffect, useState } from 'react';
import axiosInstance from '../axiosApi';
import { v4 as uuidv4 } from 'uuid';
import { useAppContext } from '../lib/contextLib';
import { Card } from 'react-bootstrap';
import RecipeDetailsModal from '../components/modals/RecipeDetailsModal';
import './HomePage.css';

function Home() {
	const [recipes, setRecipes] = useState([]);
	// Get active plan from current user data
	const { currentUser } = useAppContext();
	const activePlanId = currentUser.active_plan;
	const [activePlanTitle, setActivePlanTitle] = useState(null);
	// Prepare for modal
	const [shownRecipe, setShownRecipe] = useState(null);
	// Prepare for active table row
	const currentdate = new Date();
	let currentWeekDay = currentdate.getDay();

	useEffect(() => {
		// Fetch active plan
		const fetchActivePlan = async () => {
			try {
				const response = await axiosInstance.get(`/plans/${activePlanId}`);
				// console.log('ACTIVE PLAN', response.data);
				setRecipes(recipesOfTheDay(response.data));
				setActivePlanTitle(response.data.title);
			} catch (err) {
				console.log(err);
			}
		};
		fetchActivePlan();

		// Get recipesOfTheDay
		const recipesOfTheDay = (plan) => {
			const recipes = [];
			plan.meals.forEach((planDay) => {
				if (planDay.day === currentWeekDay) {
					planDay.recipes.forEach((recipe) => recipes.push(recipe));
				}
			});
			// console.log(recipes);
			return recipes;
		};
	}, [activePlanId, currentWeekDay]);

	return (
		<div className="Home">
			<div className="lander">
				<h3>Recipes of the day </h3>
				<p>(from plan: {activePlanTitle})</p>
				{recipes.map((recipe) => (
					<Card className="recipes-of-the-day-card" key={uuidv4()}>
						<Card.Header>
							<button
								className="recipe-modal-fake-btn"
								onClick={() => {
									setShownRecipe(recipe);
								}}
							>
								{recipe.title}
							</button>
						</Card.Header>
					</Card>
				))}
			</div>
			{shownRecipe && <RecipeDetailsModal onHide={() => setShownRecipe(null)} recipe={shownRecipe} />}
		</div>
	);
}

export default Home;
