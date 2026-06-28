# User Management Dashboard

## About the Project

This project is a User Management Dashboard built using React and Vite. It allows users to manage employee information through a simple and responsive interface. Users can view employee records, add new employees, edit existing details, delete records, search for employees, filter data, sort columns, and navigate through records using pagination.

The project uses the JSONPlaceholder API to simulate backend operations. Since the API provides sample data, employee names, emails, and departments are customized within the application to create a more realistic employee management system.

---

## Features

* View employee details
* Add a new employee
* Edit employee information
* Delete employee records
* Search employees by name, email, or department
* Filter employees using multiple fields
* Sort employee data
* Pagination with different page sizes
* Form validation
* Responsive design

---

## Technologies Used

* React
* Vite
* JavaScript
* CSS
* Fetch API
* JSONPlaceholder API

---

## Project Structure

```
src
│
├── components
│   ├── SearchBar.jsx
│   ├── UserForm.jsx
│   ├── UserTable.jsx
│   ├── FilterPopup.jsx
│   └── Pagination.jsx
│
├── pages
│   └── Dashboard.jsx
│
├── services
│   └── userService.js
│
├── styles
│   ├── dashboard.css
│   ├── search.css
│   ├── table.css
│   ├── form.css
│   ├── filter.css
│   ├── pagination.css
│   └── responsive.css
│
├── App.jsx
└── main.jsx
```

---

## How to Run the Project

Clone the repository

```bash
git clone <repository-url>
```

Move into the project folder

```bash
cd user-management-dashboard
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm run dev
```

The application will run on:

```
http://localhost:5173
```

---

## Challenges Faced

One of the main challenges was organizing the project into reusable components while keeping the code clean and easy to manage. Implementing search, sorting, filtering, and pagination together also required careful state management because every feature needed to work correctly with the others.

Another challenge was working with the JSONPlaceholder API. Since it is a mock API, any changes made through add, edit, or delete operations are not permanently saved. To provide a better user experience, the application updates the data locally after each operation.

Designing a responsive interface and keeping the layout consistent across different screen sizes also required several adjustments.

---

## Improvements

If I had more time, I would like to add:

* User authentication
* Dark mode
* Profile pictures for employees
* Backend integration with a real database


---

## Author

Ashraf Mohammed
