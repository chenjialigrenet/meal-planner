import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useFormFields from '../lib/hooksLib';
import axiosInstance from '../axiosApi';

function IngDetailsModal({ ingredient, onHide }) {
	const [fields, handleFieldChange] = useFormFields({
		name: ingredient.name,
		unit: ingredient.unit,
	});

	// UPDATE one ingredient
	const updateIngredient = async (id) => {
		try {
			await axiosInstance.put(`/ingredients/${id}/`, {
				name: fields.name,
				unit: fields.unit,
			});
			// Hide modal, refresh page
			window.location.reload();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Form>
			<Modal
				ingredient={ingredient}
				onHide={onHide}
				show
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						{ingredient.name} (ID: {ingredient.id})
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group controlId="name">
						<Form.Label>Ingredient</Form.Label>
						<Form.Control
							type="text"
							value={fields.name}
							onChange={handleFieldChange}
							name="name"
						/>
					</Form.Group>
					<Form.Group controlId="unit">
						<Form.Label>Unit</Form.Label>
						<Form.Select
							value={fields.unit}
							onChange={handleFieldChange}
							name="unit"
						>
							<option value="piece">PCS - piece</option>
							<option value="pound">LB - pound</option>
							<option value="once">OZ - once</option>
							<option value="miligramme">MG - miligramme</option>
							<option value="gramme">G - gramme</option>
							<option value="kilogramme">KG - kilogramme</option>
							<option value="mililiter/cc">
								ML/CC - mililiter
							</option>
							<option value="liter">L - liter</option>
							<option value="teaspoon">TSP - teaspoon</option>
							<option value="tablespoon">
								TBSP - tablespoon
							</option>
							<option value="fluid once">
								FLOZ - fluid once
							</option>
							<option value="cup">CUP - cup</option>
							<option value="drop">DR - drop</option>
							<option value="pinch">PN - pinch</option>
						</Form.Select>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={() => updateIngredient(ingredient.id)}>
						Update
					</Button>
				</Modal.Footer>
			</Modal>
		</Form>
	);
}

export default IngDetailsModal;
