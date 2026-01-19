const express = require("express");
const router = express.Router();
const SubscriptionController = require("../controllers/SubscriptionController");
const InventoryController = require("../controllers/InventoryController");

router.post("/inventory/restock", (req, res) =>
  InventoryController.restock(req, res)
);


router.post("/subscribe", (req, res) =>
  SubscriptionController.subscribe(req, res)
);

module.exports = router;
