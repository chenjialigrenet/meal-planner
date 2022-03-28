import { useEffect, useState } from 'react';
import axiosInstance from '../axiosApi';
import './Recipes.css';
import Pagination from './utilities/Pagination';
import Card from 'react-bootstrap/Card';
import Search from './Search';

function Recipes() {
	const [recipes, setRecipes] = useState([]);
	const [isFetching, setIsFetching] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	const updateQuery = function (query) {
		setSearchQuery(query);
		setCurrentPage(1);
	};

	useEffect(() => {
		const fetchRecipes = async () => {
			setIsFetching(true);
			try {
				const response = await axiosInstance.get(
					`/recipes/?query=${searchQuery}&page=${currentPage}`
				);
				// console.log(response);
				setRecipes(response.data.recipes);
				setTotalPages(response.data.total_pages);
				setIsFetching(false);
			} catch (err) {
				console.log(err);
				setIsFetching(false);
				//TODO setHasFetchError(true)
			}
		};

		fetchRecipes();
	}, [searchQuery, currentPage]);

	return (
		<div className="Recipes">
			<h3>Recipe List</h3>
			<Search searchQuery={searchQuery} setSearchQuery={updateQuery} />
			<div>
				{isFetching ? (
					<div>Please wait...</div>
				) : (
					recipes.map((recipe) => (
						<div key={recipe.id}>
							<Card>
								{/* <Card.Img variant="top" src={recipe.photo} /> */}
								<Card.Body>
									<Card.Title>{recipe.title}</Card.Title>
									<div>
										{recipe.summary}
										<div>
											<div>
												Serves: {recipe.serves} |
												Cooking temperature:{' '}
												{recipe.cooking_temperature}°C |
												Cooking time:{' '}
												{recipe.cooking_time} min | Prep
												time: {recipe.prep_time} min |
												Difficulty: {recipe.difficulty}
												/5 | Created on:{' '}
												{
													recipe.creation_date.split(
														'T'
													)[0]
												}
											</div>
											<br />
											<div>
												Instructions:{' '}
												{recipe.instructions}
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
					))
				)}
				{!isFetching && (
					<Pagination
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
						totalPages={totalPages}
					/>
				)}
			</div>
		</div>
	);
}

export default Recipes;
