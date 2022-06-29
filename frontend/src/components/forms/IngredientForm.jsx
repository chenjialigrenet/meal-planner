import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import useFormFields from '../../lib/hooksLib';
import LoaderButton from '../utilities/LoaderButton';
import axiosInstance from '../../axiosApi';
import './IngredientForm.css';

function Ingredient() {
	const [fields, handleFieldChange] = useFormFields({
		name: '',
		unit: 'piece',
	});
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const validateForm = () => {
		return fields.name.length > 0;
	};

	const handleCreateIngredient = async (event) => {
		event.preventDefault();
		setIsLoading(true);

		try {
			await axiosInstance.post('/ingredients/', {
				name: fields.name,
				unit: fields.unit,
			});

			setIsLoading(false);
			navigate('/ingredients/');
		} catch (err) {
			console.log(err);
			setIsLoading(false);
		}
	};

	return (
		<div className="Ingredient">
			<h3>Add ingredient</h3>
			<Form onSubmit={handleCreateIngredient}>
				<Form.Group controlId="name">
					<Form.Label>Ingredient</Form.Label>
					<Form.Control autoFocus type="text" value={fields.name} onChange={handleFieldChange} name="name" />
				</Form.Group>
				<Form.Group controlId="unit">
					<Form.Label>Unit</Form.Label>
					<Form.Select value={fields.unit} onChange={handleFieldChange} name="unit">
						<option value="piece">PCS - piece</option>
						<option value="pound">LB - pound</option>
						<option value="once">OZ - once</option>
						<option value="miligramme">MG - miligramme</option>
						<option value="gramme">G - gramme</option>
						<option value="kilogramme">KG - kilogramme</option>
						<option value="mililiter/cc">ML/CC - mililiter</option>
						<option value="liter">L - liter</option>
						<option value="teaspoon">TSP - teaspoon</option>
						<option value="tablespoon">TBSP - tablespoon</option>
						<option value="fluid once">FLOZ - fluid once</option>
						<option value="cup">CUP - cup</option>
						<option value="drop">DR - drop</option>
						<option value="pinch">PN - pinch</option>
					</Form.Select>
				</Form.Group>
				<LoaderButton type="submit" isLoading={isLoading} disabled={!validateForm()}>
					Add
				</LoaderButton>
			</Form>
		</div>
	);
}

export default Ingredient;
