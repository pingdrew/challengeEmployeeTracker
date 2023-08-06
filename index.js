const inquirer = require('inquirer');
const connect = require('./db/connection')
// require inquirer for questions and the connection.js for connecting db's

function displayMenu() {
  // first ask what the user wants to do with our data
  inquirer.prompt([
    {
      name: 'homescreen',
      type: 'list',
      message: 'What would you like to do?',
      choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View all Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'],
    },
  ])
    .then((response) => {
      var userChoice = response.homescreen;
      // depending on the users choice of action, the following function is called.
      if (userChoice == "View All Employees") {
        ViewAllEmployees();

      } else if (userChoice == "Add Employee") {
        AddEmployee();

      } else if (userChoice == "Update Employee Role") {
        UpdateEmployeeRole();
        
      } else if (userChoice == "View all Roles") {
        ViewAllRoles();

      } else if (userChoice == "Add Role") {
        AddRole();

      } else if (userChoice == "View All Departments") {
        ViewAllDepartments();

      } else if (userChoice == "Add Department") {
        AddDepartment();

      } else if (userChoice == "Quit") {
        // if they quit, then just stop the program.
        console.log("You chose the quit route");
        return;
      }
    });
};

function ViewAllEmployees() {
  console.log("You chose the view employee option");
  const viewAllEmployeesQuery = `SELECT employees.id AS id, employees.first_name AS first_name, employees.last_name AS last_name, roles.title AS title, department.department_name AS department, roles.salary AS salary, CONCAT(managers.first_name, " ", managers.last_name) AS manager
  FROM employees
  JOIN roles ON employees.role_id = roles.id
  JOIN department ON roles.department_id = department.id
  LEFT JOIN employees AS managers ON employees.manager_id = managers.id;`;
  // queries the db using the sql above to view all the employees with their respective salaries, departments, jobs, and even managers.
  connect.query(viewAllEmployeesQuery, function (err, results) {
    if (err) throw err;
    // logs the results in table format so its nice to read
    console.table(results);
    displayMenu();
  });
};

function AddEmployee() {
  console.log("You chose the add employee route");
  // queries the db to select all the roles so we can manipulate them
  connect.query('Select * from roles', (err, data) => {
    // goes into the data and looks for the role.id of every roll, and shows the name
    const roleList = data.map((role) => ({
      name: `${role.title}`,
      value: role.id
    }));
    // then prompts you to get the information about the new employee to plug in the table
    inquirer.prompt([
      {
        type: "input",
        name: "firstName",
        message: "Please enter employee first name!"
      },
      {
        type: "input",
        name: "lastName",
        message: "Please enter employee last name!"
      },
      {
        type: "list",
        name: "roleID",
        message: "Please select employee role!",
        choices: roleList
      },
      {
        type: "list",
        name: "manager",
        message: "Please select employee's manager!",
        choices: ['Ben Chilling', 'Shawn Davis']
      },
    ])
      .then((response) => {
        // get variables of every value of the user input
        const firstName = response.firstName;
        const lastName = response.lastName;
        const role = response.roleID;
        const manager = response.manager;
        // runs simple if else statement to see which manager it is
        if (manager == "Ben Chilling") {
          mgNum = 1;
        } else if (manager == "Shawn Davis") {
          mgNum = 2;
        };
        const addEmployee = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
        // creates a general query to insert an employee into the employees table, and fills the ? variables with an array of the user choices
        connect.query(addEmployee, [firstName, lastName, role, mgNum], function (err, results) {
          if (err) throw err;
          console.log("Employee added successfully!");
          displayMenu();
        })
      });
  });
};

function UpdateEmployeeRole() {
  console.log("You chose the update employee route");
  // queries the db to select all the employees so we can manipulate them
  connect.query('Select * from employees', (err, data) => {
    const eeList = data.map((emp) => ({
      // gets the first and last name of every employee using a data.map and finds them with their id
      name: `${emp.first_name} ${emp.last_name}`,
      value: emp.id
    }));
    // queries the db to select all the roles so we can manipulate them
    connect.query('Select * from roles', (err, data) => {
      const roleList = data.map((role) => ({
        // gets the title of every roll
        name: `${role.title}`,
        value: role.id
      }));
      inquirer.prompt([
        // asks to choose an employee from the list that is dynamically created and a role from the list that is dynamically created
        {
          type: "list",
          name: "eeName",
          message: "Please select which employee you would like to update",
          choices: eeList
        },
        {
          type: "list",
          name: "eeRole",
          message: "Please select the employee's new role",
          choices: roleList
        },
      ])
        .then((response) => {
          eeID = response.eeName;
          eeRole = response.eeRole;
          // creates variables from user input, and creates a query
          const updateEmployee = `UPDATE employees
          SET role_id = ?
          WHERE id= ?`;
          // runs the query created with the user input inputted
          connect.query(updateEmployee, [eeRole, eeID], function (err, results) {
            if (err) throw err;
            console.log("Employee role updated successfully!");
            displayMenu();
          });
        });
    });
  });
};

function ViewAllRoles() {
  console.log("You chose the view all roles route");
  const viewAllRolesQuery = `SELECT roles.id AS id, roles.title AS title, department.department_name AS department, roles.salary AS salary
  FROM department
  JOIN roles ON department.id = roles.department_id;`;
  // creates a query that views every role, with the respective department, and salary
  connect.query(viewAllRolesQuery, function (err, results) {
    if (err) throw err;
    console.table(results);
    displayMenu();
  });
};

function AddRole() {
  console.log("You chose the add role route");
  connect.query('Select * from department', (err, data) => {
    //saves all departments as an array in a variable to have dynamic departments
    const deptList = data.map((dept) => ({
      name: `${dept.department_name}`,
      value: dept.id
    }));
    inquirer.prompt([
      {
        type: "input",
        name: "newRole",
        message: "Please enter the new role"
      },
      {
        type: "number",
        name: "salary",
        message: "Please enter the new role's salary"
      },
      {
        type: "list",
        name: "deptID",
        message: "Please select the new role's department",
        choices: deptList
      },
    ])
      .then((response) => {
        const newRole = response.newRole;
        const salary = response.salary;
        const dept = response.deptID;
        const addRole = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
        // gets the answers as variables, and creates the query as a variable, then plugs everything in to query the db
        connect.query(addRole, [newRole, salary, dept], function (err, results) {
          if (err) throw err;
          console.log("Role added successfully!");
          displayMenu();
        });
      });
  });
};

function ViewAllDepartments() {
  console.log("You chose the view all department routes");
  const viewAllDepts = `SELECT * FROM department`;
  // gets a query to view all departments, and simply queries the db
  connect.query(viewAllDepts, function (err, results) {
    if (err) throw err;
    console.table(results);
    displayMenu();
  });
};

function AddDepartment() {
  console.log("What is the name of the department?");
  inquirer.prompt([
    {
      type: "input",
      name: "deptName",
      message: "Please enter the new department"
    },
  ])
    .then((response) => {
      const deptName = response.deptName;
      const addDept = `INSERT INTO department (department_name) VALUES (?)`;
      // gets the user input for the new department they create and inserts it into the database using the plugged in variables
      connect.query(addDept, [deptName], function (err, results) {
        if (err) throw err;
        console.log("New department added successfully!");
        displayMenu();
      });
    });
};

displayMenu();
