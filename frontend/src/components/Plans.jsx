import { useEffect, useState } from 'react';
import axiosInstance from '../axiosApi';
import Card from 'react-bootstrap/Card';
import Search from '../components/utilities/Search';
import Pagination from './utilities/Pagination';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useAppContext } from '../lib/contextLib';
import './Plans.css';

function Plans() {
	const [plans, setPlans] = useState([]);
	const [isFetching, setIsFetching] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const { currentUser, setCurrentUser } = useAppContext();
	const activePlanId = currentUser.active_plan;

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
	}, [searchQuery, currentPage, currentUser]);

	const activatePlan = async (planId) => {
		try {
			const response = await axiosInstance.put(
				`plans/${planId}/activate`
			);
			const activePlanId = response.data.active_plan;
			// console.log('ACTIVE PLAN ID', activePlanId);
			setCurrentUser({ ...currentUser, active_plan: activePlanId });
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
