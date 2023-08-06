-- Seeds information into the department table
INSERT INTO department (department_name)
VALUES  ('Sales'),
        ('Engineering'),
        ('Finance'),
        ('Legal');

-- Seeds information into the role table
INSERT INTO roles (title, salary, department_id)
VALUES  ('Sales Lead', '120000', 1),
        ('Salesperson', '80000', 1),
        ('Engineer Lead', '150000', 2),
        ('Software Engineer', '120000', 2),
        ('Account Manager', '165000', 3),
        ('Accountant', '125000', 3),
        ('Legal Team Lead', '250000', 4),
        ('Lawyer', '190000', 4);

-- Seeds information into the employee table
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ('Ben', 'Chilling', 1, NULL),
        ('Shawn', 'Davis', 2, NULL),
        ('Ryan', 'Reynolds', 3, 1),
        ('Andrew', 'Wilson', 4, 2),
        ('Mac', 'Miller', 5, 2),
        ('Scooby', 'Doo', 6, 2),
        ('Shaggy', 'Too-Dope', 7, 1),
        ('Violent', 'Jay', 8, 1);

        -- Creates the department table
