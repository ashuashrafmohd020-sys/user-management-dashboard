const BASE_URL = "https://jsonplaceholder.typicode.com/users";

export async function getUsers() {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const data = await response.json();

  const employeeData = [
    {
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@company.com",
      department: "IT",
    },
     {
      firstName: "Ashraf",
      lastName: "Ahmed",
      email: "ashraf.ahmed@company.com",
      department: "Cyber Security",
    },
    {
      firstName: "Emily",
      lastName: "Johnson",
      email: "emily.johnson@company.com",
      department: "CSE",
    },
      {
      firstName: "Rahul",
      lastName: "Sharma",
      email: "rahul.sharma@company.com",
      department: "CSE",
    },
    {
      firstName: "Michael",
      lastName: "Brown",
      email: "michael.brown@company.com",
      department: "ECE",
    },
    {
      firstName: "Sarah",
      lastName: "Wilson",
      email: "sarah.wilson@company.com",
      department: "IT",
    },
    {
      firstName: "Neha",
      lastName: "Patel",
      email: "neha.patel@company.com",
      department: "CSE",
    },
    {
      firstName: "Sophia",
      lastName: "Taylor",
      email: "sophia.taylor@company.com",
      department: "ECE",
    },
    {
      firstName: "Emma",
      lastName: "White",
      email: "emma.white@company.com",
      department: "AIML",
    },
     {
      firstName: "Aisha",
      lastName: "Khan",
      email: "aisha.khan@company.com",
      department: "IT",
    },
    {
      firstName: "James",
      lastName: "Anderson",
      email: "james.anderson@company.com",
      department: "CSE",
    },
    {
      firstName: "Olivia",
      lastName: "Thomas",
      email: "olivia.thomas@company.com",
      department: "IT",
    },
  
    
    {
      firstName: "Daniel",
      lastName: "Jackson",
      email: "daniel.jackson@company.com",
      department: "CIVIL",
    },
   
  
    
  ];

  const users = [];

  employeeData.forEach((employee, index) => {
    if (index < data.length) {
      users.push({
        ...data[index],
        name: `${employee.firstName} ${employee.lastName}`,
        email: employee.email,
        department: employee.department,
      });
    } else {
      users.push({
        id: index + 1,
        name: `${employee.firstName} ${employee.lastName}`,
        email: employee.email,
        department: employee.department,
      });
    }
  });

  return users;
}

export async function addUser(user) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Failed to add user");
  }

  return await response.json();
}

export async function updateUser(id, user) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Failed to update user");
  }

  return await response.json();
}

export async function deleteUser(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete user");
  }

  return true;
}