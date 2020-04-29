const pool = require('../db/db');

async function orderList() {
    try {
      const itemData = await pool.query(
        `
          SELECT *
          FROM orders
        `,
        []);
      return itemData;
    } catch (error) {
      console.log(error);
      throw Error(400, 'INVALID_DATA');
    }

};

async function createOrder({saleValue, date, customerID, employeeID, addressID}) {
    try {
      const itemData = await pool.query(
        `
          INSERT INTO orders(saleValue, date, customerID, employeeID, addressID)
          VALUE (?, ?, ?, ?, ?)
        `,
        [saleValue, date, customerID, employeeID, addressID]);
      return itemData;
    } catch (error) {
      console.log(error);
      throw Error(400, 'INVALID_DATA');
    }

};

module.exports = {
  orderList,
  createOrder,
};
