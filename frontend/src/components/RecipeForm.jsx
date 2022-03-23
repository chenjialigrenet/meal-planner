import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import useFormFields from '../lib/hooksLib';
import LoaderButton from '../components/LoaderButton';
import './RecipeForm.css';
import axiosInstance from '../axiosApi';
import onError from '../lib/errorLib';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/Row';

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
	const [fields, handleFieldChange] = useFormFields({
		title: '',
		summary: '',
		serves: '',
		cooking_temperature: '',
		cooking_time: '',
		prep_time: '',
		recipe_ingredients: [{ ingredient: 1, quantity: 5 }], // ?? [{ingredient_id: 5, quantity: 3}]
		instructions: '',
		// photo: '', //TODO
		creation_date: '',
		difficulty: '1', //convert back to string
	});

	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

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
				recipe_ingredients: fields.recipe_ingredients, // ?? quantity
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
				{/* TODO */}
				{/* <Form.Group controlId="ingredients">
					<Form.Label>Ingredients</Form.Label>
					<Form.Control
						type="text" 
						value={fields.ingredients}
						onChange={handleFieldChange}
					/>
				</Form.Group> */}
				<Form.Group controlId="instructions">
					<Form.Label>Instructions</Form.Label>
					<Form.Control
						as="textarea"
						rows={3}
						value={fields.instructions}
						onChange={handleFieldChange}
					/>
				</Form.Group>
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
