import { useState } from 'react';
import { useAppContext } from '../lib/contextLib';
import LoaderButton from '../components/LoaderButton';
import onError from '../lib/errorLib';
import useFormFields from '../lib/hooksLib';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
import './Login.css';

function Login() {
	const navigate = useNavigate();
	const { userHasAuthenticated } = useAppContext();
	const [isLoading, setIsLoading] = useState(false);

	// const [email, setEmail] = useState('');
	// const [password, setPassword] = useState('');
	const [fields, handleFieldChange] = useFormFields({
		email: '',
		password: '',
	});

	function validateForm() {
		return fields.email.length > 0 && fields.password.length > 0;
	}

	async function handleSubmit(event) {
		event.preventDefault();
		setIsLoading(true);

		// TODO: Add login functionality
		try {
			// await Auth.signIn(email, password);
			// alert('Logged in');
			userHasAuthenticated(true);
			// Redirect to Home on Login
			navigate('/');
		} catch (err) {
			// alert(err.message);
			onError(err);
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
			</Form>
		</div>
	);
}

export default Login;
