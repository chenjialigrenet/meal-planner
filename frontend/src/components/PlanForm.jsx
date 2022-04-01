// import { useState } from 'react';
import './PlanForm.css';
// import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import useFormFields from '../lib/hooksLib';
import axiosInstance from '../axiosApi';

function PlanForm() {
	// const daysOfWeek = [
	// 	'Monday',
	// 	'Tuesday',
	// 	'Wednesday',
	// 	'Thursday',
	// 	'Friday',
	// 	'Saturday',
	// 	'Sunday',
	// ];

	const [fields, handleFieldChange] = useFormFields({
		title: '',
		// meals: [],
		// day: '',
		// meal: '',
		// user: '',
	});
	const params = useParams();
	const navigate = useNavigate();

	const handlePlanCreate = async (event) => {
		event.preventDefault();
		try {
			await axiosInstance.post('/plans/', {
				title: fields.title,
				// meals: fields.meals.map((meal) => {
				// 	return {
				// 		id: meal.id,
				// 		plan: meal.plan,
				// 		day: meal.day,
				// 		meal: meal.meal,
				// 		recipes: meal.recipes.map((recipe) => {
				// 			return {
				// 				id: recipe.id,
				// 				title: recipe.title,
				// 			};
				// 		}),
				// 	};
				// }),
			});
			navigate('/plan');
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			<Form onSubmit={handlePlanCreate}>
				<Form.Group controlId="title">
					<Form.Label>Plan title</Form.Label>
					<Form.Control
						type="text"
						value={fields.title}
						onChange={handleFieldChange}
						name="title"
					/>
				</Form.Group>

				{/* <Table bordered>
					<thead>
						<tr>
							<th>#</th>
							<th>Breakfast</th>
							<th>Lunch</th>
							<th>Dinner</th>
							<th>Dessert</th>
						</tr>
					</thead>
					<tbody>
						{daysOfWeek.map((day) => {
							return (
								<tr key={day}>
									<td>
										<span className="bold">{day}</span>
									</td>
									<td>
										<Button
											id="breakfast"
											onClick={showRecipes}
										>
											+
										</Button>
									</td>
									<td>
										<Button
											id="lunch"
											onClick={showRecipes}
										>
											+
										</Button>
									</td>
									<td>
										<Button
											id="diner"
											onClick={showRecipes}
										>
											+
										</Button>
									</td>
									<td>
										<Button
											id="dessert"
											onClick={showRecipes}
										>
											+
										</Button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table> */}
				<Button type="submit">Save</Button>
			</Form>
		</div>
	);
}

export default PlanForm;
