import { useEffect, useState } from 'react';
import axiosInstance from '../axiosApi';
import './Ingredients.css';
// import Search from './Search';

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

	return (
		<div>
			<div className="Ingredients">
				<h3>Ingredient List</h3>
				{/* <Search /> */}
				<div>
					<ul>
						{ingredients.map((ingredient) => (
							<li key={ingredient.id}>
								{ingredient.name} (unit: {ingredient.unit})
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}

export default Ingredients;
