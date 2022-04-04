import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import useFormFields from '../../lib/hooksLib';

function ImageUploader() {
	const [fields, handleFieldChange] = useFormFields({ photo: '' });
	// const [image, setImage] = useState();
	const [imageURL, setImageURL] = useState('');

	useEffect(() => {
		if (fields.photo === '') return;
		const newImageUrl = URL.createObjectURL(fields.photo);
		setImageURL(newImageUrl);
	}, []);

	return (
		<>
			<Form.Group controlId="photo">
				<Form.Label>Image</Form.Label>
				<Form.Control
					type="file"
					multiple={false}
					accept="image/*"
					value={fields.photo}
					onChange={handleFieldChange}
					name="photo"
				/>
				{imageURL && (
					<img src={imageURL} alt="recipe_photo" height={100} />
				)}
			</Form.Group>
		</>
	);
}

export default ImageUploader;
