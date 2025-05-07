import inquirer from 'inquirer';
import { pool } from './db.js';
import { getAllDepartments, getAllRoles, getAllEmplyees, addDepartment, addRole, addEmployee, updateRole } from './services/queries.js';

async function main() {
  console.log('\n📘 Welcome to the Entry Manager\n');

  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        { name: 'view all departments', value: 'viewDepartment' },
        { name: ' view all roles', value: 'viewRole' },
        { name: 'view all employees', value: 'viewEmployees' },
        { name: ' add a department', value: 'addDepartment' },
        { name: ' add a role', value: 'addRole' },
        { name: ' add an employee', value: 'addEmployee' },
        { name: 'update an employee role', value: 'updateRole' },
        { name: 'Exit', value: 'exit' },
      ],
    },
  ]);

  switch (action) {
    case 'viewDepartment':
      const departments = await getAllDepartments();
      console.table(departments);
      break;

    case 'viewRole':
      const roles = await getAllRoles();
      console.table(roles);
      break;

    case 'viewEmployees':
      const employees = await getAllEmplyees();
      console.table(employees);
      break;

    case 'addDepartment':
      const { name } = await inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Enter new department:',
        },
      ]);
      await addDepartment(name);
      console.log('New department added!');
      break;

    case 'addRole':
      const { title } = await inquirer.prompt([
        {
          type: 'input',
          name: 'title',
          message: `Enter new role's title:`,
        },
      ]
      );
      const { salary } = await inquirer.prompt([
        {
          type: 'input',
          name: 'salary',
          message: `Enter new role's salary:`,
        },
      ]
      );

      const deptList = await getAllDepartments();

      const departmentChoices = deptList.map(dept => ({
        name: dept.name,
        value: dept.id,
      }));

      const { department_id } = await inquirer.prompt([
        {
          type: 'list',
          name: 'department_id',
          message: `Choose new role's department:`,
          choices: departmentChoices,
        },
      ]
      );

      await addRole(title, salary, department_id);
      console.log('New role added!');
      break;

    case 'addEmployee':
      const { first_name } = await inquirer.prompt([
        {
          type: 'input',
          name: 'first_name',
          message: `Enter new employee's first name:`,
        },
      ]
      );
      const { last_name } = await inquirer.prompt([
        {
          type: 'input',
          name: 'last_name',
          message: `Enter new employee's last name:`,
        },
      ]
      );

      const addEmpRoleList = await getAllRoles();

      const addEmpRoleChoices = addEmpRoleList.map(role => ({
        name: role.employee_title,
        value: role.role_id,
      }));

      const { role_id } = await inquirer.prompt([
        {
          type: 'list',
          name: 'role_id',
          message: `Choose new employee's role:`,
          choices: addEmpRoleChoices,
        },
      ]
      );

      async function getManagersByDepartment(role_id: number) {
        const res = await pool.query(
          `SELECT e.id, e.first_name, e.last_name
           FROM employee e
           JOIN role r ON e.role_id = r.id
           JOIN department d ON r.department_id = d.id
           WHERE r.title LIKE '%Manager%'
           AND d.id = (SELECT department_id FROM role WHERE id = $1)`,
          [role_id]
        );
        return res.rows;
      };
      
      const managerList = await getManagersByDepartment(role_id);

      const managerChoices = managerList.map(employee => ({
        name: (`${employee.first_name} ${employee.last_name}`),
        value: employee.id,
      }));

      const { manager_id } = await inquirer.prompt([
        {
          type: 'list',
          name: 'manager_id',
          message: `Choose new employee's manager:`,
          choices: managerChoices,
        },
      ]
      );

      await addEmployee(first_name, last_name, role_id, manager_id);
      console.log('New role added!');
      break;

      case 'updateRole':
        const empList = await getAllEmplyees();
        const employeeChoices = empList.map(emp => ({
          name: `${emp.employee_first_name} ${emp.employee_last_name}`,
          value: emp.employee_id,
        }));
      
        const updateRoleList = await getAllRoles();
        const updateRoleChoices = updateRoleList.map(role => ({
          name: role.employee_title,
          value: role.role_id,
        }));
      
        const { id, newRole } = await inquirer.prompt([
          {
            type: 'list',
            name: 'id',
            message: 'Select the employee whose role you want to update:',
            choices: employeeChoices,
          },
          {
            type: 'list',
            name: 'newRole',
            message: `Select the new role for the employee:`,
            choices: updateRoleChoices,
          },
        ]);
      
        await updateRole(id, newRole);
        console.log('Employee role updated!');
        break;

    case 'exit':
      console.log('Closing Application');
      process.exit(0);
  }

  // Loop back to main menu
  await main();
}

main();