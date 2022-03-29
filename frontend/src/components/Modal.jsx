import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './Modal.css';

const RecipeDetailsModal = ({ recipe, onHide }) => {
	return (
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
					{recipe.title}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div>
					<span className="bold">Serves: </span> {recipe.serves}{' '}
				</div>

				<div>
					<span className="bold">Difficulty: </span>
					{recipe.difficulty}
					/5
				</div>
				<div>
					<span className="bold">Cooking temperature: </span>
					{recipe.cooking_temperature}
					°C
				</div>
				<div>
					<span className="bold">Cooking time: </span>
					{recipe.cooking_time} min |{' '}
					<span className="bold">Prep time: </span>
					{recipe.prep_time} min
				</div>
				<div>
					<span className="bold">Summary: </span>
					{recipe.summary}
				</div>
				<div>
					<span className="bold">Instructions: </span>
					{recipe.instructions}
				</div>
				<div>
					<span className="bold">Ingredients: </span>
					<ul>
						{recipe.recipe_ingredients.map((recipeIngredient) => {
							return (
								<li key={recipeIngredient.id}>
									{recipeIngredient.quantity}{' '}
									{recipeIngredient.ingredient.unit} of{' '}
									{recipeIngredient.ingredient.name}
								</li>
							);
						})}
					</ul>
				</div>
				<div className="grey">
					Created on {recipe.creation_date.split('T')[0]}
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={onHide}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default RecipeDetailsModal;
