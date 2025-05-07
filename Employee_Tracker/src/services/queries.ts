import { pool } from '../db.js';

export async function getAllDepartments() {
  const res = await pool.query('SELECT name, id FROM department;');
  return res.rows;
}

export async function getAllRoles() {
  const res = await pool.query('SELECT r.title AS employee_title, r.id AS role_id, d.name AS department_name, r.salary AS role_salary FROM role r JOIN department d ON r.department_id = d.id;');
  return res.rows;
}

export async function getAllEmplyees() {
  const res = await pool.query(`SELECT e.id AS employee_id, e.first_name AS employee_first_name, e.last_name AS employee_last_name, r.title AS employee_title, d.name AS department_name, r.salary AS employee_salary, m.first_name || ' ' || m.last_name AS manager_name FROM employee e JOIN role r ON e.role_id = r.id JOIN department d ON r.department_id = d.id LEFT JOIN employee m ON e.manager_id = m.id;`);
  return res.rows;
}

export async function addDepartment(name: string) {
  await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
}

export async function addRole(title: string, salary: number, department_id: number) {
  await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1,$2,$3)', [title, salary, department_id]);
}

export async function addEmployee(first_name: string, last_name: string, role_id: number, manager_id: number) {
  await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1,$2,$3,$4)', [first_name, last_name, role_id, manager_id]);
}

export async function updateRole(id: number, newRole: string) {
  await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [newRole, id]);
}