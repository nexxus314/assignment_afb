const { v4: uuidv4 } = require("uuid");
const SubscriptionRepository = require("../repositories/SubscriptionRepository");
const NotificationRepository = require("../repositories/NotificationRepository");
const NotificationFileWriter = require("../utils/NotificationFileWriter");


const EmailChannel = require("./channels/EmailChannel");
const PushChannel = require("./channels/PushChannel");

const channelMap = {
  EMAIL: EmailChannel,
  PUSH: PushChannel,
};

class NotificationEngine {
  async processRestock(itemId, restockId) {
    const subscriptions =
      await SubscriptionRepository.findPendingByItemId(itemId);
for (const sub of subscriptions) {
  const channels = Array.isArray(sub.channels)
    ? sub.channels
    : JSON.parse(sub.channels);

  for (const channel of channels) {
    const alreadySent = await NotificationRepository.exists(
      sub.id,
      restockId,
      channel
    );

    if (alreadySent) continue;

    const notification = {
      id: uuidv4(),
      subscriptionId: sub.id,
      restockId,
      channel,
      userId: sub.user_id,
      itemId: sub.item_id,
    };

    await channelMap[channel].send(notification);
    NotificationFileWriter.write(notification);


    await NotificationRepository.save({
      id: notification.id,
      subscriptionId: sub.id,
      restockId,
      channel,
      status: "SENT",
    });
  }

  await SubscriptionRepository.markAsNotified(sub.id);
}

  }
}

module.exports = new NotificationEngine();
