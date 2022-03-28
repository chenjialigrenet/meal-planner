import BsPagination from 'react-bootstrap/Pagination';

function Pagination({ currentPage, totalPages, setCurrentPage }) {
	const items = [];

	items.push(
		<BsPagination.Prev
			onClick={() => setCurrentPage(currentPage - 1)}
			disabled={currentPage <= 1}
		/>
	);

	items.push(<BsPagination.Item active>{currentPage}</BsPagination.Item>);

	items.push(
		<BsPagination.Next
			onClick={() => setCurrentPage(currentPage + 1)}
			disabled={currentPage >= totalPages}
		/>
	);

	return <BsPagination>{items}</BsPagination>;
}

export default Pagination;
