const InventoryRepository = require("../repositories/InventoryRepository");
const RestockRepository = require("../repositories/RestockRepository");
const NotificationEngine = require("./NotificationEngine");

class InventoryService {
  async restockItem(itemId, newQuantity) {
    const existing = await InventoryRepository.findByItemId(itemId);
    const previousQuantity = existing ? existing.stock_quantity : 0;

    await InventoryRepository.upsert(itemId, newQuantity);

    if (previousQuantity === 0 && newQuantity > 0) {
      const restockId = await RestockRepository.create(itemId, newQuantity);
      console.log("🔔 Restock event created:", restockId);

      await NotificationEngine.processRestock(itemId, restockId);
    }
  }
}

module.exports = new InventoryService();
