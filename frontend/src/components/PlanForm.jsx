// import { useState } from 'react';
import './PlanForm.css';
// import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
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
	});

	const navigate = useNavigate();
	// const showRecipes = () => {
	// 	navigate('/recipe');
	// };

	const handlePlanCreate = async (event) => {
		event.preventDefault();
		try {
			await axiosInstance.post('/plans/', {
				title: fields.title,
			});
			navigate('/plans');
		} catch (err) {
			console.log(err);
		}
	};

	// TODO get meals => render in a cell

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
				<br />
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
