const pool = require("../config/db");
const { v4: uuidv4 } = require("uuid");

class RestockRepository {
  async create(itemId, quantity) {
    const restockId = uuidv4();

    await pool.query(
      `
      INSERT INTO restocks (restock_id, item_id, quantity)
      VALUES ($1, $2, $3)
      `,
      [restockId, itemId, quantity]
    );

    return restockId;
  }
}

module.exports = new RestockRepository();
