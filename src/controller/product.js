const pool = require('../db/db');

async function productList({ modelID = '', modelNumber = '' }) {
    try {
      let where = 'WHERE 1';
      const deps = [];
      if (modelID) {
        where += ' and modelID = ?';
        deps.push(modelID);
      }
      if (modelNumber) {
        where += ' and modelNumber = ?';
        deps.push(modelNumber);
      }
      const itemData = await pool.query(
        `
          SELECT *
          FROM model
          ${where}
        `,
        deps);
      return itemData;
    } catch (error) {
      console.log(error);
      throw Error(400, 'INVALID_DATA');
    }

};

async function inventoryList() {
    try {
      const itemData = await pool.query(
        `
          SELECT *
          FROM Inventory
        `,
        []);
      return itemData;
    } catch (error) {
      console.log(error);
      throw Error(400, 'INVALID_DATA');
    }

};

async function addModel({modelNumber, salePrice, cost}) {
    try {
      const itemData = await pool.query(
        `
          INSERT INTO model(modelNumber, salePrice, cost) value (?, ?, ?);
        `,
        [modelNumber, salePrice, cost]);
      return itemData;
    } catch (error) {
      console.log(error);
      throw Error(400, 'INVALID_DATA');
    }
}

async function addInventory({modelID, categoryType, inventoryName, leadTime, number}) {
    try {
      const insertInventory = await pool.query(
        `
          INSERT INTO inventory(inventoryName, leadTime, categoryType, number) value (?, ?, ?, ?);
        `,
        [inventoryName, leadTime, categoryType, number]);
      const { insertId } = insertInventory;
      const result = await pool.query(
        `
          INSERT INTO model_inventory(modelID, inventoryID) value (?, ?);
        `,
        [modelID, insertId]
      );
      return result;
    } catch (error) {
      console.log(error);
      throw Error(400, 'INVALID_DATA');
    }
}

module.exports = {
  productList,
  inventoryList,
  addModel,
  addInventory,
};
