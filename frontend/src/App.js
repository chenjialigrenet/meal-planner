import { useState, useEffect } from 'react';
import AppRoutes from './Routes';
import { AppContext } from './lib/contextLib';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './axiosApi';
// import onError from './lib/errorLib';
import './App.css';

function App() {
	const [isFetchingCurrentUser, setIsFetchingCurrentUser] = useState(false);
	const [isAuthenticated, userHasAuthenticated] = useState(false);
	const [currentUser, setCurrentUser] = useState(null);

	const navigate = useNavigate();

	fetchCurrentUser();

	useEffect(() => {
		if (isAuthenticated) {
			fetchCurrentUser();
		}
	}, [isAuthenticated]);

	async function fetchCurrentUser() {
		if (isFetchingCurrentUser || currentUser) {
			return;
		}

		const accessToken = localStorage.getItem('access_token');

		if (!accessToken) {
			return;
		}

		setIsFetchingCurrentUser(true);
		// Extract user data from token
		const userId = JSON.parse(atob(accessToken.split('.')[1])).user_id;
		const response = await axiosInstance.get(`/users/${userId}/`);
		setCurrentUser(response.data);
		userHasAuthenticated(true);
		setIsFetchingCurrentUser(false);
	}

	function handleLogout() {
		// TODO localStorage.removeItem('myCat'); no need to clear all
		localStorage.clear();
		userHasAuthenticated(false);
		setCurrentUser(null);
		// alert('Successfully logged out!');
		// Redirect to login after logout (useNavigate is a new version of useHistory)
		navigate('/login');
	}

	return (
		!isFetchingCurrentUser && (
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
									<LinkContainer to="/grocery">
										<Nav.Link>Grocery</Nav.Link>
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
						currentUser,
						setCurrentUser,
					}}
				>
					<AppRoutes />
				</AppContext.Provider>
			</div>
		)
	);
}

export default App;
