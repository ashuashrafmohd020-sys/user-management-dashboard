function Pagination({
  usersPerPage,
  setUsersPerPage,
  currentPage,
  totalPages,
  previousPage,
  nextPage,
}) {
  return (
    <div className="pagination">
      <div>
        Show

        <select
          value={usersPerPage}
          onChange={(e) =>
            setUsersPerPage(Number(e.target.value))
          }
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>

      <div className="page-buttons">
        <button
          onClick={previousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;