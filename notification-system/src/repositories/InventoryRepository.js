const pool = require("../config/db");

class InventoryRepository {
  async findByItemId(itemId) {
    const result = await pool.query(
      "SELECT * FROM inventory WHERE item_id = $1",
      [itemId]
    );
    return result.rows[0];
  }

  async upsert(itemId, quantity) {
    await pool.query(
      `
      INSERT INTO inventory (item_id, stock_quantity)
      VALUES ($1, $2)
      ON CONFLICT (item_id)
      DO UPDATE SET stock_quantity = $2
      `,
      [itemId, quantity]
    );
  }
}

module.exports = new InventoryRepository();
