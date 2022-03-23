import { useEffect, useState } from 'react';
import axiosInstance from '../axiosApi';
import './Recipes.css';
import Card from 'react-bootstrap/Card';

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

	return (
		<div className="Recipes">
			<h3>Recipe List</h3>
			<div>
				{recipes.map((recipe) => (
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
										{/* TODO */}
										<div>Ingredients:</div>
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
