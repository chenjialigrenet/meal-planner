import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeForm from '../forms/RecipeForm';
import './RecipeDetailsModal.css';

const RecipeDetailsModal = ({ recipe, onHide }) => {
	const [shownRecipe, setShownRecipe] = useState(null);

	const navigate = useNavigate();

	return (
		<div>
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

					<Button
						style={{ marginLeft: '20px' }}
						size="sm"
						variant="success"
						onClick={() => {
							setShownRecipe(recipe);
							navigate(`/recipes/${recipe.id}`);
						}}
					>
						Details
					</Button>
				</Modal.Header>
				<Modal.Body className="modal-body flex-container">
					<div className="modal-left">
						<div>
							<span className="bold">Serves: </span>{' '}
							{recipe.serves}
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
								{recipe.recipe_ingredients.map(
									(recipeIngredient) => {
										return (
											<li key={recipeIngredient.id}>
												{recipeIngredient.quantity}{' '}
												{
													recipeIngredient.ingredient
														.unit
												}{' '}
												of{' '}
												{
													recipeIngredient.ingredient
														.name
												}
											</li>
										);
									}
								)}
							</ul>
						</div>
						<div className="muted-text">
							Created on {recipe.creation_date.split('T')[0]}
						</div>
					</div>
					<div className="modal-right">
						<img
							className="modal-img"
							src={recipe.photo}
							alt={recipe.title}
						/>
					</div>
				</Modal.Body>
			</Modal>

			{shownRecipe && <RecipeForm recipe={shownRecipe} />}
		</div>
	);
};

export default RecipeDetailsModal;
