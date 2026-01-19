Here’s a **clean, professional README** you can directly put into your repo.
It’s written exactly at **internship / mentor-review level** — not overhyped, not under-explained.

You can copy–paste this as `README.md`.

---

# 📦 Inventory Notification System

A backend system that allows users to subscribe to **out-of-stock inventory items** and receive **notifications when the item becomes available again**, with **guaranteed no duplicate notifications**, even if the server crashes midway.

---

## 🚀 Features

* Subscribe to out-of-stock items
* Notify users when stock becomes available again
* Support for multiple notification channels (Email, Push)
* Idempotent notification delivery (no duplicates)
* Crash-safe and restart-safe design
* Persistent storage using PostgreSQL
* Audit logging to `notifications.json`
* Clean layered architecture (Controller → Service → Repository)

---

## 🧠 High-Level Design

The system is **event-driven**.

1. Users subscribe to out-of-stock items
2. Subscriptions are stored as `PENDING`
3. Inventory updates are monitored
4. When stock transitions from `0 → >0`:

   * A restock event is created
   * Pending subscriptions are fetched
   * Notifications are sent per channel
   * Delivery state is persisted
5. Subscriptions are marked `NOTIFIED` to prevent duplicates

All state is stored in PostgreSQL, making the system safe against crashes and restarts.

---

## 🏗️ Project Structure

```
notification-system/
├── src/
│   ├── controllers/
│   ├── services/
│   │   └── channels/
│   ├── repositories/
│   ├── utils/
│   ├── config/
│   └── server.js
│
├── db/
│   └── schema.sql
│
├── notifications.json
├── .env
├── package.json
└── README.md
```

---

## 🧩 Architecture Overview

### Controllers

* Handle HTTP requests and responses
* Do not contain business logic

### Services

* Contain all business rules
* Coordinate repositories and notification flow

### Repositories

* Responsible only for database access
* No business logic

### Notification Engine

* Core component that processes restock events
* Ensures idempotency and crash safety

### Notification Channels

* Polymorphic channel handlers (`EMAIL`, `PUSH`)
* Easy to extend with new channels (SMS, WhatsApp)

---

## 🗄️ Database Schema

All database schemas are provided in:

```
db/schema.sql
```

### Main Tables

* `inventory` – current stock state
* `subscriptions` – user subscriptions
* `restocks` – immutable restock events
* `notifications` – delivered notifications (idempotency)

---

## ⚙️ Setup Instructions

### 1️⃣ Install Dependencies

```bash
npm install
```

---

### 2️⃣ Setup PostgreSQL

Create a database:

```sql
CREATE DATABASE notification_db;
```

Run schema:

```bash
psql notification_db < db/schema.sql
```

---

### 3️⃣ Environment Variables

Create `.env` in project root:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=notification_db
DB_USER=your_username
DB_PASSWORD=
```

---

### 4️⃣ Start the Server

```bash
node src/server.js
```

Server runs on:

```
http://localhost:3000
```

---

## 🔌 API Endpoints

### Subscribe to an Item

```http
POST /api/subscribe
```

```json
{
  "userId": 1,
  "itemId": 101,
  "channels": ["EMAIL", "PUSH"]
}
```

---

### Update Inventory / Restock Item

```http
POST /api/inventory/restock
```

```json
{
  "itemId": 101,
  "quantity": 5
}
```

Notifications are triggered **only when quantity changes from `0 → >0`**.

---

## 🧪 Testing the System

### Basic Test Flow

1. Subscribe user to an out-of-stock item
2. Restock item (`0 → >0`)
3. Observe:

   * Console logs for Email / Push
   * Rows inserted into `notifications` table
   * Entries appended to `notifications.json`
4. Restock again

   * No duplicate notifications should occur

---

### Crash Safety Test

1. Trigger restock
2. Stop server midway (`Ctrl + C`)
3. Restart server
4. Re-trigger restock
5. Only pending notifications are delivered

---

## 🛡️ Idempotency & Crash Safety

The system guarantees:

* No duplicate notifications
* Safe retries
* Resume after crashes

This is achieved by:

* Persisting all state in PostgreSQL
* Using a unique `(subscription_id, restock_id, channel)` constraint
* Checking delivery status before sending notifications

---

## 📄 Audit Logging

All notifications are also logged to:

```
notifications.json
```

This provides:

* Debug visibility
* Demo evidence
* Lightweight audit trail

---

## 🎓 How to Explain This Project (Short)

> Built an event-driven notification system where users can subscribe to out-of-stock items and receive multi-channel notifications when inventory is replenished. The system ensures idempotent delivery, crash safety, and clean separation of concerns using Node.js and PostgreSQL.

---

## 🔮 Future Improvements

* Add async queues (Redis / BullMQ)
* Add retry and failure handling per channel
* Add unit tests
* Add Swagger API documentation
* Dockerize the application

