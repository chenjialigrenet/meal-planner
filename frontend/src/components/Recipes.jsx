import { useEffect, useState } from 'react';
import axiosInstance from '../axiosApi';
import './Recipes.css';
import Pagination from './utilities/Pagination';
import Card from 'react-bootstrap/Card';
import Search from './Search';
import Button from 'react-bootstrap/Button';
import RecipeDetailsModal from './RecipeDetailsModal';
import { FaTimes } from 'react-icons/fa';

function Recipes() {
	const [recipes, setRecipes] = useState([]);
	const [isFetching, setIsFetching] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [shownRecipe, setShownRecipe] = useState(null);

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
				//TODO setHasFetchError(true)
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

	//TODO update one recipe

	return (
		<div className="Recipes">
			<Search searchQuery={searchQuery} setSearchQuery={updateQuery} />
			<br />

			<div>
				{isFetching ? (
					<div>Please wait...</div>
				) : (
					recipes.map((recipe) => (
						<div key={recipe.id}>
							<Card>
								{/* <Card.Img variant="top" src={recipe.photo} /> */}
								<Card.Body>
									<span style={{ float: 'right' }}>
										<FaTimes
											onClick={() => {
												deleteRecipe(recipe.id);
											}}
										/>
									</span>
									<Card.Title>{recipe.title}</Card.Title>

									<div>
										{recipe.summary}
										<div>
											Serves: {recipe.serves} | Cooking
											temperature:{' '}
											{recipe.cooking_temperature}
											°C | Cooking time:{' '}
											{recipe.cooking_time} min | Prep
											time: {recipe.prep_time} min
										</div>
										<div>
											Difficulty: {recipe.difficulty}
											/5
										</div>
									</div>
									<Button
										onClick={() => setShownRecipe(recipe)}
									>
										Details
									</Button>
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
