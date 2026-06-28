function UserForm({
  showForm,
  isEditing,
  newUser,
  setNewUser,
  addUser,
  updateUser,
  onCancel,
  errors,
}) {
  if (!showForm) {
    return null;
  }

  return (
    <div className="form-container">
      <h2>{isEditing ? "Edit User" : "Add User"}</h2>

      <input
        type="text"
        placeholder="First Name"
        value={newUser.firstName}
        onChange={(e) =>
          setNewUser({
            ...newUser,
            firstName: e.target.value,
            
          })
        }
      />
      {errors.firstName && (
  <p className="error">{errors.firstName}</p>
)}

      <input
        type="text"
        placeholder="Last Name"
        value={newUser.lastName}
        onChange={(e) =>
          setNewUser({
            ...newUser,
            lastName: e.target.value,
          })
        }
      />
      {errors.lastName && (
  <p>{errors.lastName}</p>
)}

      <input
        type="email"
        placeholder="Email"
        value={newUser.email}
        onChange={(e) =>
          setNewUser({
            ...newUser,
            email: e.target.value,
          })
        }
      />
      {errors.email && (
  <p>{errors.email}</p>
)}

      <select
        value={newUser.department}
        onChange={(e) =>
          setNewUser({
            ...newUser,
            department: e.target.value,
          })
        }
      >
        {errors.department && (
  <p>{errors.department}</p>
)}
        <option value="">Select Department</option>
        <option value="IT">IT</option>
          <option value="CSE">CSE</option>
          <option value="AIML">AIML</option>
          <option value="ECE">ECE</option>
          <option value="Cyber Security">Cyber Security</option>
      </select>

      <div className="form-buttons">
        <button onClick={isEditing ? updateUser : addUser}>
          {isEditing ? "Update" : "Save"}
        </button>

        <button onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default UserForm;