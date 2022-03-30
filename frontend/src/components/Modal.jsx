import { useState, useEffect } from 'react';
import useFormFields from '../lib/hooksLib';
import axiosInstance from '../axiosApi';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Modal.css';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

const RecipeDetailsModal = ({ recipe, onHide }) => {
	const [fields, handleFieldChange] = useFormFields({
		title: '', //plan title
		recipes: [],
		day: 'Monday',
		meal: 'Breakfast',
	});
	const navigate = useNavigate();

	// TODO put request to add meals into a plan
	const handleAddToPlan = async (event) => {
		event.preventDefault();
		try {
			// await axiosInstance.post('/plans/update/', {
			// 	plan: fields.plan,
			// 	recipes: fields.recipes,
			// 	day: fields.day,
			// 	meal: fields.meal,
			// });
			navigate('/plan/');
		} catch (err) {
			console.log(err);
		}
	};

	// Select2 options
	const [plans, setPlans] = useState([]);

	const fetchAllPlans = async () => {
		try {
			const response = await axiosInstance.get('/plans/');
			setPlans(response.data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchAllPlans();
	}, []);

	plans.map((plan) => {
		return (
			(plan.value = plan.title),
			(plan.label = plan.title[0].toUpperCase() + plan.title.substring(1))
		);
	});
	const plan_options = plans;

	return (
		<Modal
			recipe={recipe}
			onHide={onHide}
			show
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					{recipe.title}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div>
					<span className="bold">Serves: </span> {recipe.serves}
				</div>

				<div>
					<span className="bold">Difficulty: </span>
					{recipe.difficulty}
					/5
				</div>
				<div>
					<span className="bold">Cooking temperature: </span>
					{recipe.cooking_temperature}
					°C
				</div>
				<div>
					<span className="bold">Cooking time: </span>
					{recipe.cooking_time} min |{' '}
					<span className="bold">Prep time: </span>
					{recipe.prep_time} min
				</div>
				<div>
					<span className="bold">Summary: </span>
					{recipe.summary}
				</div>
				<div>
					<span className="bold">Instructions: </span>
					{recipe.instructions}
				</div>
				<div>
					<span className="bold">Ingredients: </span>
					<ul>
						{recipe.recipe_ingredients.map((recipeIngredient) => {
							return (
								<li key={recipeIngredient.id}>
									{recipeIngredient.quantity}{' '}
									{recipeIngredient.ingredient.unit} of{' '}
									{recipeIngredient.ingredient.name}
								</li>
							);
						})}
					</ul>
				</div>
				<div className="grey">
					Created on {recipe.creation_date.split('T')[0]}
				</div>
				{/* TODO */}
				<Form onSubmit={handleAddToPlan}>
					<Form.Label>Plan</Form.Label>
					<Form.Group controlId="title">
						<Select
							options={plan_options}
							onChange={handleFieldChange}
							name="title"
						/>
					</Form.Group>

					<Form.Group controlId="day">
						<Form.Label>Day</Form.Label>
						<Form.Select
							value={fields.day}
							onChange={handleFieldChange}
							name="day"
						>
							<option value="Monday">Monday</option>
							<option value="Tuesday">Tuesday</option>
							<option value="Wednesday">Wednesday</option>
							<option value="Thursday">Thursday</option>
							<option value="Friday">Friday</option>
							<option value="Saturday">Saturday</option>
							<option value="Sunday">Sunday</option>
						</Form.Select>
					</Form.Group>
					<Form.Group controlId="meal">
						<Form.Label>Meal</Form.Label>
						<Form.Select
							value={fields.meal}
							onChange={handleFieldChange}
							name="meal"
						>
							<option value="Breakfast">Breakfast</option>
							<option value="Lunch">Lunch</option>
							<option value="Dinner">Dinner</option>
							<option value="Dessert">Dessert</option>
						</Form.Select>
					</Form.Group>

					<Button variant="success" type="submit">
						Add to plan
					</Button>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={onHide}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default RecipeDetailsModal;
