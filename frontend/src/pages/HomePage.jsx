import { useEffect, useState } from 'react';
import axiosInstance from '../axiosApi';
import { v4 as uuidv4 } from 'uuid';
import './HomePage.css';

function Home() {
	const [plans, setPlans] = useState([]);
	const [recipes, setRecipes] = useState([]);

	const fetchIndexData = async () => {
		try {
			// const data = await axiosInstance.get('hello/');
			await axiosInstance.get('/');
			// console.log(data);
		} catch (err) {
			console.log(err);
		}
	};

	// Fetch all plans
	const fetchAllPlans = async () => {
		try {
			const response = await axiosInstance.get(`/plans/`);
			// console.log('ALL PLANS', response.data.plans);
			setPlans(response.data.plans);
			setRecipes(recipesOfTheDay(response.data.plans));
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchIndexData();
		fetchAllPlans();
	}, []);

	// Prepare for active table row
	const currentdate = new Date();
	let currentWeekDay = currentdate.getDay();

	// Get recipesOfTheDay from all plans
	const recipesOfTheDay = (plans) => {
		const recipes = [];
		plans.forEach((plan) => {
			plan.meals.forEach((planDay) => {
				if (planDay.day === currentWeekDay) {
					planDay.recipes.forEach((recipe) => recipes.push(recipe));
				}
			});
		});
		return recipes;
	};

	return (
		<div className="Home">
			<div className="lander">
				<h1>Recipes of the day</h1>
				{recipes.map((recipe) => (
					<div key={uuidv4()}>{recipe.title}</div>
				))}
			</div>
		</div>
	);
}

export default Home;
