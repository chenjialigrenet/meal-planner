import { useAppContext } from '../lib/contextLib';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './UserPage.css';

function UserPage() {
	// TODO edit user
	const { currentUser } = useAppContext();
	const navigate = useNavigate();

	const defaultProfilePhoto =
		'https://avatars.dicebear.com/api/pixel-art-neutral/:seed.svg';

	return (
		<div className="User">
			<h3>Hello {currentUser.username} !</h3>

			<div className="flex-container">
				<img
					src={
						currentUser.photo === null
							? defaultProfilePhoto
							: currentUser.photo
					}
					alt="profile_photo"
				/>

				<ul>
					<li>Username: {currentUser.username}</li>
					<li>Email: {currentUser.email}</li>
					<li>Created on: {currentUser.date_joined.split('T')[0]}</li>
				</ul>
			</div>
			<Button
				onClick={() => {
					navigate(`/user/update`);
				}}
			>
				Edit
			</Button>
		</div>
	);
}

export default UserPage;
