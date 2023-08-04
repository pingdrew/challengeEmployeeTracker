const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');
const db = mysql.createConnection(
  // Connect to database
  {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'tracker_db'
  },
);

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

var createdMovie = 'createdmovie'
// Hardcoded query: ADD TO course_names WHERE id = 3;
db.query(`INSERT INTO movies (movie_name) VALUES (?)`, createdMovie, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});

var movieId = 3
var createdReview = [movieId, 'createdreview']
// Hardcoded query: ADD TO course_names WHERE id = 3;
db.query(`INSERT INTO reviews (movie_id, review) VALUES (?, ?)`, createdReview, (err, result) => {
  if (err) { 
    console.log(err);
  }
  console.log(result);
});

// Query database
db.query(`SELECT employee.first_name AS first_name, employee.last_name AS last_name, role.title AS title, role.salary AS salary, department.name AS department
FROM role
JOIN department ON role.department = department.id
JOIN employee ON role.id = employee.id;`
,function (err, results) {
  console.log(results);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// GIVEN a command-line application that accepts user input

// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids

// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role

// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database

// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
