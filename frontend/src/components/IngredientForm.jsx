import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import useFormFields from '../lib/hooksLib';
import LoaderButton from '../components/LoaderButton';
import './IngredientForm.css';
import axiosInstance from '../axiosApi';
import onError from '../lib/errorLib';

function Ingredient() {
	const [fields, handleFieldChange] = useFormFields({
		name: '',
		unit: '1',
	});
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	function validateForm() {
		return fields.name.length > 0;
	}

	async function handleSubmit(event) {
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
			onError(err);
			setIsLoading(false);
		}
	}

	return (
		<div className="Ingredient">
			<h2>Add ingredient</h2>
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="name">
					<Form.Label>Ingredient</Form.Label>
					<Form.Control
						autoFocus
						type="text"
						value={fields.name}
						onChange={handleFieldChange}
					/>
				</Form.Group>
				<Form.Group controlId="unit">
					<Form.Label>Unit</Form.Label>
					<Form.Select
						value={fields.unit}
						onChange={handleFieldChange}
					>
						<option value="1">PCS - piece</option>
						<option value="2">LB - pound</option>
						<option value="3">OZ - once</option>
						<option value="4">MG - miligramme</option>
						<option value="5">G - gramme</option>
						<option value="6">KG - kilogramme</option>
						<option value="7">ML/CC - mililiter</option>
						<option value="8">L - liter</option>
						<option value="9">TSP - teaspoon</option>
						<option value="10">TBSP - tablespoon</option>
						<option value="11">FLOZ - fluid once</option>
						<option value="12">CUP - cup</option>
						<option value="13">DR - drop</option>
						<option value="14">PN - pinch</option>
					</Form.Select>
				</Form.Group>
				<LoaderButton
					type="submit"
					isLoading={isLoading}
					disabled={!validateForm()}
				>
					Add
				</LoaderButton>
			</Form>
		</div>
	);
}

export default Ingredient;
