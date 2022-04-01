import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useFormFields from '../lib/hooksLib';
import axiosInstance from '../axiosApi';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/Form';
import LoaderButton from '../components/LoaderButton';
import './RecipeUpdateForm.css';
// import ImageUploader from './ImageUploader';

function RecipeUpdateForm() {
	const params = useParams();
	const navigate = useNavigate();
	// Axios fetching recipe data
	const [isFetching, setIsFetching] = useState(true);
	// Spinner on the submit button
	const [isLoading, setIsLoading] = useState(false);

	// GET one recipe
	const fetchRecipe = async () => {
		setIsFetching(true);
		try {
			const response = await axiosInstance.get(
				`/recipes/${params.recipeId}/`
			);
			const recipeData = response.data;

			setFieldsValues(recipeData);

			setIsFetching(false);
		} catch (err) {
			console.log(err);
			setIsFetching(false);
		}
	};

	useEffect(() => {
		fetchRecipe();
	}, []);

	const [fields, handleFieldChange, changeFieldValue, setFieldsValues] =
		useFormFields({
			id: null,
			title: '',
			summary: '',
			serves: '',
			cooking_temperature: '',
			cooking_time: '',
			prep_time: '',
			recipe_ingredients: [],
			instructions: '',
			photo: '',
			creation_date: '',
			difficulty: '',
		});

	// const validateForm = () => {
	// 	return (
	// 		fields.title.length > 0 &&
	// 		fields.summary.length > 0 &&
	// 		fields.serves.length > 0 &&
	// 		fields.cooking_temperature.length > 0 &&
	// 		fields.cooking_time.length > 0 &&
	// 		fields.prep_time.length > 0 &&
	// 		fields.instructions.length > 0
	// 	);
	// };

	// UPDATE one recipe
	const updateRecipe = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			await axiosInstance.put(`/recipes/${params.recipeId}/`, {
				title: fields.title,
				summary: fields.summary,
				serves: fields.serves,
				cooking_temperature: fields.cooking_temperature,
				cooking_time: fields.cooking_time,
				prep_time: fields.prep_time,
				recipe_ingredients: fields.recipe_ingredients.map(
					(recipeIngredient) => {
						if (recipeIngredient._destroy) {
							//TODO
						} else if (recipeIngredient.id) {
							return {
								id: recipeIngredient.id,
								ingredient: recipeIngredient.ingredient.id,
								quantity: recipeIngredient.quantity,
							};
						} else {
							//TODO
						}
					}
				),
				instructions: fields.instructions,
				photo: fields.photo,
				creation_date: fields.creation_date,
				difficulty: fields.difficulty,
			});
			setIsLoading(false);
			navigate('/recipes/:recipeId', { replace: true });
			// window.location.href = '/recipe';
		} catch (err) {
			console.log(err);
			setIsLoading(false);
		}
	};

	const updateRecipeIngredientQuantity = (
		recipeIngredientId,
		newQuantity
	) => {
		const recipeIngredient = fields.recipe_ingredients.find(
			(recipeIngredient) => recipeIngredient.id === recipeIngredientId
		);
		console.log(newQuantity);
		recipeIngredient.quantity = parseInt(newQuantity);
		if (isNaN(recipeIngredient.quantity)) {
			recipeIngredient.quantity = '';
		}
		changeFieldValue('recipe_ingredients', fields.recipe_ingredients);
	};

	return (
		<div className="RecipeUpdateForm">
			<h3>Update Recipe (ID: {params.recipeId})</h3>
			{!isFetching && (
				<Form onSubmit={updateRecipe}>
					<Form.Group controlId="title">
						<Form.Label>Title</Form.Label>
						<Form.Control
							type="text"
							value={fields.title}
							onChange={handleFieldChange}
							name="title"
						/>
					</Form.Group>
					<Form.Group controlId="summary">
						<Form.Label>Summary</Form.Label>
						<Form.Control
							as="textarea"
							rows={2}
							value={fields.summary}
							onChange={handleFieldChange}
							name="summary"
						/>
					</Form.Group>
					<Row>
						<Form.Group as={Col} controlId="serves">
							<Form.Label>Serves</Form.Label>
							<Form.Control
								type="number"
								value={fields.serves}
								onChange={handleFieldChange}
								name="serves"
							/>
						</Form.Group>
						<Form.Group as={Col} controlId="cooking_temperature">
							<Form.Label>Cooking temperature</Form.Label>
							<Form.Control
								type="number"
								value={fields.cooking_temperature}
								onChange={handleFieldChange}
								name="cooking_temperature"
							/>
						</Form.Group>
					</Row>
					<Row>
						<Form.Group as={Col} controlId="cooking_time">
							<Form.Label>Cooking time</Form.Label>
							<Form.Control
								type="number"
								value={fields.cooking_time}
								onChange={handleFieldChange}
								name="cooking_time"
							/>
						</Form.Group>
						<Form.Group as={Col} controlId="prep_time">
							<Form.Label>Prep time</Form.Label>
							<Form.Control
								type="number"
								value={fields.prep_time}
								onChange={handleFieldChange}
								name="prep_time"
							/>
						</Form.Group>
					</Row>
					<Form.Group controlId="recipe_ingredients">
						<Form.Label>Ingredients</Form.Label>

						<ul>
							{fields.recipe_ingredients.map(
								(recipeIngredient) => {
									return (
										<li key={recipeIngredient.id}>
											<Row>
												<Col>
													<Form.Control
														value={
															recipeIngredient.quantity
														}
														onChange={(event) =>
															updateRecipeIngredientQuantity(
																recipeIngredient.id,
																event.target
																	.value
															)
														}
														name="quantity"
													/>
												</Col>
												<Col>
													{
														recipeIngredient
															.ingredient.unit
													}{' '}
													of{' '}
													{
														recipeIngredient
															.ingredient.name
													}
												</Col>
											</Row>
										</li>
									);
								}
							)}
						</ul>
					</Form.Group>
					<Form.Group controlId="instructions">
						<Form.Label>Instructions</Form.Label>
						<Form.Control
							as="textarea"
							rows={5}
							value={fields.instructions}
							onChange={handleFieldChange}
							name="instructions"
						/>
					</Form.Group>
					{/* TODO */}
					{/* <ImageUploader /> */}

					<Form.Group controlId="photo">
						<Form.Label>Image</Form.Label>
						<input
							type="file"
							name="photo"
							accept="image/*"
							className="form-control"
							value={fields.photo}
							onChange={handleFieldChange}
						></input>
					</Form.Group>
					<Form.Group controlId="difficulty">
						<Form.Label>Difficulty</Form.Label>
						<Form.Select
							value={fields.difficulty}
							onChange={handleFieldChange}
							name="difficulty"
						>
							<option value="1">Beginner</option>
							<option value="2">Easy</option>
							<option value="3">Normal</option>
							<option value="4">Hard</option>
							<option value="5">Expert</option>
						</Form.Select>
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

export default RecipeUpdateForm;
