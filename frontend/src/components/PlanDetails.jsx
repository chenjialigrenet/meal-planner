import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../axiosApi';
import useFormFields from '../lib/hooksLib';
import { FaEdit, FaTimes } from 'react-icons/fa';
import { Table } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import './PlanDetails.css';

function PlanDetails() {
	const params = useParams();
	const navigate = useNavigate();

	// Axios fetching recipe data
	const [isFetching, setIsFetching] = useState(true);

	// GET one plan
	const fetchPlan = async () => {
		setIsFetching(true);
		try {
			const response = await axiosInstance.get(
				`/plans/${params.planId}/`
			);
			const planData = response.data;
			// console.log('PLAN DATA', planData);
			setFieldsValues(planData);
			setIsFetching(false);
		} catch (err) {
			console.log(err);
			setIsFetching(false);
		}
	};

	useEffect(() => {
		fetchPlan();
	}, []);

	const [fields, handleFieldChange, changeFieldValue, setFieldsValues] =
		useFormFields({
			id: null,
			title: '',
			meals: [],
		});

	// DELETE one plan
	const deletePlan = async (id) => {
		if (window.confirm('Are you sure to delete this plan?')) {
			try {
				await axiosInstance.delete(`/plans/${id}`);
				navigate('/plan');
			} catch (err) {
				console.log(err);
			}
		}
	};

	// Transform data, group plan meals data by day
	const groupedMeals = {};
	fields.meals.forEach((planDay) => {
		if (!groupedMeals[planDay.day]) {
			groupedMeals[planDay.day] = [];
		}
		groupedMeals[planDay.day].push(planDay);
	});
	const groupedMealsArray = Object.values(groupedMeals);
	// console.log('GROUPED MEALS ARR', groupedMealsArray);
	const daysOfWeek = [
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
		'Sunday',
	];

	return (
		<div className="PlanDetails">
			<h4>
				{fields.title} (ID: {params.planId})
				<span style={{ marginLeft: '10px', cursor: 'pointer' }}>
					<FaEdit
						onClick={() => {
							navigate(`/plans/${params.planId}/update`);
						}}
					/>
				</span>
				<span>
					<FaTimes
						style={{ marginLeft: '10px', cursor: 'pointer' }}
						onClick={() => {
							deletePlan(params.planId);
						}}
					/>
				</span>
			</h4>
			{!isFetching && (
				<div className="plan-container">
					<span className="plan block-container">
						Created on {fields.creation_date.split('T')[0]}
					</span>
					<div>
						<Table bordered>
							<thead
								style={{
									backgroundColor: 'lightgrey',
									textAlign: 'center',
								}}
							>
								<tr>
									<th>Day</th>
									<th>Breakfast</th>
									<th>Lunch</th>
									<th>Dinner</th>
								</tr>
							</thead>
							<tbody>
								{groupedMealsArray.map((row, index) => {
									return (
										<tr key={daysOfWeek[index]}>
											<td>{daysOfWeek[index]}</td>
											{row.map((meal) => {
												return meal.recipes[0] ===
													undefined ? (
													<td key={uuidv4()}></td>
												) : (
													<td key={uuidv4()}>
														{meal.recipes[0].title}
													</td>
												);
											})}
										</tr>
									);
								})}
							</tbody>
						</Table>
					</div>
				</div>
			)}
		</div>
	);
}

export default PlanDetails;
