import { useEffect, useState } from 'react';
import axiosInstance from '../axiosApi';
import Select from 'react-select';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import Search from '../components/Search';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

function Plans() {
	// TODO
	// put request to update a plan (add, change or remove meals)
	// delete request to remove a plan

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

	const [selectedPlan, setSelectedPlan] = useState([]);
	const handleShowPlan = (selectedPlan) => {
		setSelectedPlan(selectedPlan);
		// console.log(selectedPlan);
	};

	// Search bar
	const [searchQuery, setSearchQuery] = useState('');
	const filteredPlans = plans.filter((plan) => {
		if (searchQuery === '') {
			return plan;
		} else {
			return plan.title.toLowerCase().includes(searchQuery);
		}
	});

	return (
		<div>
			<Row>
				<Col md="6">
					<div>
						<Search
							searchQuery={searchQuery}
							setSearchQuery={setSearchQuery}
						/>
						<br />
						{filteredPlans.map((plan) => (
							<Card key={plan.id}>
								<Card.Body>{plan.title}</Card.Body>
							</Card>
						))}
					</div>
				</Col>
				<Col md="6">
					<Form>
						<Form.Label>Plan list</Form.Label>
						<Form.Group controlId="title">
							<Select
								onChange={handleShowPlan}
								options={plan_options}
								name="title"
							/>
						</Form.Group>
					</Form>
					<br />
					<Card>
						<CardHeader>Selected plan</CardHeader>
						{selectedPlan.title && (
							<Card.Body>
								<Card.Title>{selectedPlan.title}</Card.Title>

								<Card.Text>
									Created on{' '}
									{selectedPlan.creation_date.split('T')[0]}{' '}
									by user {selectedPlan.user}
								</Card.Text>
							</Card.Body>
						)}
					</Card>
					<br />
					<div>
						<Link to="/plans/create">Create a plan</Link>
					</div>
				</Col>
			</Row>
		</div>
	);
}

export default Plans;
