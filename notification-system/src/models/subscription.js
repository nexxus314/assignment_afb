class Subscription {
  constructor({ id, userId, itemId, channels, status }) {
    this.id = id;
    this.userId = userId;
    this.itemId = itemId;
    this.channels = channels;
    this.status = status || "PENDING";
  }
}

module.exports = Subscription;
