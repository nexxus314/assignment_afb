const NotificationChannel = require("./NotificationChannel");

class EmailChannel extends NotificationChannel {
  async send(notification) {
    console.log(
      `📧 EMAIL → User ${notification.userId} | Item ${notification.itemId}`
    );
  }
}

module.exports = new EmailChannel();
