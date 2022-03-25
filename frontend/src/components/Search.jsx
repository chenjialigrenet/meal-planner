import React, { useState } from 'react';

function Search() {
	const [inputText, setinputText] = useState('');
	const inputHandler = (e) => {
		const lowerCase = e.target.value.toLowerCase();
	};

	return (
		<div>
			<input
				type="text"
				placeholder="Search"
				value={inputText}
				onChange={inputHandler}
			/>
		</div>
	);
}

export default Search;
