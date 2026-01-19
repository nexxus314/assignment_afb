const pool = require("../config/db");

class SubscriptionRepository {
  async save(subscription) {
    const query = `
      INSERT INTO subscriptions (id, user_id, item_id, channels, status)
      VALUES ($1, $2, $3, $4, $5)
    `;

    await pool.query(query, [
      subscription.id,
      subscription.userId,
      subscription.itemId,
      JSON.stringify(subscription.channels),
      subscription.status,
    ]);
  }

  async findPendingByItemId(itemId) {
    const query = `
      SELECT * FROM subscriptions
      WHERE item_id = $1 AND status = 'PENDING'
    `;

    const result = await pool.query(query, [itemId]);
    return result.rows;
  }

  async markAsNotified(subscriptionId) {
    const query = `
      UPDATE subscriptions
      SET status = 'NOTIFIED'
      WHERE id = $1
    `;

    await pool.query(query, [subscriptionId]);
  }
}

module.exports = new SubscriptionRepository();
