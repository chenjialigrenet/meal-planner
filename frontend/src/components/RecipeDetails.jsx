import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../axiosApi';
import useFormFields from '../lib/hooksLib';
import { FaEdit, FaTimes } from 'react-icons/fa';
import './RecipeDetails.css';

function RecipeDetails() {
	const params = useParams();
	const navigate = useNavigate();
	// Axios fetching recipe data
	const [isFetching, setIsFetching] = useState(true);

	// GET one recipe
	const fetchRecipe = async () => {
		setIsFetching(true);
		try {
			const response = await axiosInstance.get(
				`/recipes/${params.recipeId}/`
			);
			const recipeData = response.data;

			setFieldsValues(recipeData);

			setIsFetching(false);
		} catch (err) {
			console.log(err);
			setIsFetching(false);
		}
	};

	useEffect(() => {
		fetchRecipe();
	}, []);

	const [fields, handleFieldChange, changeFieldValue, setFieldsValues] =
		useFormFields({
			id: null,
			title: '',
			summary: '',
			serves: '',
			cooking_temperature: '',
			cooking_time: '',
			prep_time: '',
			recipe_ingredients: [],
			instructions: '',
			photo: '',
			creation_date: '',
			difficulty: '',
		});

	// DELETE one recipe
	const deleteRecipe = async (id) => {
		if (window.confirm('Are you sure to delete this recipe?')) {
			try {
				await axiosInstance.delete(`/recipes/${id}`);
				navigate('/recipe');
			} catch (err) {
				console.log(err);
			}
		}
	};

	return (
		<div className="RecipeDetails">
			<h4 className="recipe recipe-title">
				{fields.title} (ID: {params.recipeId})
				<span style={{ marginLeft: '10px', cursor: 'pointer' }}>
					<FaEdit
						onClick={() => {
							navigate(`/recipes/${params.recipeId}/update`);
						}}
					/>
				</span>
				<span>
					<FaTimes
						style={{ marginLeft: '10px', cursor: 'pointer' }}
						onClick={() => {
							deleteRecipe(params.recipeId);
						}}
					/>
				</span>
			</h4>
			{!isFetching && (
				<div className="recipe recipe-container">
					<div className="recipe recipe-photo-container">
						<img
							src={fields.photo}
							alt={fields.id}
							className="recipe recipe-photo"
						/>
					</div>
					<div className="recipe recipe-info">
						<span className="recipe block-container">
							<span className="bold">Serves: </span>
							{fields.serves}
						</span>
						<span className="recipe block-container">
							<span className="bold">Difficulty: </span>
							{fields.difficulty}
							/5
						</span>
						<span className="recipe block-container">
							<span className="bold">Cooking temperature: </span>
							{fields.cooking_temperature}
							°C
						</span>
						<span className="recipe block-container">
							<span className="bold">Cooking time: </span>
							{fields.cooking_time} min
						</span>
						<span className="recipe block-container">
							<span className="bold">Prep time: </span>
							{fields.prep_time} min
						</span>
						<span className="recipe block-container">
							<span className="bold">Summary: </span>
							{fields.summary}
						</span>
						<span className="recipe block-container">
							<span className="bold">Instructions: </span>
							{fields.instructions}
						</span>
						<div>
							<span className="bold">Ingredients: </span>
							<ul>
								{fields.recipe_ingredients.map(
									(recipeIngredient) => {
										return (
											<li key={recipeIngredient.id}>
												{recipeIngredient.quantity}{' '}
												{
													recipeIngredient.ingredient
														.unit
												}{' '}
												of{' '}
												{
													recipeIngredient.ingredient
														.name
												}
											</li>
										);
									}
								)}
							</ul>
						</div>
						<span className="recipe block-container">
							Created on {fields.creation_date.split('T')[0]}
						</span>
					</div>
				</div>
			)}
		</div>
	);
}

export default RecipeDetails;
