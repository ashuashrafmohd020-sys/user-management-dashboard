function UserTable({
  users,
  loading,
  error,
  editUser,
  deleteUser,
  handleSort,
  sortField,
  sortOrder,
}) {
  if (loading) {
    return <h3>Loading users...</h3>;
  }

  if (error) {
    return <h3 style={{ color: "red" }}>{error}</h3>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th onClick={() => handleSort("firstName")}>
  First Name{" "}
  {sortField === "firstName"
    ? sortOrder === "asc"
      ? "▲"
      : "▼"
    : ""}
</th>
          <th onClick={() => handleSort("lastName")}>
  Last Name{" "}
  {sortField === "lastName"
    ? sortOrder === "asc"
      ? "▲"
      : "▼"
    : ""}
</th>
          <th onClick={() => handleSort("email")}>
  Email{" "}
  {sortField === "email"
    ? sortOrder === "asc"
      ? "▲"
      : "▼"
    : ""}
</th>
          <th onClick={() => handleSort("department")}>
  Department{" "}
  {sortField === "department"
    ? sortOrder === "asc"
      ? "▲"
      : "▼"
    : ""}
</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {users.length > 0 ? (
          users.map((user) => {
            const nameParts = user.name.split(" ");
            const firstName = nameParts[0];
            const lastName = nameParts.slice(1).join(" ");

            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{user.email}</td>
                <td>{user.department}</td>

                <td>
             <button
    className="edit-btn"
    onClick={() => editUser(user)}
>
     Edit
</button>

                  <button
    className="delete-btn"
    onClick={() => deleteUser(user.id)}
>
     Delete
</button>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan="6" className="no-users">
              No users found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default UserTable;