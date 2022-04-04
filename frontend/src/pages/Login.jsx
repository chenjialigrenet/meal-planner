import { useState, useEffect } from 'react';
import { useAppContext } from '../lib/contextLib';
import LoaderButton from '../components/LoaderButton';
// import onError from '../lib/errorLib';
import useFormFields from '../lib/hooksLib';
import { useNavigate } from 'react-router-dom';
import { Form, Alert } from 'react-bootstrap';
import './Login.css';
import axiosInstance from '../axiosApi';
import { API_URL } from '../constants';

function Login() {
	const navigate = useNavigate();
	const { userHasAuthenticated, setCurrentUser } = useAppContext();
	const [isLoading, setIsLoading] = useState(false);
	const [loginFailed, setLoginFailed] = useState(false);

	// const [email, setEmail] = useState('');
	// const [password, setPassword] = useState('');
	const [fields, handleFieldChange] = useFormFields({
		email: '',
		password: '',
	});

	useEffect(() => {
		// TODO: check if user is already logged in and if so, redirect to /
	}, []);

	function validateForm() {
		return fields.email.length > 0 && fields.password.length > 0;
	}

	async function handleSubmit(event) {
		event.preventDefault();
		setIsLoading(true);
		setLoginFailed(false);

		try {
			const response = await axiosInstance.post(
				`${API_URL}/token/obtain/`,
				{
					email: fields.email,
					password: fields.password,
				}
			);

			axiosInstance.defaults.headers['Authorization'] =
				'JWT ' + response.data.access;
			localStorage.setItem('access_token', response.data.access);
			localStorage.setItem('refresh_token', response.data.refresh);

			userHasAuthenticated(true);
			// alert('Logged in');
			// Redirect to Home on Login (useNavigate is a new version of useHistory)
			navigate('/');
		} catch (err) {
			// alert(err.message);
			// onError(err);
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
						// onChange={(e) => setEmail(e.target.value)}
						onChange={handleFieldChange}
					/>
				</Form.Group>
				<Form.Group controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						value={fields.password}
						// onChange={(e) => setPassword(e.target.value)}
						onChange={handleFieldChange}
					/>
				</Form.Group>
				<LoaderButton
					type="submit"
					isLoading={isLoading}
					disabled={!validateForm()}
				>
					Log in
				</LoaderButton>
				{loginFailed ? <Alert variant="danger">IT FAILED</Alert> : null}
			</Form>
		</div>
	);
}

export default Login;
