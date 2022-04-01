import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import LoaderButton from '../components/LoaderButton';
import axiosInstance from '../axiosApi';
import useFormFields from '../lib/hooksLib';
import { FaNotEqual } from 'react-icons/fa';

function PlanUpdateForm() {
	const params = useParams();
	const navigate = useNavigate();
	// Axios fetching recipe data
	const [isFetching, setIsFetching] = useState(true);
	// Spinner on the submit button
	const [isLoading, setIsLoading] = useState(false);

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
			id: null,
			title: '',
			meals: [],
		});

	// Update one plan
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
		<div className="PlanUpdateForm">
			<h3>Update Plan (ID: {params.planId})</h3>
			{!isFetching && (
				<Form onSubmit={handleUpdatePlan}>
					<Form.Group controlId="title">
						<Form.Label>Title</Form.Label>
						<Form.Control
							type="text"
							value={fields.title}
							onChange={handleFieldChange}
							name="title"
						/>
					</Form.Group>

					<Form.Group controlId="title">
						<Form.Label>Meals</Form.Label>
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
						{/* <Form.Control
						type="text"
						value={fields.recipes}
						onChange={handleFieldChange}
						name="recipes"
					/> */}
					</Form.Group>
					<LoaderButton
						type="submit"
						isLoading={isLoading}
						// disabled={!validateForm()}
					>
						Update
					</LoaderButton>
				</Form>
			)}
		</div>
	);
}

export default PlanUpdateForm;
