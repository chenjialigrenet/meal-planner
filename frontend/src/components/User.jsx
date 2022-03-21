import { useEffect } from 'react';
import { useAppContext } from '../lib/contextLib';
import axiosInstance from '../axiosApi';
import './User.css';

function UserPage() {
	const { currentUser } = useAppContext();

	return (
		<div>
			<h3>Hello Username</h3>
			<img src="" alt="profile_photo"></img>
			<ul>
				<li>Username: {currentUser.username}</li>
				<li>Email: </li>
				<li>Created on: </li>
			</ul>
		</div>
	);
}

export default UserPage;
