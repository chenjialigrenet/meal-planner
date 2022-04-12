import { useEffect, useState } from 'react';
import axiosInstance from '../axiosApi';
import { useAppContext } from '../lib/contextLib';
import { v4 as uuidv4 } from 'uuid';
import { FaRegSquare, FaSquare } from 'react-icons/fa';

import './GroceryPage.css';

function GroceryPage() {
	const [groupedDayIngredients, setGroupedDayIngredients] = useState([]);
	const [groupedWeekIngredients, setGroupedWeekIngredients] = useState([]);
	const [selectedIndexes, setSelectedIndexes] = useState([]);
	const [isSelected, setIsSelected] = useState(false);

	// Get active plan from current user data
	const { currentUser } = useAppContext();
	const activePlanId = currentUser.active_plan;

	// Prepare for active table row
	const currentdate = new Date();
	let currentWeekDay = currentdate.getDay();

	// Get recipe_ingredients of the DAY
	const recipeIngredientsOfTheDay = (plan) => {
		const dayRecipeIngredients = [];
		plan.meals.forEach((planDay) => {
			if (planDay.day === currentWeekDay) {
				planDay.recipes.forEach((recipe) =>
					dayRecipeIngredients.push(...recipe.recipe_ingredients)
				);
			}
		});
		// console.log('RecipeIngredientsOfTheDay', dayRecipeIngredients);
		return dayRecipeIngredients;
	};

	//Get recipe_ingredients of the WEEK
	const recipeIngredientsOfTheWeek = (plan) => {
		const weekRecipeIngredients = [];
		plan.meals.forEach((planDay) => {
			planDay.recipes.forEach((recipe) =>
				weekRecipeIngredients.push(...recipe.recipe_ingredients)
			);
		});
		// console.log('RecipeIngredientsOfTheWeek', weekRecipeIngredients.flat());
		return weekRecipeIngredients;
	};

	// Fetch active plan
	const fetchActivePlan = async () => {
		try {
			const response = await axiosInstance.get(`/plans/${activePlanId}`);
			const activePlan = response.data;
			// console.log('ACTIVE PLAN', activePlan);

			const dayIngredients = recipeIngredientsOfTheDay(activePlan);
			const weekIngredients = recipeIngredientsOfTheWeek(activePlan);

			//// DAY
			const groupedDayIngredients = {};
			dayIngredients.forEach((ingredient) => {
				if (!groupedDayIngredients[ingredient.ingredient.id]) {
					groupedDayIngredients[ingredient.ingredient.id] = {
						ingredient: ingredient.ingredient,
						quantity: 0,
					};
				}

				groupedDayIngredients[ingredient.ingredient.id].quantity +=
					ingredient.quantity;
			});

			// const groupedIngredients = ingredients.reduce(
			// 	(groupedIngredients, ing) => {
			// 		if (!groupedIngredients[ing.ingredient.id]) {
			// 			groupedIngredients[ing.ingredient.id] = {
			// 				ingredient: ing.ingredient,
			// 				quantity: 0,
			// 			};
			// 		}
			// 		groupedIngredients[ing.ingredient.id].quantity +=
			// 			ing.quantity;
			// 		return groupedIngredients;
			// 	},
			// 	{}
			// );
			setGroupedDayIngredients(Object.values(groupedDayIngredients));

			//// WEEK
			const groupedWeekIngredients = {};
			weekIngredients.forEach((ing) => {
				if (!groupedWeekIngredients[ing.ingredient.id]) {
					groupedWeekIngredients[ing.ingredient.id] = {
						ingredient: ing.ingredient,
						quantity: 0,
					};
				}

				groupedWeekIngredients[ing.ingredient.id].quantity +=
					ing.quantity;
			});
			setGroupedWeekIngredients(Object.values(groupedWeekIngredients));
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchActivePlan();
	}, []);

	const handleChangeIcon = (index) => {
		if (selectedIndexes.includes(index) === false) {
			setSelectedIndexes([...selectedIndexes, index]);
		} else {
			setSelectedIndexes(
				selectedIndexes.filter((el) => {
					return el !== index;
				})
			);
		}
	};

	return (
		<div className="GroceryPage">
			<div className="grocery-day col">
				<h4>Grocery of the day</h4>
				{groupedDayIngredients.map((ing, index) => {
					return (
						<div key={index}>
							<span onClick={() => handleChangeIcon(index)}>
								{selectedIndexes.includes(index) ? (
									<FaSquare />
								) : (
									<FaRegSquare />
								)}
							</span>{' '}
							{ing.ingredient.name}: {ing.quantity} (
							{ing.ingredient.unit})
						</div>
					);
				})}
			</div>
			<div className="grocery-week col">
				<h4>Grocery of the week</h4>
				{groupedWeekIngredients.map((ing, index) => {
					return (
						<div key={index}>
							<span onClick={() => handleChangeIcon(index)}>
								{selectedIndexes.includes(index) ? (
									<FaSquare />
								) : (
									<FaRegSquare />
								)}
							</span>{' '}
							{ing.ingredient.name}: {ing.quantity} (
							{ing.ingredient.unit})
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default GroceryPage;
