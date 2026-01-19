const { v4: uuidv4 } = require("uuid");
const SubscriptionRepository = require("../repositories/SubscriptionRepository");
const InventoryRepository = require("../repositories/InventoryRepository");

class SubscriptionService {
  async createSubscription({ userId, itemId, channels }) {
    const inventory = await InventoryRepository.findByItemId(itemId);

    // 🚫 Prevent subscribing if item already in stock
    if (inventory && inventory.stock_quantity > 0) {
      throw new Error("Item already in stock");
    }

    await SubscriptionRepository.save({
      id: uuidv4(),
      userId,
      itemId,
      channels,
      status: "PENDING",
    });
  }
}

module.exports = new SubscriptionService();
