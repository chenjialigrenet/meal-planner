import { Form, Table } from 'react-bootstrap';
import { AsyncPaginate } from 'react-select-async-paginate';
import { useNavigate, useParams } from 'react-router-dom';
import useFormFields from '../../lib/hooksLib';
import { useState, useEffect } from 'react';
import LoaderButton from '../utilities/LoaderButton';
import axiosInstance from '../../axiosApi';
import { v4 as uuidv4 } from 'uuid';
import './PlanForm.css';

function PlanForm() {
	const params = useParams();
	const isCreate = !params.planId;

	// Spinner on the submit button
	const [isLoading, setIsLoading] = useState(false);
	// Redirect
	const navigate = useNavigate();

	// GET one plan
	const fetchPlan = async () => {
		try {
			const response = await axiosInstance.get(
				`/plans/${params.planId}/`
			);

			const planData = response.data;
			setFieldsValues(planData);
			console.log('PLAN DATA', planData);
			// console.log('MEALS', response.data.meals);
		} catch (err) {
			console.log(err);
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

	// Transform, group meals by day
	const groupedMeals = {};
	fields.meals.forEach((planDay) => {
		if (!groupedMeals[planDay.day]) {
			groupedMeals[planDay.day] = [];
		}
		groupedMeals[planDay.day].push(planDay);
	});
	const groupedMealsArray = Object.values(groupedMeals);
	// console.log('GROUPED MEALS', groupedMeals);

	const daysOfWeek = [
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
		'Sunday',
	];

	return (
		<div className="PlanForm">
			<h3>
				{isCreate
					? 'Create Plan'
					: `Update Plan (ID: ${params.planId} )`}
			</h3>
			{
				<Form onSubmit={isCreate ? handleCreatePlan : handleUpdatePlan}>
					{isCreate ? (
						<Form.Group controlId="title">
							<Form.Label>Plan Title</Form.Label>
							<Form.Control
								type="text"
								value={fields.title}
								onChange={handleFieldChange}
								name="title"
							/>
						</Form.Group>
					) : (
						<>
							<Form.Group>
								<Form.Label>Plan Title</Form.Label>
								<Form.Control
									type="text"
									value={fields.title}
									onChange={handleFieldChange}
									name="title"
								/>
							</Form.Group>
							<br />
							<Form.Group controlId="meals">
								<Table bordered>
									<thead
										style={{
											backgroundColor: 'lightgrey',
											textAlign: 'center',
										}}
									>
										<tr>
											<th>Day</th>
											<th>Breakfast</th>
											<th>Lunch</th>
											<th>Dinner</th>
											<th>Dessert</th>
										</tr>
									</thead>
									<tbody>
										{groupedMealsArray.map((row, index) => {
											return (
												<tr key={daysOfWeek[index]}>
													<td>{daysOfWeek[index]}</td>
													{row.map((meal) => {
														return meal
															.recipes[0] ===
															undefined ? (
															<td key={uuidv4()}>
																<AsyncPaginate
																	value={prepareRecipeValue(
																		meal
																			.recipes[0]
																	)}
																	loadOptions={
																		loadRecipeOptions
																	}
																	onChange={(
																		recipe
																	) =>
																		handleUpdateRecipe(
																			meal,
																			recipe
																		)
																	}
																/>
															</td>
														) : (
															<td key={uuidv4()}>
																<AsyncPaginate
																	value={prepareRecipeValue(
																		meal
																			.recipes[0]
																	)}
																	loadOptions={
																		loadRecipeOptions
																	}
																	onChange={(
																		recipe
																	) =>
																		handleUpdateRecipe(
																			meal,
																			recipe
																		)
																	}
																/>
															</td>
														);
													})}
												</tr>
											);
										})}
									</tbody>
								</Table>
							</Form.Group>
						</>
					)}
					<LoaderButton
						type="submit"
						isLoading={isLoading}
						// disabled={!validateForm()}
					>
						{isCreate ? 'Create' : 'Update'}
					</LoaderButton>
				</Form>
			}
		</div>
	);
}

export default PlanForm;
