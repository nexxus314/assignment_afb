const SubscriptionService = require("../services/SubscriptionService");

class SubscriptionController {
  async subscribe(req, res) {
    try {
      const { userId, itemId, channels } = req.body;

      if (!userId || !itemId || !channels) {
        return res.status(400).json({ error: "Missing fields" });
      }

      const subscription = await SubscriptionService.createSubscription({
        userId,
        itemId,
        channels,
      });

      res.status(201).json({
        message: "Subscribed successfully",
        subscriptionId: subscription.id,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = new SubscriptionController();
