import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LoaderButton from '../components/utilities/LoaderButton';
import { useAppContext } from '../lib/contextLib';
import useFormFields from '../lib/hooksLib';
import axiosInstance from '../axiosApi';
import './SignupPage.css';

function Signup() {
	const [fields, handleFieldChange] = useFormFields({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	const navigate = useNavigate();
	const [newUser, setNewUser] = useState(null);
	const { userHasAuthenticated } = useAppContext();
	const [isLoading, setIsLoading] = useState(false);

	function validateForm() {
		return (
			fields.username.length > 0 &&
			fields.email.length > 0 &&
			fields.password.length > 0 &&
			fields.password === fields.confirmPassword
		);
	}

	async function handleSubmit(event) {
		event.preventDefault();
		setIsLoading(true);

		try {
			const newUser = await axiosInstance.post('/user/create/', {
				username: fields.username,
				email: fields.email,
				password: fields.password,
				confirmPassword: fields.confirmPassword,
			});

			setIsLoading(false);
			setNewUser(newUser);

			userHasAuthenticated(true);
			navigate('/');
		} catch (err) {
			console.log(err);
			setIsLoading(false);
		}
	}

	function renderForm() {
		return (
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="username">
					<Form.Label>Username</Form.Label>
					<Form.Control
						autoFocus
						type="text"
						value={fields.text}
						onChange={handleFieldChange}
						name="username"
					/>
				</Form.Group>
				<Form.Group controlId="email">
					<Form.Label>Email</Form.Label>
					<Form.Control type="email" value={fields.email} onChange={handleFieldChange} name="email" />
				</Form.Group>
				<Form.Group controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control
						autoFocus
						type="password"
						value={fields.password}
						onChange={handleFieldChange}
						name="password"
					/>
				</Form.Group>
				<Form.Group controlId="confirmPassword">
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						autoFocus
						type="password"
						value={fields.confirmPassword}
						onChange={handleFieldChange}
						name="confirmPassword"
					/>
				</Form.Group>
				<LoaderButton type="submit" isLoading={isLoading} disabled={!validateForm()}>
					Sign up
				</LoaderButton>
			</Form>
		);
	}

	return <div className="Signup">{newUser === null ? renderForm() : null}</div>;
}

export default Signup;
