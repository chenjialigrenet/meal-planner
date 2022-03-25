import { useEffect, useState } from 'react';
import axiosInstance from '../axiosApi';
import './Recipes.css';
import Card from 'react-bootstrap/Card';
// import Search from './Search';

function Recipes() {
	const [recipes, setRecipes] = useState([]);

	const fetchAllRecipes = async () => {
		try {
			const response = await axiosInstance.get('/recipes/');
			// console.log(response);
			setRecipes(response.data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchAllRecipes();
	}, []);

	// Search Recipe
	const [inputText, setInputText] = useState('');
	const inputHandler = (e) => {
		const lowerCase = e.target.value.toLowerCase();
		setInputText(lowerCase);
	};
	const filteredRecipes = recipes.filter((recipe) => {
		if (inputText === '') {
			return recipe;
		} else {
			return recipe.title.toLowerCase().includes(inputText);
		}
	});

	return (
		<div className="Recipes">
			<h3>Recipe List</h3>
			{/* <Search /> */}
			<div className="searchField">
				<input
					type="text"
					placeholder="Search"
					value={inputText}
					onChange={inputHandler}
				/>
			</div>
			<div>
				{filteredRecipes.map((recipe) => (
					<div key={recipe.id}>
						<Card>
							{/* <Card.Img variant="top" src={recipe.photo} /> */}
							<Card.Body>
								<Card.Title>{recipe.title}</Card.Title>
								<div>
									{recipe.summary}
									<div>
										<div>
											Serves: {recipe.serves} | Cooking
											temperature:{' '}
											{recipe.cooking_temperature}°C |
											Cooking time: {recipe.cooking_time}{' '}
											min | Prep time: {recipe.prep_time}{' '}
											min | Difficulty:{' '}
											{recipe.difficulty}/5 | Created on:{' '}
											{recipe.creation_date.split('T')[0]}
										</div>
										<br />
										<div>
											Instructions: {recipe.instructions}
										</div>
										<div>Ingredients:</div>
										<ul>
											{recipe.recipe_ingredients.map(
												(recipeIngredient) => {
													return (
														<li
															key={
																recipeIngredient.id
															}
														>
															{
																recipeIngredient.quantity
															}{' '}
															{
																recipeIngredient
																	.ingredient
																	.unit
															}{' '}
															of{' '}
															{
																recipeIngredient
																	.ingredient
																	.name
															}
														</li>
													);
												}
											)}
										</ul>
									</div>
								</div>
							</Card.Body>
						</Card>
						<br />
					</div>
				))}
			</div>
		</div>
	);
}

export default Recipes;
