import { useState, useEffect } from "react";
import "../styles/Dashboard.css";

import SearchBar from "../components/SearchBar";
import UserForm from "../components/UserForm";
import UserTable from "../components/UserTable";
import Pagination from "../components/Pagination";
import FilterPopup from "../components/FilterPopup";

import {
  getUsers,
  addUser as addUserService,
  updateUser as updateUserService,
  deleteUser as deleteUserService,
} from "../services/userService";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);

  const [showFilter, setShowFilter] = useState(false);

  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });
  const [sortField, setSortField] = useState("");
const [sortOrder, setSortOrder] = useState("asc");
const [errors, setErrors] = useState({});
  async function fetchUsers() {
    try {
      setLoading(true);

      const data = await getUsers();

console.log(data);

setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  function validateForm() {
  const newErrors = {};

  if (!newUser.firstName.trim()) {
    newErrors.firstName = "First Name is required";
  }

  if (!newUser.lastName.trim()) {
    newErrors.lastName = "Last Name is required";
  }

  if (!newUser.email.trim()) {
    newErrors.email = "Email is required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(newUser.email)
  ) {
    newErrors.email = "Invalid email address";
  }

  if (!newUser.department) {
    newErrors.department = "Select a department";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
}

  async function handleAddUser() {
   if (!validateForm()) {
  return;
}

    const userData = {
      name: `${newUser.firstName} ${newUser.lastName}`,
      email: newUser.email,
      department: newUser.department,
    };

    try {
      const data = await addUserService(userData);

      data.id = users.length + 1;

      setUsers([...users, data]);

      setShowForm(false);
      setIsEditing(false);
      setEditUserId(null);

      setNewUser({
        firstName: "",
        lastName: "",
        email: "",
        department: "",
      });
    } catch {
      alert("Failed to add user.");
    }
  }

  function editUser(user) {
    const nameParts = user.name.split(" ");

    setNewUser({
      firstName: nameParts[0],
      lastName: nameParts.slice(1).join(" "),
      email: user.email,
      department: user.department,
    });

    setEditUserId(user.id);
    setIsEditing(true);
    setShowForm(true);
  }

  async function handleUpdateUser() {
   if (!validateForm()) {
  return;
}

    const updatedUser = {
      id: editUserId,
      name: `${newUser.firstName} ${newUser.lastName}`,
      email: newUser.email,
      department: newUser.department,
    };

    try {
      await updateUserService(editUserId, updatedUser);

      const updatedUsers = users.map((user) =>
        user.id === editUserId ? updatedUser : user
      );

      setUsers(updatedUsers);

      setShowForm(false);
      setIsEditing(false);
      setEditUserId(null);

      setNewUser({
        firstName: "",
        lastName: "",
        email: "",
        department: "",
      });
    } catch {
      alert("Failed to update user.");
    }
  }

  async function handleDeleteUser(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await deleteUserService(id);

      setUsers(users.filter((user) => user.id !== id));

      alert("User deleted successfully.");
    } catch {
      alert("Failed to delete user.");
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
  const nameParts = user.name.split(" ");

  const firstName = nameParts[0].toLowerCase();
  const lastName = nameParts.slice(1).join(" ").toLowerCase();
  const email = user.email.toLowerCase();
  const department = user.department.toLowerCase();

  const search = searchTerm.toLowerCase();

  return (
    (search === "" ||
      firstName.includes(search) ||
      lastName.includes(search) ||
      email.includes(search) ||
      department.includes(search)) &&

    (filters.firstName === "" ||
      firstName.includes(filters.firstName.toLowerCase())) &&

    (filters.lastName === "" ||
      lastName.includes(filters.lastName.toLowerCase())) &&

    (filters.email === "" ||
      email.includes(filters.email.toLowerCase())) &&

    (filters.department === "" ||
      department === filters.department.toLowerCase())
  );
});
const sortedUsers = [...filteredUsers].sort((a, b) => {
  if (!sortField) return 0;

  let valueA;
  let valueB;

  switch (sortField) {
    case "firstName":
      valueA = a.name.split(" ")[0].toLowerCase();
      valueB = b.name.split(" ")[0].toLowerCase();
      break;

    case "lastName":
      valueA = a.name.split(" ").slice(1).join(" ").toLowerCase();
      valueB = b.name.split(" ").slice(1).join(" ").toLowerCase();
      break;

    case "email":
      valueA = a.email.toLowerCase();
      valueB = b.email.toLowerCase();
      break;

    case "department":
      valueA = a.department.toLowerCase();
      valueB = b.department.toLowerCase();
      break;

    default:
      return 0;
  }

  return sortOrder === "asc"
    ? valueA.localeCompare(valueB)
    : valueB.localeCompare(valueA);
});

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

 const currentUsers = sortedUsers.slice(
  indexOfFirstUser,
  indexOfLastUser
);

 const totalPages = Math.ceil(
  sortedUsers.length / usersPerPage
);
  function previousPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function nextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

 function applyFilters() {
  setShowFilter(false);
  setCurrentPage(1);
}

  function resetFilters() {
  setFilters({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  setCurrentPage(1);
}

  function closeFilter() {
    setShowFilter(false);
  }
  function handleSort(field) {
  if (sortField === field) {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  } else {
    setSortField(field);
    setSortOrder("asc");
  }
}

  

 return (
  <div className="container">
    <h1>User Management Dashboard</h1>

    <SearchBar
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
  onAddUser={() => {
    setShowForm(true);
    setIsEditing(false);

    setNewUser({
      firstName: "",
      lastName: "",
      email: "",
      department: "",
    });
  }}
  onFilter={() => setShowFilter(true)}
/>

    <UserForm
      showForm={showForm}
      isEditing={isEditing}
      newUser={newUser}
      setNewUser={setNewUser}
      addUser={handleAddUser}
      updateUser={handleUpdateUser}
      onCancel={() => {
        setShowForm(false);
        setIsEditing(false);
        setEditUserId(null);

        setNewUser({
          firstName: "",
          lastName: "",
          email: "",
          department: "",
        });
      }}
      errors={errors}
    />

    <FilterPopup
      showFilter={showFilter}
      filters={filters}
      setFilters={setFilters}
      applyFilters={applyFilters}
      resetFilters={resetFilters}
      closeFilter={closeFilter}
    />

   <UserTable
  users={currentUsers}
  loading={loading}
  error={error}
  editUser={editUser}
  deleteUser={handleDeleteUser}
  handleSort={handleSort}
  sortField={sortField}
  sortOrder={sortOrder}
/>

    <Pagination
      usersPerPage={usersPerPage}
      setUsersPerPage={(value) => {
        setUsersPerPage(value);
        setCurrentPage(1);
      }}
      currentPage={currentPage}
      totalPages={totalPages}
      previousPage={previousPage}
      nextPage={nextPage}
    />
  </div>
);
}

export default Dashboard;