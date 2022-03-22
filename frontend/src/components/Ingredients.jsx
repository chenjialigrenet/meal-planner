import { useEffect, useState } from 'react';
import axiosInstance from '../axiosApi';
import './Ingredients.css';

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
				<ul>
					{ingredients.map((ingredient) => (
						<li key={ingredient.id}>
							{/* TODO change unit into a human readable string */}
							{ingredient.name} (unit: {ingredient.unit})
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default Ingredients;
