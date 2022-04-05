import { useEffect, useState } from 'react';
import axiosInstance from '../axiosApi';
import ListGroup from 'react-bootstrap/ListGroup';
import Search from './utilities/Search';
import { FaTimes, FaEdit } from 'react-icons/fa';
import IngDetailsModal from './modals/IngDetailsModal';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Ingredients.css';

function Ingredients() {
	const [ingredients, setIngredients] = useState([]);
	const [shownIng, setShownIng] = useState(null);

	// GET all ingredients
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

	// DELETE one ingredient
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
				<div>
					<Link to="/ingredients/create">Add Ingredient</Link>
				</div>
				<h3>Ingredient List</h3>
				<Search
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
				/>
				<br />

				<div>
					{/* <ListGroup> */}
					<AnimatePresence>
						{filteredIngredients.map((ingredient) => (
							<motion.div
								key={ingredient.id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
							>
								<ListGroup.Item>
									{ingredient.name} ({ingredient.unit})
									<span style={{ float: 'right' }}>
										<FaEdit
											style={{ marginRight: '10px' }}
											onClick={() =>
												setShownIng(ingredient)
											}
										/>

										<FaTimes
											onClick={() =>
												deleteIngredient(ingredient.id)
											}
										/>
									</span>
								</ListGroup.Item>
							</motion.div>
						))}
					</AnimatePresence>
					{/* </ListGroup> */}
					{shownIng && (
						<IngDetailsModal
							onHide={() => setShownIng(null)}
							ingredient={shownIng}
						/>
					)}
				</div>
			</div>
		</div>
	);
}

export default Ingredients;
