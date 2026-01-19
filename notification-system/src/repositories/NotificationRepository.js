const pool = require("../config/db");

class NotificationRepository {
  async exists(subscriptionId, restockId, channel) {
    const result = await pool.query(
      `
      SELECT 1 FROM notifications
      WHERE subscription_id = $1
        AND restock_id = $2
        AND channel = $3
      `,
      [subscriptionId, restockId, channel]
    );

    return result.rowCount > 0;
  }

  async save({ id, subscriptionId, restockId, channel, status }) {
    await pool.query(
      `
      INSERT INTO notifications (id, subscription_id, restock_id, channel, status)
      VALUES ($1, $2, $3, $4, $5)
      `,
      [id, subscriptionId, restockId, channel, status]
    );
  }
}

module.exports = new NotificationRepository();
