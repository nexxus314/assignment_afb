const NotificationChannel = require("./NotificationChannel");

class PushChannel extends NotificationChannel {
  async send(notification) {
    console.log(
      `📱 PUSH → User ${notification.userId} | Item ${notification.itemId}`
    );
  }
}

module.exports = new PushChannel();
