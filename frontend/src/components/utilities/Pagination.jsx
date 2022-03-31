import BsPagination from 'react-bootstrap/Pagination';

function Pagination({ currentPage, totalPages, setCurrentPage }) {
	const items = [];

	items.push(
		<BsPagination.First
			key="first"
			onClick={() => setCurrentPage(1)}
			disabled={currentPage === 1}
		/>
	);

	items.push(
		<BsPagination.Prev
			key="prev"
			onClick={() => setCurrentPage(currentPage - 1)}
			disabled={currentPage <= 1}
		/>
	);

	if (currentPage - 3 >= 1) {
		items.push(<BsPagination.Ellipsis key="prev-ellipsis" disabled />);
	}

	if (currentPage - 2 >= 1) {
		items.push(
			<BsPagination.Item
				key={currentPage - 2}
				onClick={() => setCurrentPage(currentPage - 2)}
			>
				{currentPage - 2}
			</BsPagination.Item>
		);
	}

	if (currentPage - 1 >= 1) {
		items.push(
			<BsPagination.Item
				key={currentPage - 1}
				onClick={() => setCurrentPage(currentPage - 1)}
			>
				{currentPage - 1}
			</BsPagination.Item>
		);
	}

	items.push(
		<BsPagination.Item key={currentPage} active>
			{currentPage}
		</BsPagination.Item>
	);

	if (currentPage + 1 <= totalPages) {
		items.push(
			<BsPagination.Item
				key={currentPage + 1}
				onClick={() => setCurrentPage(currentPage + 1)}
			>
				{currentPage + 1}
			</BsPagination.Item>
		);
	}

	if (currentPage + 2 <= totalPages) {
		items.push(
			<BsPagination.Item
				key={currentPage + 2}
				onClick={() => setCurrentPage(currentPage + 2)}
			>
				{currentPage + 2}
			</BsPagination.Item>
		);
	}

	if (currentPage + 3 < totalPages) {
		items.push(<BsPagination.Ellipsis key="next-ellipsis" disabled />);
	}

	items.push(
		<BsPagination.Next
			key="next"
			onClick={() => setCurrentPage(currentPage + 1)}
			disabled={currentPage >= totalPages}
		/>
	);

	items.push(
		<BsPagination.Last
			key="last"
			onClick={() => setCurrentPage(totalPages)}
			disabled={currentPage === totalPages}
		/>
	);

	return <BsPagination>{items}</BsPagination>;
}

export default Pagination;
