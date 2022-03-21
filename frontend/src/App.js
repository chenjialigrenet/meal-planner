import { useState, useEffect } from 'react';
import AppRoutes from './Routes';
import { AppContext } from './lib/contextLib';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import onError from './lib/errorLib';
import './App.css';

function App() {
	const [isAuthenticating, setIsAuthenticating] = useState(true);
	const [isAuthenticated, userHasAuthenticated] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		onLoad();
	}, []);

	// TODO
	async function onLoad() {
		try {
			//   await Auth.currentSession();
			userHasAuthenticated(true);
		} catch (err) {
			if (err !== 'No current user') {
				// alert(err);
				onError(err);
			}
		}

		setIsAuthenticating(false);
	}

	function handleLogout() {
		localStorage.clear();
		userHasAuthenticated(false);
		alert('Successfully logged out!');
		// Redirect to login after logout (useNavigate is a new version of useHistory)
		navigate('/login');
	}

	return (
		!isAuthenticating && (
			<div className="App container py-3">
				<Navbar
					collapseOnSelect
					bg="light"
					expand="md"
					className="mb-3"
				>
					<LinkContainer to="/">
						<Navbar.Brand className="font-weight-bold text-muted">
							Meal Planner
						</Navbar.Brand>
					</LinkContainer>

					<Navbar.Toggle />

					<Navbar.Collapse className="justify-content-end">
						<Nav>
							{isAuthenticated ? (
								<>
									<LinkContainer to="/plan">
										<Nav.Link>Plan</Nav.Link>
									</LinkContainer>
									<LinkContainer to="/recipe">
										<Nav.Link>Recipe</Nav.Link>
									</LinkContainer>
									<LinkContainer to="/user">
										<Nav.Link>Account</Nav.Link>
									</LinkContainer>

									<LinkContainer to="/login">
										<Nav.Link onClick={handleLogout}>
											Logout
										</Nav.Link>
									</LinkContainer>
								</>
							) : (
								<>
									<LinkContainer to="/signup">
										<Nav.Link>Signup</Nav.Link>
									</LinkContainer>
									<LinkContainer to="/login">
										<Nav.Link>Login</Nav.Link>
									</LinkContainer>
								</>
							)}
						</Nav>
					</Navbar.Collapse>
				</Navbar>

				<AppContext.Provider
					value={{
						isAuthenticated,
						userHasAuthenticated,
					}}
				>
					<AppRoutes />
				</AppContext.Provider>
			</div>
		)
	);
}

export default App;
