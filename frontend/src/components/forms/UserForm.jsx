// import { useState } from 'react';
import { useAppContext } from '../../lib/contextLib';
import { Form, Button } from 'react-bootstrap';
import useFormFields from '../../lib/hooksLib';
import './UserForm.css';
import axiosInstance from '../../axiosApi';
import { useNavigate } from 'react-router-dom';

function UserForm() {
	const navigate = useNavigate();
	const { currentUser, setCurrentUser } = useAppContext();
	const [fields, handleFieldChange] = useFormFields({
		username: currentUser.username,
		email: currentUser.email,
		photo: '',
		password: currentUser.password,
	});
	console.log(currentUser);

	const handleUpdateUser = async (e) => {
		e.preventDefault();
		try {
			const formData = new FormData();
			formData.append('username', fields.username);
			formData.append('email', fields.email);
			if (fields.photo) {
				formData.append('photo', fields.photo, fields.photo.name);
			}
			const response = await axiosInstance.put(
				`/user/update/`,
				formData,
				{
					headers: {
						'content-type': 'multipart/form-data',
					},
				}
			);
			setCurrentUser(response.data);
			navigate(`/user`);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="UserForm">
			<h3>Update User</h3>
			<Form onSubmit={handleUpdateUser}>
				<Form.Group controlId="username">
					<Form.Label>Username</Form.Label>
					<Form.Control
						type="text"
						value={fields.username}
						onChange={handleFieldChange}
						name="username"
					/>
				</Form.Group>
				<Form.Group controlId="email">
					<Form.Label>Email</Form.Label>
					<Form.Control
						type="email"
						value={fields.email}
						onChange={handleFieldChange}
						name="email"
					/>
				</Form.Group>
				{/* <Form.Group controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						value={fields.password}
						onChange={handleFieldChange}
						name="password"
					/>
				</Form.Group> */}
				<Form.Group controlId="photo">
					<Form.Label>Photo</Form.Label>
					<input
						type="file"
						name="photo"
						accept="image/*"
						className="form-control"
						onChange={handleFieldChange}
					></input>
				</Form.Group>

				<Button type="submit">Save</Button>
			</Form>
		</div>
	);
}

export default UserForm;
