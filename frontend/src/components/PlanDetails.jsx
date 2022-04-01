import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../axiosApi';
import useFormFields from '../lib/hooksLib';
import { FaEdit } from 'react-icons/fa';
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
			console.log(planData);
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

	return (
		<div className="PlanDetails">
			<h4>
				{fields.title} (ID: {params.planId})
				<span style={{ marginLeft: '10px' }}>
					<FaEdit
						onClick={() => {
							navigate(`/plans/update/${params.planId}`);
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
						<span className="bold">Meals: </span>
						<ul>
							{fields.meals.map((meal) => {
								return (
									<li key={meal.id}>
										Day: {meal.day} | Meal: {meal.meal} |{' '}
										{meal.recipes.map((recipe) => {
											return (
												<span key={recipe.id}>
													{recipe.title}
												</span>
											);
										})}
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			)}
		</div>
	);
}

export default PlanDetails;
