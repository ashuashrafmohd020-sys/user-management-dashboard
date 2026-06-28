function SearchBar({
  searchTerm,
  setSearchTerm,
  onAddUser,
  onFilter,
}) {
  return (
    <div className="toolbar">
      <button
        className="add-btn"
        onClick={onAddUser}
      >
        + Add User
      </button>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button
          className="filter-btn"
          onClick={onFilter}
        >
          Filter
        </button>
      </div>
    </div>
  );
}

export default SearchBar;