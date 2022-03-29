import './Plan.css';
import { Link } from 'react-router-dom';

function PlanPage() {
	return (
		<div className="Plan">
			<div>
				<Link to="/plans/create">Create a plan</Link>
			</div>

			<div>
				<Link to="/plans">All plans</Link>
			</div>
		</div>
	);
}

export default PlanPage;
