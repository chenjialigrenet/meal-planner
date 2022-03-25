import { useEffect, useState } from 'react';
import axiosInstance from '../axiosApi';
import './Ingredients.css';
import ListGroup from 'react-bootstrap/ListGroup';
import Search from './Search';

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

	// Search Ingredient
	const [inputText, setInputText] = useState('');
	const inputHandler = (e) => {
		const lowerCase = e.target.value.toLowerCase();
		setInputText(lowerCase);
	};
	const filteredIngredients = ingredients.filter((ing) => {
		if (inputText === '') {
			return ing;
		} else {
			return ing.name.toLowerCase().includes(inputText);
		}
	});

	return (
		<div>
			<div className="Ingredients">
				<h3>Ingredient List</h3>
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
					<ListGroup>
						{filteredIngredients.map((ingredient) => (
							<ListGroup.Item key={ingredient.id}>
								{ingredient.name} ({ingredient.unit})
							</ListGroup.Item>
						))}
					</ListGroup>
				</div>
			</div>
		</div>
	);
}

export default Ingredients;
