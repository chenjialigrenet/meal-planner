import { useState, useEffect } from 'react';
import { useAppContext } from '../lib/contextLib';
import LoaderButton from '../components/utilities/LoaderButton';
import useFormFields from '../lib/hooksLib';
import { useNavigate } from 'react-router-dom';
import { Form, Alert } from 'react-bootstrap';
import axiosInstance from '../axiosApi';
import { API_URL } from '../constants';
import './LoginPage.css';

function Login() {
	const navigate = useNavigate();
	const { userHasAuthenticated, currentUser } = useAppContext();
	const [isLoading, setIsLoading] = useState(false);
	const [loginFailed, setLoginFailed] = useState(false);
	const [fields, handleFieldChange] = useFormFields({
		email: '',
		password: '',
	});

	useEffect(() => {
		// Check if user is already logged in and if so, redirect to /
		if (currentUser) {
			navigate('/');
		} else {
			navigate('/login');
		}
	}, [currentUser, navigate]);

	function validateForm() {
		return fields.email.length > 0 && fields.password.length > 0;
	}

	async function handleSubmit(event) {
		event.preventDefault();
		setIsLoading(true);
		setLoginFailed(false);

		try {
			const response = await axiosInstance.post(`${API_URL}/token/obtain/`, {
				email: fields.email,
				password: fields.password,
			});

			axiosInstance.defaults.headers['Authorization'] = 'JWT ' + response.data.access;
			localStorage.setItem('access_token', response.data.access);
			localStorage.setItem('refresh_token', response.data.refresh);

			userHasAuthenticated(true);
			// Redirect to Home on Login (useNavigate is a new version of useHistory)
			navigate('/');
		} catch (err) {
			console.log(err);
			setLoginFailed(true);
			setIsLoading(false);
		}
	}

	return (
		<div className="Login">
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="email">
					<Form.Label>Email</Form.Label>
					<Form.Control
						autoFocus
						type="email"
						value={fields.email}
						onChange={handleFieldChange}
						name="email"
					/>
				</Form.Group>
				<Form.Group controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						value={fields.password}
						onChange={handleFieldChange}
						name="password"
					/>
				</Form.Group>
				<LoaderButton type="submit" isLoading={isLoading} disabled={!validateForm()}>
					Log in
				</LoaderButton>
				{loginFailed ? <Alert variant="danger">It failed!</Alert> : null}
			</Form>
		</div>
	);
}

export default Login;
