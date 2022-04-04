import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useFormFields from '../../lib/hooksLib';
import LoaderButton from '../utilities/LoaderButton';
import './RecipeForm.css';
import axiosInstance from '../../axiosApi';
import onError from '../../lib/errorLib';
import { Col, Row, Table, Form } from 'react-bootstrap';
import Select from 'react-select';
import { FaTimes } from 'react-icons/fa';
// import ImageUploader from './ImageUploader';

// {
//     name: "recipe",
//     ingredients: [{ ingredient_id: 3, quantity: 5 }]
// }

// 1/ create Recipe without ingredients => recipe.id
// 2/ for ingredient_attributes in ingredients:
//       ingredient = find Ingredient with ingredient_attributes["ingredient_id"]
//       create RecipeIngredient ingredient=ingredient, recipe=recipe, quantity=ingredient_attributes["quantity"]

function RecipeForm() {
	// const [fields, handleFieldChange, changeFieldValue] = useFormFields({
	// 	title: '',
	// 	summary: '',
	// 	serves: '',
	// 	cooking_temperature: '',
	// 	cooking_time: '',
	// 	prep_time: '',
	// 	recipe_ingredients: [],
	// 	instructions: '',
	// 	photo: '',
	// 	difficulty: '1', //convert back to string
	// });

	const params = useParams();
	const isCreate = !params.recipeId;

	// Axios fetching recipe data
	const [isFetching, setIsFetching] = useState(true);
	// Spinner on the submit button
	const [isLoading, setIsLoading] = useState(false);
	// Redirect
	const navigate = useNavigate();

	// GET all ingredients + React Select options
	const [ingredients, setIngredients] = useState([]);
	const fetchAllIngredients = async () => {
		setIsFetching(true);
		try {
			const response = await axiosInstance.get('/ingredients/');
			// console.log(response.data);
			setIngredients(response.data);
			setIsFetching(false);
		} catch (err) {
			console.log(err);
			setIsFetching(false);
		}
	};

	// GET one recipe
	const fetchRecipe = async () => {
		setIsFetching(true);
		try {
			const response = await axiosInstance.get(
				`/recipes/${params.recipeId}/`
			);
			const recipeData = response.data;
			recipeData.photo_current = recipeData.photo;
			recipeData.photo = '';
			setFieldsValues(recipeData);
			setIsFetching(false);
		} catch (err) {
			console.log(err);
			setIsFetching(false);
		}
	};

	useEffect(() => {
		fetchAllIngredients();
		if (!isCreate) {
			fetchRecipe();
		}
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
			difficulty: '1',
		});

	// React Select
	ingredients.map((ing) => {
		return (
			(ing.value = ing.name),
			(ing.label = ing.name[0].toUpperCase() + ing.name.substring(1))
		);
	});
	const ingredient_options = ingredients;
	// console.log(ingredient_options);

	// const [selectedIngredients, setSelectedIngredients] = useState([]);
	const handleAddIngredient = (selectedIngredient) => {
		changeFieldValue(
			'recipe_ingredients',
			fields.recipe_ingredients.concat([
				{ ingredient: selectedIngredient, quantity: 1 },
			])
		);
	};
	// console.log(selectedIngredients);

	const updateRecipeIngredientQuantity = (
		recipeIngredientId,
		newQuantity
	) => {
		const recipeIngredient = fields.recipe_ingredients.find(
			// (recipeIngredient) => recipeIngredient.id === recipeIngredientId
			(recipeIngredient) =>
				recipeIngredient.ingredient.id === recipeIngredientId
		);
		console.log(newQuantity);
		recipeIngredient.quantity = parseInt(newQuantity);
		if (isNaN(recipeIngredient.quantity)) {
			recipeIngredient.quantity = '';
		}
		changeFieldValue('recipe_ingredients', fields.recipe_ingredients);
	};

	const handleDeleteIngredient = (id) => {
		// if (window.confirm('Are you sure to delete this ingredient?')) {
		changeFieldValue(
			'recipe_ingredients',
			fields.recipe_ingredients.filter(
				(recipeIngredient) => recipeIngredient.ingredient.id !== id
			)
		);
		// }
	};

	// const validateForm = () => {
	// 	return (
	// 		fields.title.length > 0 &&
	// 		fields.summary.length > 0 &&
	// 		fields.serves.length > 0 &&
	// 		fields.cooking_temperature.length > 0 &&
	// 		fields.cooking_time.length > 0 &&
	// 		fields.prep_time.length > 0 &&
	// 		fields.recipe_ingredients.length > 0 &&
	// 		fields.instructions.length > 0
	// 	);
	// };

	// CREATE one recipe
	const handleCreateRecipe = async (event) => {
		event.preventDefault();
		setIsLoading(true);

		try {
			const formData = new FormData();

			formData.append('title', fields.title);
			formData.append('summary', fields.summary);
			formData.append('serves', fields.serves);
			formData.append('cooking_temperature', fields.cooking_temperature);
			formData.append('cooking_time', fields.cooking_time);
			formData.append('prep_time', fields.prep_time);
			// fields.recipe_ingredients.forEach((recipeIngredient, index) => {
			// 	formData.append(
			// 		`recipe_ingredients[${index}][ingredient]`,
			// 		recipeIngredient.ingredient.id
			// 	);
			// 	formData.append(
			// 		`recipe_ingredients[${index}][quantity]`,
			// 		recipeIngredient.quantity
			// 	);
			// });
			formData.append(
				'recipe_ingredients',
				JSON.stringify(
					fields.recipe_ingredients.map((recipeIngredient) => {
						return {
							ingredient: recipeIngredient.ingredient.id,
							quantity: recipeIngredient.quantity,
						};
					})
				)
			);
			formData.append('instructions', fields.instructions);
			formData.append('photo', fields.photo, fields.photo.name);
			formData.append('difficulty', fields.difficulty);

			await axiosInstance.post('/recipes/', formData, {
				headers: {
					'content-type': 'multipart/form-data',
				},
			});

			setIsLoading(false);
			navigate('/recipe');
			// window.location.reload();
		} catch (err) {
			onError(err);
			setIsLoading(false);
		}
	};

	// UPDATE one recipe
	const handleUpdateRecipe = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const formData = new FormData();
			formData.append('title', fields.title);
			formData.append('summary', fields.summary);
			formData.append('serves', fields.serves);
			formData.append('cooking_temperature', fields.cooking_temperature);
			formData.append('cooking_time', fields.cooking_time);
			formData.append('prep_time', fields.prep_time);
			formData.append(
				'recipe_ingredients',
				JSON.stringify(
					fields.recipe_ingredients.map((recipeIngredient) => {
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
					})
				)
			);
			formData.append('instructions', fields.instructions);
			if (fields.photo) {
				formData.append('photo', fields.photo, fields.photo.name);
			}
			formData.append('difficulty', fields.difficulty);

			await axiosInstance.put(`/recipes/${params.recipeId}/`, formData, {
				headers: {
					'content-type': 'multipart/form-data',
				},
			});
			setIsLoading(false);
			navigate(`/recipes/${params.recipeId}`);
			// window.location.href = '/recipe';
		} catch (err) {
			console.log(err);
			setIsLoading(false);
		}
	};

	return (
		<div className="RecipeForm">
			<h3>
				{isCreate === false
					? `Update Recipe (ID: ${params.recipeId})`
					: 'Create Recipe'}
			</h3>
			{!isFetching && (
				<Form
					onSubmit={
						isCreate === false
							? handleUpdateRecipe
							: handleCreateRecipe
					}
				>
					<Form.Group controlId="title">
						<Form.Label>Title</Form.Label>
						<Form.Control
							autoFocus
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
							<Form.Label>
								Cooking temperature (in °C){' '}
							</Form.Label>
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
							<Form.Label>Cooking time (minutes)</Form.Label>
							<Form.Control
								type="number"
								value={fields.cooking_time}
								onChange={handleFieldChange}
								name="cooking_time"
							/>
						</Form.Group>
						<Form.Group as={Col} controlId="prep_time">
							<Form.Label>Preparation time (minutes)</Form.Label>
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
						{isCreate === false ? (
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
						) : (
							<Select
								onChange={handleAddIngredient}
								options={ingredient_options}
								name="recipe_ingredients"
							/>
						)}
					</Form.Group>
					{/* ?? */}
					{isCreate === true && fields.recipe_ingredients.length > 0 && (
						<Table responsive striped hover size="sm">
							<thead>
								<tr>
									<th>Ingredient</th>
									<th>Unit</th>
									<th>Quantity</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{fields.recipe_ingredients.map(
									(recipeIngredient) => (
										<tr
											key={recipeIngredient.ingredient.id}
										>
											<td>
												{
													recipeIngredient.ingredient
														.label
												}
											</td>
											<td>
												{
													recipeIngredient.ingredient
														.unit
												}
											</td>
											<td>
												<input
													id="quantity"
													name="quantity"
													type="number"
													onInput={(event) =>
														updateRecipeIngredientQuantity(
															recipeIngredient
																.ingredient.id,
															event.target.value
														)
													}
													value={
														recipeIngredient.quantity
													}
												/>
											</td>
											<td>
												<FaTimes
													onClick={() =>
														handleDeleteIngredient(
															recipeIngredient
																.ingredient.id
														)
													}
												/>
											</td>
										</tr>
									)
								)}
							</tbody>
						</Table>
					)}
					<Form.Group controlId="instructions">
						<Form.Label>Instructions</Form.Label>
						<Form.Control
							as="textarea"
							rows={3}
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
						{isCreate ? 'Create' : 'Update'}
					</LoaderButton>
				</Form>
			)}
		</div>
	);
}

export default RecipeForm;
