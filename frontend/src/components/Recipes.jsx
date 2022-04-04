import { useEffect, useState } from 'react';
import axiosInstance from '../axiosApi';
import './Recipes.css';
import Pagination from './utilities/Pagination';
import Search from './utilities/Search';
import RecipeDetailsModal from './modals/RecipeDetailsModal';
import { FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Recipes() {
	const [recipes, setRecipes] = useState([]);
	const [isFetching, setIsFetching] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [shownRecipe, setShownRecipe] = useState(null);
	const navigate = useNavigate();

	// Search bar by continuous fetching using axios
	const updateQuery = (query) => {
		setSearchQuery(query);
		setCurrentPage(1);
	};

	useEffect(() => {
		// GET all recipes
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
				//TODO ?? setHasFetchError(true)
			}
		};

		fetchRecipes();
	}, [searchQuery, currentPage]);

	// DELETE one recipe
	const deleteRecipe = async (id) => {
		if (window.confirm('Are you sure to delete this recipe?')) {
			try {
				await axiosInstance.delete(`/recipes/${id}`);
				const recipesLeft = recipes.filter(
					(recipe) => id !== recipe.id
				);
				setRecipes(recipesLeft);
			} catch (err) {
				console.log(err);
			}
		}
	};

	return (
		<div className="Recipes">
			<Search searchQuery={searchQuery} setSearchQuery={updateQuery} />

			<div>
				{isFetching ? (
					<div>Please wait...</div>
				) : (
					<AnimatePresence>
						{recipes.map((recipe) => (
							<motion.div
								key={recipe.id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
							>
								<Card className="recipe-card">
									<Row>
										<Col className="recipe-left" md="2">
											<div className="recipe-photo">
												<img
													className="recipe-photo"
													src={recipe.photo}
													alt={recipe.id}
												/>
											</div>
										</Col>
										<Col md="10">
											<div className="recipe-info">
												<span className="btn-close-recipe">
													<FaTimes
														onClick={() => {
															deleteRecipe(
																recipe.id
															);
														}}
													/>
												</span>
												<Card.Title>
													{recipe.title}
												</Card.Title>

												<div>
													{recipe.summary}
													<div>
														Serves: {recipe.serves}{' '}
														| Cooking temperature:{' '}
														{
															recipe.cooking_temperature
														}
														°C | Cooking time:{' '}
														{recipe.cooking_time}{' '}
														min | Prep time:{' '}
														{recipe.prep_time} min
													</div>
													<div>
														Difficulty:{' '}
														{recipe.difficulty}
														/5
													</div>
												</div>
												<Button
													size="sm"
													className="btn-recipe-preview"
													onClick={() =>
														setShownRecipe(recipe)
													}
												>
													Preview
												</Button>
												<Button
													size="sm"
													variant="success"
													className="btn-recipe-details"
													onClick={() => {
														setShownRecipe(recipe);
														navigate(
															`/recipes/${recipe.id}`
														);
													}}
												>
													Details
												</Button>
											</div>
										</Col>
									</Row>
								</Card>
							</motion.div>
						))}
					</AnimatePresence>
				)}
				{!isFetching && (
					<Pagination
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
						totalPages={totalPages}
					/>
				)}
				{shownRecipe && (
					<RecipeDetailsModal
						onHide={() => setShownRecipe(null)}
						recipe={shownRecipe}
					/>
				)}
			</div>
		</div>
	);
}

export default Recipes;
