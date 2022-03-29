import { useEffect, useState } from 'react';
import axiosInstance from '../axiosApi';
import './Recipes.css';
import Pagination from './utilities/Pagination';
import Card from 'react-bootstrap/Card';
import Search from './Search';
import Button from 'react-bootstrap/Button';
import RecipeDetailsModal from './Modal';

function Recipes() {
	const [recipes, setRecipes] = useState([]);
	const [isFetching, setIsFetching] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [shownRecipe, setShownRecipe] = useState(null);

	const updateQuery = (query) => {
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
			<Search searchQuery={searchQuery} setSearchQuery={updateQuery} />
			<br />
			{/* TODO update and delete a recipe */}
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
