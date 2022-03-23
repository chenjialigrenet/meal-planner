import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import useFormFields from '../lib/hooksLib';
import LoaderButton from '../components/LoaderButton';
import './RecipeForm.css';
import axiosInstance from '../axiosApi';
import onError from '../lib/errorLib';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/Row';
import Select from 'react-select';
import Table from 'react-bootstrap/Table';
import { FaTimes } from 'react-icons/fa';

// TODO
// {
//     name: "recipe",
//     ingredients: [{ ingredient_id: 3, quantity: 5 }]
// }

// 1/ create Recipe without ingredients => recipe.id
// 2/ for ingredient_attributes in ingredients:
//       ingredient = find Ingredient with ingredient_attributes["ingredient_id"]
//       create RecipeIngredient ingredient=ingredient, recipe=recipe, quantity=ingredient_attributes["quantity"]

function RecipeForm() {
	const [fields, handleFieldChange, changeFieldValue] = useFormFields({
		title: '',
		summary: '',
		serves: '',
		cooking_temperature: '',
		cooking_time: '',
		prep_time: '',
		recipe_ingredients: [], // ?? [{ingredient_id: 5, quantity: 3}]
		instructions: '',
		// photo: '', //TODO
		creation_date: '',
		difficulty: '1', //convert back to string
	});

	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	// Select2 options
	const [ingredients, setIngredients] = useState([]);
	const fetchAllIngredients = async () => {
		try {
			const response = await axiosInstance.get('/ingredients/');
			// console.log(response.data);
			setIngredients(response.data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchAllIngredients();
	}, []);

	ingredients.map((ing) => {
		ing.value = ing.name;
		ing.label = ing.name[0].toUpperCase() + ing.name.substring(1);
	});
	const ingredient_options = ingredients;
	// console.log(ingredient_options);

	// const [selectedIngredients, setSelectedIngredients] = useState([]);
	const handleChange = (selectedIngredient) => {
		changeFieldValue(
			'recipe_ingredients',
			fields.recipe_ingredients.concat([
				{ ingredient: selectedIngredient, quantity: 1 },
			])
		);
	};
	// console.log(selectedIngredients);

	const updateRecipeIngredientQuantity = (ingredientId, newQuantity) => {
		const recipeIngredient = fields.recipe_ingredients.find(
			(recipeIngredient) =>
				recipeIngredient.ingredient.id === ingredientId
		);
		recipeIngredient.quantity = parseInt(newQuantity);
		changeFieldValue('recipe_ingredients', fields.recipe_ingredients);
	};

	const handleDelete = (id) => {
		changeFieldValue(
			'recipe_ingredients',
			fields.recipe_ingredients.filter(
				(recipeIngredient) => recipeIngredient.ingredient.id !== id
			)
		);
		// if (window.confirm('Are you sure to delete this ingredient?')) {
		// }
	};

	const validateForm = () => {
		return (
			fields.title.length > 0 &&
			fields.summary.length > 0 &&
			fields.serves.length > 0 &&
			fields.cooking_temperature.length > 0 &&
			fields.cooking_time.length > 0 &&
			fields.prep_time.length > 0 &&
			fields.recipe_ingredients.length > 0 &&
			fields.instructions.length > 0
		);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setIsLoading(true);

		try {
			await axiosInstance.post('/recipes/', {
				title: fields.title,
				summary: fields.summary,
				serves: fields.serves,
				cooking_temperature: fields.cooking_temperature,
				cooking_time: fields.cooking_time,
				prep_time: fields.prep_time,
				recipe_ingredients: fields.recipe_ingredients.map(
					(recipeIngredient) => {
						return {
							ingredient: recipeIngredient.ingredient.id,
							quantity: recipeIngredient.quantity,
						};
					}
				), // ?? quantity
				instructions: fields.instructions,
				// photo: fields.photo, // TODO
				creation_date: fields.creation_date,
				difficulty: fields.difficulty,
			});

			setIsLoading(false);
			navigate('/recipes/');
		} catch (err) {
			onError(err);
			setIsLoading(false);
		}
	};

	return (
		<div className="RecipeForm">
			<h3>Create Recipe</h3>
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="title">
					<Form.Label>Title</Form.Label>
					<Form.Control
						autoFocus
						type="text"
						value={fields.title}
						onChange={handleFieldChange}
					/>
				</Form.Group>
				<Form.Group controlId="summary">
					<Form.Label>Summary</Form.Label>
					<Form.Control
						as="textarea"
						rows={2}
						value={fields.summary}
						onChange={handleFieldChange}
					/>
				</Form.Group>
				<Row>
					<Form.Group as={Col} controlId="serves">
						<Form.Label>Serves</Form.Label>
						<Form.Control
							type="number"
							value={fields.serves}
							onChange={handleFieldChange}
						/>
					</Form.Group>
					<Form.Group as={Col} controlId="cooking_temperature">
						<Form.Label>Cooking temperature (in °C) </Form.Label>
						<Form.Control
							type="number"
							value={fields.cooking_temperature}
							onChange={handleFieldChange}
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
						/>
					</Form.Group>
					<Form.Group as={Col} controlId="prep_time">
						<Form.Label>Preparation time (minutes)</Form.Label>
						<Form.Control
							type="number"
							value={fields.prep_time}
							onChange={handleFieldChange}
						/>
					</Form.Group>
				</Row>
				<Form.Group controlId="recipe_ingredients">
					<Form.Label>Ingredients</Form.Label>
					<Select
						onChange={handleChange}
						options={ingredient_options}
					/>
				</Form.Group>
				<br />
				{fields.recipe_ingredients.length > 0 && (
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
									<tr key={recipeIngredient.ingredient.id}>
										<td>
											{recipeIngredient.ingredient.label}
										</td>
										<td>
											{recipeIngredient.ingredient.unit}
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
													handleDelete(
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
					/>
				</Form.Group>
				{/* TODO file or image ??*/}
				{/* <Form.Group controlId="photo">
					<Form.Label>Image</Form.Label>
					<Form.Control
						type="file"
						value={fields.photo}
						onChange={handleFieldChange}
					/>
				</Form.Group> */}
				<Form.Group controlId="difficulty">
					<Form.Label>Difficulty</Form.Label>
					<Form.Select
						value={fields.difficulty}
						onChange={handleFieldChange}
					>
						<option value="1">Beginner</option>
						<option value="2">Easy</option>
						<option value="3">Normal</option>
						<option value="4">Hard</option>
						<option value="5">Expert</option>
					</Form.Select>
				</Form.Group>
				<Form.Group controlId="creation_date">
					<Form.Label>Crreation date</Form.Label>
					<Form.Control
						type="datetime-local"
						value={fields.creation_date}
						onChange={handleFieldChange}
					/>
				</Form.Group>
				<LoaderButton
					type="submit"
					isLoading={isLoading}
					disabled={!validateForm()}
				>
					Create
				</LoaderButton>
			</Form>
		</div>
	);
}

export default RecipeForm;
