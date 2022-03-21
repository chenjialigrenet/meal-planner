import { useEffect } from 'react';
import axiosInstance from '../axiosApi';
import './Home.css';

function Home() {
	async function dummyLoad() {
		try {
			// const data = await axiosInstance.get('hello/');
			const data = await axiosInstance.get('/');
			console.log(data);
		} catch (error) {}
	}

	useEffect(() => {
		dummyLoad();
	});

	return (
		<div className="Home">
			<div className="lander">
				<h1>Meal Planner</h1>
				<p className="text-muted">Capstone project of CS50w</p>
			</div>
		</div>
	);
}

export default Home;
