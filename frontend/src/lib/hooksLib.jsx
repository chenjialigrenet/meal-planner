import { useState } from 'react';

// Create custom hook
function useFormFields(initialState) {
	const [fields, setValues] = useState(initialState);

	return [
		fields,
		(event) => {
			setValues({ ...fields, [event.target.id]: event.target.value });
		},
		(field, value) => {
			setValues({ ...fields, [field]: value });
		},
	];
}

export default useFormFields;
