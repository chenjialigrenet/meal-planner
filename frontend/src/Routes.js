import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
// import Logout from './components/Logout';
import NotFound from './components/NotFound';

function AppRoutes() {
	return (
		<Routes>
			<Route exact path="/" element={<Home />} />
			<Route exact path="/Signup" element={<Signup />} />
			<Route exact path="/Login" element={<Login />} />
			{/* <Route exact path="/Logout" element={<Logout />} /> */}
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}

export default AppRoutes;
