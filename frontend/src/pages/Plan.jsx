import './Plan.css';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Plans from '../components/Plans';

function PlanPage() {
	return (
		<div className="Plan">
			<Row>
				<Col md="10">
					<Plans />
				</Col>
				<Col>
					<div>
						<Link to="/plans/create">Create a plan</Link>
					</div>
				</Col>
			</Row>
		</div>
	);
}

export default PlanPage;
