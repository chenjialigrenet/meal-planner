import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useFormFields from '../lib/hooksLib';
import axiosInstance from '../axiosApi';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function RecipeUpdateModal({ recipe, onHide, setShownRecipe }) {
	const [fields, handleFieldChange, changeFieldValue] = useFormFields({
		title: recipe.title,
		summary: recipe.summary,
		serves: recipe.serves,
		cooking_temperature: recipe.cooking_temperature,
		cooking_time: recipe.cooking_time,
		prep_time: recipe.prep_time,
		recipe_ingredients: JSON.parse(
			JSON.stringify(recipe.recipe_ingredients)
		),
		instructions: recipe.instructions,
		photo: recipe.photo,
		difficulty: recipe.difficulty,
	});

	// UPDATE one recipe
	const updateRecipe = async (id) => {
		try {
			const newRecipeData = await axiosInstance.put(`/recipes/${id}/`, {
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
				difficulty: fields.difficulty,
			});
			// ??
			setShownRecipe(newRecipeData);
			onHide();
		} catch (err) {
			console.log(err);
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
		<Form>
			<Modal
				recipe={recipe}
				onHide={onHide}
				show
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						{recipe.title} (ID: {recipe.id})
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group controlId="title">
						<Form.Label>Recipe name</Form.Label>
						<Form.Control
							type="text"
							value={fields.title}
							onChange={handleFieldChange}
							name="title"
						/>
					</Form.Group>
					<Form.Group controlId="serves">
						<Form.Label>Serves</Form.Label>
						<Form.Control
							type="number"
							value={fields.serves}
							onChange={handleFieldChange}
							name="serves"
						/>
					</Form.Group>
					<Form.Group controlId="difficulty">
						<Form.Label>Difficulty</Form.Label>
						<Form.Control
							type="number"
							value={fields.difficulty}
							onChange={handleFieldChange}
							name="difficulty"
						/>
					</Form.Group>
					<Form.Group controlId="cooking_temperature">
						<Form.Label>Cooking temperature</Form.Label>
						<Form.Control
							type="number"
							value={fields.cooking_temperature}
							onChange={handleFieldChange}
							name="cooking_temperature"
						/>
					</Form.Group>
					<Form.Group controlId="cooking_time">
						<Form.Label>Cooking time</Form.Label>
						<Form.Control
							type="number"
							value={fields.cooking_time}
							onChange={handleFieldChange}
							name="cooking_time"
						/>
					</Form.Group>
					<Form.Group controlId="prep_time">
						<Form.Label>Prep time</Form.Label>
						<Form.Control
							type="number"
							value={fields.prep_time}
							onChange={handleFieldChange}
							name="prep_time"
						/>
					</Form.Group>
					<Form.Group controlId="summary">
						<Form.Label>Summary</Form.Label>
						<Form.Control
							type="text"
							value={fields.summary}
							onChange={handleFieldChange}
							name="summary"
						/>
					</Form.Group>
					<Form.Group controlId="instructions">
						<Form.Label>Instructions</Form.Label>
						<Form.Control
							type="text"
							value={fields.instructions}
							onChange={handleFieldChange}
							name="instructions"
						/>
					</Form.Group>

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
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={() => updateRecipe(recipe.id)}>
						Update
					</Button>
				</Modal.Footer>
			</Modal>
		</Form>
	);
}

export default RecipeUpdateModal;
