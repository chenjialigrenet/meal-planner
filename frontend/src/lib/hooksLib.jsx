import { useState } from 'react';

// Create custom hook
function useFormFields(initialState) {
	const [fields, setValues] = useState(initialState);

	return [
		fields,
		(event) => {
			if (event.target.name === 'photo') {
				setValues({
					...fields,
					[event.target.name]: event.target.files[0],
				});
			} else {
				setValues({
					...fields,
					[event.target.name]: event.target.value.trim(),
				});
			}

			// console.log('event.target.name: ', event.target.name);
			// console.log('From hookslib: ', event.target.files[0]);
		},
		(field, value) => {
			setValues({ ...fields, [field]: value });
		},
		// console.log(fields),
	];
}

export default useFormFields;
