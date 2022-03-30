import { useEffect, useState } from 'react';
import axiosInstance from '../axiosApi';
import './Ingredients.css';
import ListGroup from 'react-bootstrap/ListGroup';
import Search from './Search';
import { FaTimes } from 'react-icons/fa';

function Ingredients() {
	const [ingredients, setIngredients] = useState([]);

	const fetchAllIngredients = async () => {
		try {
			const response = await axiosInstance.get('/ingredients/');
			setIngredients(response.data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchAllIngredients();
	}, []);

	const deleteIngredient = async (id) => {
		if (window.confirm('Are you sure to delete this ingredient?')) {
			try {
				await axiosInstance.delete(`/ingredients/${id}`);
				const ingredientsLeft = ingredients.filter(
					(ing) => id !== ing.id
				);
				setIngredients(ingredientsLeft);
			} catch (err) {
				console.log(err);
			}
		}
	};

	// {/* TODO update an ingredient */}
	const updateIngredient = (id) => {};

	// Search Ingredient
	const [searchQuery, setSearchQuery] = useState('');
	const filteredIngredients = ingredients.filter((ing) => {
		if (searchQuery === '') {
			return ing;
		} else {
			return ing.name.toLowerCase().includes(searchQuery);
		}
	});

	return (
		<div>
			<div className="Ingredients">
				<h3>Ingredient List</h3>
				<Search
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
				/>
				<br />

				<div>
					<ListGroup>
						{filteredIngredients.map((ingredient) => (
							<ListGroup.Item key={ingredient.id}>
								{ingredient.name} ({ingredient.unit})
								<span style={{ float: 'right' }}>
									<FaTimes
										onClick={() =>
											deleteIngredient(ingredient.id)
										}
									/>
								</span>
							</ListGroup.Item>
						))}
					</ListGroup>
				</div>
			</div>
		</div>
	);
}

export default Ingredients;
