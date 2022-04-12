import { useEffect, useState } from 'react';
import axiosInstance from '../axiosApi';
import { useAppContext } from '../lib/contextLib';
import { v4 as uuidv4 } from 'uuid';
import { FaRegSquare, FaSquare } from 'react-icons/fa';
import { Card, Tabs, Tab } from 'react-bootstrap';
import './GroceryPage.css';

function GroceryPage() {
	const [groupedDayIngredients, setGroupedDayIngredients] = useState([]);
	const [groupedWeekIngredients, setGroupedWeekIngredients] = useState([]);
	const [selectedIndexes, setSelectedIndexes] = useState([]);
	const [tabKey, setTabKey] = useState('day');

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

	const handleChangeIcon = (id) => {
		if (selectedIndexes.includes(id) === false) {
			setSelectedIndexes([...selectedIndexes, id]);
		} else {
			setSelectedIndexes(
				selectedIndexes.filter((selectedIndex) => {
					return selectedIndex !== id;
				})
			);
		}
	};

	return (
		<div className="GroceryPage">
			<Tabs
				activeKey={tabKey}
				onSelect={(k) => {
					setTabKey(k);
					setSelectedIndexes([]);
				}}
				className="mb-3"
			>
				<Tab eventKey="day" title="Day">
					<Card className="grocery-day">
						<Card.Title>Grocery of the day</Card.Title>
						{groupedDayIngredients.map((ing) => {
							return (
								<div key={uuidv4()}>
									<span
										onClick={() =>
											handleChangeIcon(ing.ingredient.id)
										}
									>
										{selectedIndexes.includes(
											ing.ingredient.id
										) ? (
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
					</Card>
				</Tab>
				<Tab eventKey="week" title="Week">
					<Card className="grocery-week">
						<Card.Title>Grocery of the week</Card.Title>
						{groupedWeekIngredients.map((ing) => {
							return (
								<div key={uuidv4()}>
									<span
										onClick={() =>
											handleChangeIcon(ing.ingredient.id)
										}
									>
										{selectedIndexes.includes(
											ing.ingredient.id
										) ? (
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
					</Card>
				</Tab>
			</Tabs>
		</div>
	);
}

export default GroceryPage;
