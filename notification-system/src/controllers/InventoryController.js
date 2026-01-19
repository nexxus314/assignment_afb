const InventoryService = require("../services/InventoryService");

class InventoryController {
  async restock(req, res) {
    try {
      const { itemId, quantity } = req.body;

      if (!itemId || quantity === undefined) {
        return res.status(400).json({ error: "Missing fields" });
      }

      await InventoryService.restockItem(itemId, quantity);

      res.json({ message: "Inventory updated" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = new InventoryController();
