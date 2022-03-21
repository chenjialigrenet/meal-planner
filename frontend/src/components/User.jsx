// import { useEffect } from 'react';
// import axiosInstance from '../axiosApi';
import './User.css';

function UserPage() {
	// async function dummyLoad() {
	// 	try {
	// 		const data = await axiosInstance.get('/users/');
	// 		console.log(data);
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// }

	// useEffect(() => {
	// 	dummyLoad();
	// });

	return (
		<div>
			<h3>Hello Username</h3>
			<img src="" alt="profile_photo"></img>
			<ul>
				<li>Username: </li>
				<li>Email: </li>
				<li>Created on: </li>
			</ul>
		</div>
	);
}

export default UserPage;
