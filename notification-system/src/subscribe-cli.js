const readline = require("readline");
const SubscriptionService = require("./services/SubscriptionService");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("User ID: ", (userId) => {
  rl.question("Item ID: ", async (itemId) => {
    try {
      await SubscriptionService.createSubscription({
        userId: Number(userId),
        itemId: Number(itemId),
        channels: ["EMAIL", "PUSH"],
      });
      console.log("✅ Subscribed successfully");
    } catch (e) {
      console.error("❌", e.message);
    }
    rl.close();
  });
});
