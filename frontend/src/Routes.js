import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import NotFound from './components/NotFound';
import Plan from './components/Plan';
import Recipe from './components/Recipe';
import User from './components/User';

function AppRoutes() {
	return (
		<Routes>
			<Route exact path="/" element={<Home />} />
			<Route exact path="/signup" element={<Signup />} />
			<Route exact path="/login" element={<Login />} />
			<Route exact path="/plan" element={<Plan />} />
			<Route exact path="/recipe" element={<Recipe />} />
			<Route exact path="/user" element={<User />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}

export default AppRoutes;
