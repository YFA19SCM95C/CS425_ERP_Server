const pool = require('../db/db');

async function getPermissions(employeeId) {
  try {
    const itemData = await pool.query(
      `
        SELECT permissionName
        FROM employee_role join role_permission using(roleID) join permission using(permissionID)
        WHERE employeeID = ?
      `,
      [employeeId]);
    return itemData;
  } catch (error) {
    console.log(error);
    throw Error(400, 'INVALID_DATA');
  }
};

async function accessList() {
  try {
    const itemData = await pool.query(
      `
        SELECT *
        FROM employee_role join role_permission using(roleID) join permission using(permissionID)
      `,
      []);
    return itemData;
  } catch (error) {
    console.log(error);
    throw Error(400, 'INVALID_DATA');
  }
};

async function grantAccess({ employeeID, roleID }) {
  try {
    const insertRole = await pool.query(
        `
          INSERT INTO employee_role(employeeID, roleID) value (?, ?)
        `,
        [employeeID, roleID]
      );
    return insertRole;
  } catch (error) {
    console.log(error);
    throw Error(400, 'INVALID_DATA');
  }
};

async function createView({ tableName, columnName, viewName }) {
  try {
    const result = await pool.query(
        `
          CREATE VIEW ?? AS
          SELECT ??
          FROM ??
        `,
        [viewName, columnName, tableName]
      );
    return result;
  } catch (error) {
    console.log(error);
    throw Error(400, 'INVALID_DATA');
  }
};

module.exports = {
  getPermissions,
  accessList,
  grantAccess,
  createView,
};
