import './PlanForm.css';
import { Form, Table } from 'react-bootstrap';
import { AsyncPaginate } from 'react-select-async-paginate';
import { useNavigate, useParams } from 'react-router-dom';
import useFormFields from '../../lib/hooksLib';
import { useState, useEffect } from 'react';
import LoaderButton from '../utilities/LoaderButton';
import axiosInstance from '../../axiosApi';

function PlanForm() {
	const params = useParams();
	const isCreate = !params.planId;

	// Axios fetching recipe data
	const [isFetching, setIsFetching] = useState(true);
	// Spinner on the submit button
	const [isLoading, setIsLoading] = useState(false);
	// Redirect
	const navigate = useNavigate();

	// GET one plan
	const fetchPlan = async () => {
		setIsFetching(true);
		try {
			const response = await axiosInstance.get(
				`/plans/${params.planId}/`
			);
			setFieldsValues(response.data);

			console.log('PLAN DATA', response.data);
			console.log('MEALS', response.data.meals);

			setIsFetching(false);
		} catch (err) {
			console.log(err);
			setIsFetching(false);
		}
	};

	useEffect(() => {
		if (!isCreate) {
			fetchPlan();
		}
	}, []);

	const [fields, handleFieldChange, changeFieldValue, setFieldsValues] =
		useFormFields({
			title: '',
			id: null,
			meals: [],
		});

	// React Select with AsyncPagination
	const prepareRecipeValue = (recipe) => {
		if (!recipe) {
			return null;
		}

		recipe.value = recipe.title;
		recipe.label =
			recipe.title[0].toUpperCase() + recipe.title.substring(1);

		return recipe;
	};

	async function loadRecipeOptions(searchQuery, loadedOptions) {
		console.log('LOADED', loadedOptions);
		const page = Math.floor(loadedOptions.length / 5) + 1;
		const response = await axiosInstance.get(
			`/recipes/?query=${searchQuery}&page=${page}`
		);
		const recipeOptions = response.data.recipes;
		recipeOptions.forEach(prepareRecipeValue);
		return {
			options: recipeOptions,
			hasMore: page < response.data.total_pages,
		};
	}

	const handleUpdateRecipe = (meal, selectedRecipe) => {
		meal.recipes = [selectedRecipe];
		setFieldsValues(JSON.parse(JSON.stringify(fields)));
	};

	// CREATE one plan
	const handleCreatePlan = async (event) => {
		event.preventDefault();
		try {
			await axiosInstance.post('/plans/', {
				title: fields.title,
			});
			navigate('/plan');
		} catch (err) {
			console.log(err);
		}
	};

	// UPDATE one plan
	const handleUpdatePlan = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			await axiosInstance.put(`/plans/${params.planId}/`, {
				title: fields.title,
				meals: fields.meals.map((meal) => {
					if (meal.id) {
						return {
							id: meal.id,
							day: meal.day,
							meal: meal.meal,
							recipes: meal.recipes.map((recipe) => {
								return { id: recipe.id, title: recipe.title };
							}),
						};
					}
				}),
			});
			setIsLoading(false);
			navigate(`/plans/${params.planId}`);
		} catch (err) {
			console.log(err);
			setIsLoading(false);
		}
	};

	// TODO data transform, group by day
	// 	const plan = [{day: 1, meal: 1}, { day: 1, meal: 2}, { day: 2, meal: 1}, { day: 2, meal: 2}]
	const daysOfWeek = [
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
		'Sunday',
	];

	const groupedMeals = {};
	fields.meals.forEach((planDay) => {
		if (!groupedMeals[planDay.day]) {
			groupedMeals[planDay.day] = [];
		}
		groupedMeals[planDay.day].push(planDay);
	});
	const groupedMealsArray = Object.values(groupedMeals);
	console.log('GROUPED MEALS', groupedMeals);

	return (
		<div>
			<h3>
				{isCreate
					? 'Create Plan'
					: `Update Plan (ID: ${params.planId})`}
			</h3>
			{!isFetching && (
				<Form onSubmit={isCreate ? handleCreatePlan : handleUpdatePlan}>
					<Form.Group controlId="title">
						<Form.Label>Plan title</Form.Label>
						<Form.Control
							type="text"
							value={fields.title}
							onChange={handleFieldChange}
							name="title"
						/>
					</Form.Group>

					{isCreate === false ? (
						<Form.Group controlId="meals">
							<Form.Label>Meals</Form.Label>
							{/* <Table bordered>
								<thead style={{ backgroundColor: 'lightgrey' }}>
									<tr>
										<th>Day</th>
										<th>Breakfast</th>
										<th>Lunch</th>
										<th>Dinner</th>
										<th>Dessert</th>
									</tr>
								</thead>
								<tbody>
									{groupedMealsArray.map(
										(dayMeals, index) => {
											console.log(dayMeals);
											return (
												<tr key={index}>
													<td>{index + 1}</td>
													<td>
														{
															dayMeals[0]
																.recipes[0]
																.title
														}
													</td>
												</tr>
											);
										}
									)}
								</tbody>
							</Table> */}
							<ul>
								{fields.meals.map((meal) => {
									return (
										<li key={meal.id}>
											Day {meal.day} | Meal {meal.meal}
											<AsyncPaginate
												value={prepareRecipeValue(
													meal.recipes[0]
												)}
												loadOptions={loadRecipeOptions}
												onChange={(recipe) =>
													handleUpdateRecipe(
														meal,
														recipe
													)
												}
											/>
										</li>
									);
								})}
							</ul>
						</Form.Group>
					) : null}

					<LoaderButton
						type="submit"
						isLoading={isLoading}
						// disabled={!validateForm()}
					>
						{isCreate ? 'Create' : 'Update'}
					</LoaderButton>
				</Form>
			)}
		</div>
	);
}

export default PlanForm;
