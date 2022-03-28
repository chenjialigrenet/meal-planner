import React from 'react';
import './Search.css';

function Search({ searchQuery, setSearchQuery }) {
	const inputHandler = (e) => {
		const lowerCase = e.target.value.toLowerCase();
		setSearchQuery(lowerCase);
	};

	return (
		<div className="search">
			<input
				className="form-control"
				type="text"
				placeholder="Search"
				value={searchQuery}
				onChange={inputHandler}
				name="searchQuery"
			/>
			{searchQuery && (
				<span
					className="search__clear"
					onClick={() => setSearchQuery('')}
				>
					x
				</span>
			)}
		</div>
	);
}

export default Search;
