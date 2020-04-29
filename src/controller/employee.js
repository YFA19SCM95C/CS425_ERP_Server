const pool = require('../db/db');

async function employeeList(employeeID) {
    try {
      const role = await pool.query(
        `
          SELECT *
          FROM employee_role
          WHERE employeeID = ?
        `,
        [employeeID]
      );
      let list = [];
      if (role[0].roleID == 2) {
        return employeeViewList();
      }
      const itemData = await pool.query(
        `
          SELECT *
          FROM employee join address using(addressID)
        `,
        []);
      return itemData;
    } catch (error) {
      console.log(error);
      throw Error(400, 'INVALID_DATA');
    }

};

async function addEmployee({ city, firstName, lastName, role, salary, ssn, state, streetName, streetNumber, workType, zip, aptNumber }) {
    try {
      const insertAddress = await pool.query(
        `
          INSERT INTO address(streetName, streetNumber, aptNumber, city, state, zip) value (?, ?, ?, ?, ?, ?)
        `,
        [streetName, streetNumber, aptNumber, city, state, zip]
      );
      const insertEmployee = await pool.query(
        `
          INSERT INTO employee(firstName, lastName, ssn, salary, type, addressID) value (?, ?, ?, ?, ?, ?)
        `,
        [firstName, lastName, ssn, salary, workType, insertAddress.insertId]
      );
      /*
      const insertRole = await pool.query(
        `
          INSERT INTO employee_role(employeeID, roleID) value (?, ?)
        `,
        [insertEmployee.insertId, role]
      );
      */
      return insertEmployee;
    } catch (error) {
      console.log(error);
      throw Error(400, 'INVALID_DATA');
    }

};

async function roleList() {
    try {
      const role = await pool.query(
        `
          SELECT *
          FROM role
        `,
        []
      );
      return role;
    } catch (error) {
      console.log(error);
      throw Error(400, 'INVALID_DATA');
    }

};

async function employeeViewList() {
  try {
      const list = await pool.query(
        `
          SELECT *
          FROM engineer_employee_view
        `,
        []);
      return list;
  } catch (eror) {
      throw Error(400, 'INVALID_DATA');
  }
}

async function employeeAccount() {
    try {
      const itemData = await pool.query(
        `
          SELECT *
          FROM employee_login
        `,
        []);
      return itemData;
    } catch (error) {
      console.log(error);
      throw Error(400, 'INVALID_DATA');
    }

};

module.exports = {
  employeeList,
  employeeAccount,
  roleList,
  addEmployee,
};
