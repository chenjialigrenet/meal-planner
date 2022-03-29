import { useEffect, useState } from 'react';
import axiosInstance from '../axiosApi';

function Plans() {
	const [plans, setPlans] = useState([]);
	// TODO
	// get one plan
	// put request to update a plan (add, change or remove meals)
	// delete request to remove a plan

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

	return (
		<div>
			<h3>Plan list</h3>
			<ul>
				{plans.map((plan) => (
					<li>{plan.title}</li>
				))}
			</ul>
		</div>
	);
}

export default Plans;
