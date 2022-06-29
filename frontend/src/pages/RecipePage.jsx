import { Link } from 'react-router-dom';
import Recipes from '../components/Recipes';
import { Row, Col } from 'react-bootstrap';
import './RecipePage.css';

function RecipePage() {
	return (
		<div className="Recipe">
			<Row>
				<Col md="10">
					<Recipes />
				</Col>
				<Col md="2">
					<div>
						<Link to="/ingredients">Ingredients</Link>
					</div>

					<div>
						<Link to="/recipes/create">Create Recipe</Link>
					</div>
				</Col>
			</Row>
		</div>
	);
}

export default RecipePage;
