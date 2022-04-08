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
	// Prepare for modal
	const [shownRecipe, setShownRecipe] = useState(null);

	const fetchIndexData = async () => {
		try {
			// const data = await axiosInstance.get('hello/');
			await axiosInstance.get('/');
			// console.log(data);
		} catch (err) {
			console.log(err);
		}
	};

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
		fetchIndexData();
		fetchActivePlan();
	}, []);

	// Prepare for active table row
	const currentdate = new Date();
	let currentWeekDay = currentdate.getDay();

	// Get recipesOfTheDay from all plans
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
		<div className="Home">
			<div className="lander">
				<h3>Recipes of the day (from plan: {activePlanId})</h3>
				{recipes.map((recipe) => (
					<Card key={uuidv4()}>
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
			{shownRecipe && (
				<RecipeDetailsModal
					onHide={() => setShownRecipe(null)}
					recipe={shownRecipe}
				/>
			)}
		</div>
	);
}

export default Home;
