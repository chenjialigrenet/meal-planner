import { useEffect, useState } from 'react';
import axiosInstance from '../axiosApi';
import Card from 'react-bootstrap/Card';
import Search from '../components/utilities/Search';
import Pagination from './utilities/Pagination';
// import { FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useAppContext } from '../lib/contextLib';
import './Plans.css';

function Plans() {
	const [plans, setPlans] = useState([]);
	const [isFetching, setIsFetching] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const { currentUser } = useAppContext();
	const [activePlanId, setActivePlanId] = useState(currentUser.active_plan);
	// const navigate = useNavigate();
	// Search bar using continuous fetch
	const updateQuery = (query) => {
		setSearchQuery(query);
		setCurrentPage(1);
	};

	useEffect(() => {
		// GET all plans
		const fetchAllPlans = async () => {
			setIsFetching(true);
			try {
				const response = await axiosInstance.get(
					`/plans/?query=${searchQuery}&page=${currentPage}`
				);
				// console.log('ALL PLANS', response.data.plans);
				setPlans(response.data.plans);
				setTotalPages(response.data.total_pages);
				setIsFetching(false);
			} catch (err) {
				console.log(err);
				setIsFetching(false);
				//TODO ?? setHasFetchError(true)
			}
		};

		fetchAllPlans();
	}, [searchQuery, currentPage, activePlanId, currentUser]);

	// DELETE one plan
	// const deletePlan = async (id) => {
	// 	if (window.confirm('Are you sure to delete this plan?')) {
	// 		try {
	// 			await axiosInstance.delete(`/plans/${id}`);
	// 			const plansLeft = plans.filter((plan) => id !== plan.id);
	// 			setPlans(plansLeft);
	// 		} catch (err) {
	// 			console.log(err);
	// 		}
	// 	}
	// };

	const activatePlan = async (planId) => {
		try {
			const response = await axiosInstance.put(
				`plans/${planId}/activate`
			);
			const activePlanId = response.data.active_plan;
			console.log('ACTIVE PLAN ID', activePlanId);
			setActivePlanId(activePlanId);
			// window.location.reload(false);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="Plans">
			<Search searchQuery={searchQuery} setSearchQuery={updateQuery} />

			<div className="plan-list-container">
				{isFetching ? (
					<div>Please wait...</div>
				) : (
					<AnimatePresence>
						{plans.map((plan) => (
							<motion.div
								key={plan.id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
							>
								<Card
									className="plan-card"
									style={
										activePlanId === plan.id
											? { backgroundColor: 'lightgrey' }
											: { backgroundColor: 'white' }
									}
								>
									<Card.Body style={{ position: 'relative' }}>
										<Link
											to={`/plans/${plan.id}`}
											className="plan-link"
										>
											{plan.title}
										</Link>

										{activePlanId === plan.id ? null : (
											<Button
												variant="outline-danger"
												size="sm"
												style={{ float: 'right' }}
												onClick={() => {
													activatePlan(plan.id);
												}}
											>
												Activate
											</Button>
										)}

										{/* <span
											style={{
												float: 'right',
												cursor: 'pointer',
											}}
										>
											<FaTimes
												onClick={() => {
													deletePlan(plan.id);
												}}
											/>
										</span> */}
									</Card.Body>
								</Card>
							</motion.div>
						))}
					</AnimatePresence>
				)}
				{!isFetching && (
					<Pagination
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
						totalPages={totalPages}
					/>
				)}
			</div>
		</div>
	);
}

export default Plans;
