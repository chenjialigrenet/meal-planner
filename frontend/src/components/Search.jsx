import React, { useState } from 'react';

function Search(props) {
	const [inputText, setInputText] = useState('');
	const inputHandler = (e) => {
		const lowerCase = e.target.value.toLowerCase();
		setInputText(lowerCase);
	};
	const filteredItems = props.filter((item) => {
		if (inputText === '') {
			return item;
		} else {
			if (item === 'ingredient') {
				return item.name.toLowerCase().includes(inputText);
			} else if (item === 'recipe') {
				return item.title.toLowerCase().includes(inputText);
			}
		}
	});

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
