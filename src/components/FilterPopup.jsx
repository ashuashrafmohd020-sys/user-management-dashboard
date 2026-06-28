function FilterPopup({
  showFilter,
  filters,
  setFilters,
  applyFilters,
  resetFilters,
  closeFilter,
}) {
  if (!showFilter) {
    return null;
  }

  return (
    <div className="filter-popup">
      <h2>🔶 Filter Users</h2>

      <div className="filter-grid">
        <input
          type="text"
          placeholder="First Name"
          value={filters.firstName}
          onChange={(e) =>
            setFilters({
              ...filters,
              firstName: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Last Name"
          value={filters.lastName}
          onChange={(e) =>
            setFilters({
              ...filters,
              lastName: e.target.value,
            })
          }
        />

        <input
          type="email"
          placeholder="Email"
          value={filters.email}
          onChange={(e) =>
            setFilters({
              ...filters,
              email: e.target.value,
            })
          }
        />

        <select
          value={filters.department}
          onChange={(e) =>
            setFilters({
              ...filters,
              department: e.target.value,
            })
          }
        >
          <option value="">All Departments</option>
          <option value="IT">IT</option>
          <option value="CSE">CSE</option>
          <option value="AIML">AIML</option>
          <option value="ECE">ECE</option>
          <option value="Cyber Security">Cyber Security</option>
        </select>
      </div>

      <div className="filter-buttons">
        <button onClick={applyFilters}>
          ✅ Apply
        </button>

        <button onClick={resetFilters}>
          🔄 Reset
        </button>

        <button onClick={closeFilter}>
          ❌ Close
        </button>
      </div>
    </div>
  );
}

export default FilterPopup;