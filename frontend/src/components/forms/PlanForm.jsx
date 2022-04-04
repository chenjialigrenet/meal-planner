import './PlanForm.css';
import { Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import useFormFields from '../../lib/hooksLib';
import { useState, useEffect } from 'react';
import LoaderButton from '../utilities/LoaderButton';
import axiosInstance from '../../axiosApi';
import Select from 'react-select';

function PlanForm() {
	// const daysOfWeek = [
	// 	'Monday',
	// 	'Tuesday',
	// 	'Wednesday',
	// 	'Thursday',
	// 	'Friday',
	// 	'Saturday',
	// 	'Sunday',
	// ];

	const params = useParams();
	const isCreate = !params.planId;

	// Axios fetching recipe data
	const [isFetching, setIsFetching] = useState(true);
	// Spinner on the submit button
	const [isLoading, setIsLoading] = useState(false);
	// Redirect
	const navigate = useNavigate();

	// GET all recipes
	const [recipes, setRecipes] = useState([]);
	const fetchAllRecipes = async () => {
		setIsFetching(true);
		try {
			const response = await axiosInstance.get('/recipes/');
			setRecipes(response.data);
			setIsFetching(false);
		} catch (err) {
			console.log(err);
			setIsFetching(false);
		}
	};

	// GET one plan
	const fetchPlan = async () => {
		setIsFetching(true);
		try {
			const response = await axiosInstance.get(
				`/plans/${params.planId}/`
			);
			const planData = response.data;
			setFieldsValues(planData);
			setIsFetching(false);
		} catch (err) {
			console.log(err);
			setIsFetching(false);
		}
	};

	useEffect(() => {
		fetchPlan();
	}, []);

	const [fields, handleFieldChange, changeFieldValue, setFieldsValues] =
		useFormFields({
			title: '',
			// id: null,
			// meals: [],
		});

	// TODO
	// React Select
	recipes.map((recipe) => {
		return (
			(recipe.value = recipe.name),
			(recipe.label =
				recipe.name[0].toUpperCase() + recipe.name.substring(1))
		);
	});
	const recipe_options = recipes;
	console.log(recipe_options);

	const handleAddRecipe = (selectedRecipe) => {
		changeFieldValue(
			'meals',
			fields.recipe_options.concat([{ recipe: selectedRecipe }])
		);
	};

	// CREATE one plan
	const handleCreatePlan = async (event) => {
		event.preventDefault();
		try {
			await axiosInstance.post('/plans/', {
				title: fields.title,
				// meals: fields.meals.map((meal) => {
				// 	return {
				// 		id: meal.id,
				// 		plan: meal.plan,
				// 		day: meal.day,
				// 		meal: meal.meal,
				// 		recipes: meal.recipes.map((recipe) => {
				// 			return {
				// 				id: recipe.id,
				// 				title: recipe.title,
				// 			};
				// 		}),
				// 	};
				// }),
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
			navigate('/plans/:planId', { replace: true });
		} catch (err) {
			console.log(err);
			setIsLoading(false);
		}
	};

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

					<Form.Group controlId="meals">
						<Form.Label>Meals</Form.Label>
						{isCreate === false ? (
							<ul>
								{fields.meals.map((meal) => {
									return (
										<li key={meal.id}>
											Day {meal.day} | Meal {meal.meal}
											{/* <Form.Select>
											{fields.recipes.map((recipe) => {
												<option value={recipe.id}>
													{recipe.title}
												</option>;
											})}
										</Form.Select> */}
										</li>
									);
								})}
							</ul>
						) : (
							<Select
								onChange={handleAddRecipe}
								options={recipe_options}
								name="meals"
							/>
						)}
					</Form.Group>

					{/* <Table bordered>
					<thead>
						<tr>
							<th>#</th>
							<th>Breakfast</th>
							<th>Lunch</th>
							<th>Dinner</th>
							<th>Dessert</th>
						</tr>
					</thead>
					<tbody>
						{daysOfWeek.map((day) => {
							return (
								<tr key={day}>
									<td>
										<span className="bold">{day}</span>
									</td>
									<td>
										<Button
											id="breakfast"
											onClick={showRecipes}
										>
											+
										</Button>
									</td>
									<td>
										<Button
											id="lunch"
											onClick={showRecipes}
										>
											+
										</Button>
									</td>
									<td>
										<Button
											id="diner"
											onClick={showRecipes}
										>
											+
										</Button>
									</td>
									<td>
										<Button
											id="dessert"
											onClick={showRecipes}
										>
											+
										</Button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table> */}
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
