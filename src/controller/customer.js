const pool = require('../db/db');

async function customerList(firstName = '', lastName = '') {
    try {
      const itemData = await pool.query(
        `
          SELECT *
          FROM customers
        `,
        []);
      return itemData;
    } catch (error) {
      console.log(error);
      throw Error(400, 'INVALID_DATA');
    }

};

async function addCustomer({firstName, lastName, phoneNumber, employeeID}) {
  console.log(firstName, lastName, phoneNumber, employeeID);
    try {
      const itemData = await pool.query(
        `
          INSERT INTO customers(fistName, lastName, phoneNumber, employeeID) value (?, ?, ?, ?)
        `,
        [firstName, lastName, phoneNumber, Number(employeeID)]);
      return itemData;
    } catch (error) {
      console.log(error);
      throw Error(400, 'INVALID_DATA');
    }

};

module.exports = {
  customerList,
  addCustomer,
};
