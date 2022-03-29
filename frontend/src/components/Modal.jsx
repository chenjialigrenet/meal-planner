// import { useState, useEffect } from 'react';
// import axiosInstance from '../axiosApi';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const RecipeDetailsModal = ({ recipe, onHide }) => {
	return (
		<Modal
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
			{/* <Modal.Body>
                    <ul>
                        <li>{recipe.summary}</li>
                        <li>
                            Serves: {recipe.serves} | Cooking temperature:{' '}
                            {recipe.cooking_temperature}
                            °C | Cooking time: {recipe.cooking_time} min | Prep
                            time: {recipe.prep_time} min
                        </li>
                        <li>
                            Difficulty: {recipe.difficulty}
                            /5
                        </li>
                        <li>
                            Created on: {recipe.creation_date.split('T')[0]}
                        </li>
                        <div>Instructions: {recipe.instructions}</div>
                        <div>Ingredients:</div>
                        <ul>
                            {recipe.recipe_ingredients.map(
                                (recipeIngredient) => {
                                    return (
                                        <li key={recipeIngredient.id}>
                                            {recipeIngredient.quantity}{' '}
                                            {recipeIngredient.ingredient.unit}{' '}
                                            of{' '}
                                            {recipeIngredient.ingredient.name}
                                        </li>
                                    );
                                }
                            )}
                        </ul>
                    </ul>
                </Modal.Body> */}
			<Modal.Footer>
				<Button onClick={onHide}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default RecipeDetailsModal;
