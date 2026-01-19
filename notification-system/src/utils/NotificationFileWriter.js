const fs = require("fs");
const path = require("path");

class NotificationFileWriter {
  constructor() {
    // ✅ Always project root
    this.filePath = path.resolve(__dirname, "../../notifications.json");
  }

  write(notification) {
    let data = [];

    if (fs.existsSync(this.filePath)) {
      const content = fs.readFileSync(this.filePath, "utf-8");
      if (content) data = JSON.parse(content);
    }

    data.push({
      userId: notification.userId,
      itemId: notification.itemId,
      channel: notification.channel,
      restockId: notification.restockId,
      timestamp: new Date().toISOString(),
    });

    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
  }
}

module.exports = new NotificationFileWriter();
