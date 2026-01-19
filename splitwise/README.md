

# Splitwise – Low Level Design (Java)

## About the Project

This project is a **simplified version of Splitwise**, built in **Java**, mainly to understand and practice **Object-Oriented Programming and Low Level Design** concepts.

Instead of focusing on frameworks or UI, I focused on **how the system works internally** — how expenses are split, how balances are maintained, and how the design can be kept clean and extensible.

The application currently runs in the **console**, but the structure allows it to be easily converted into a backend service later.

---

## What This App Can Do

* Create users
* Create a group and add users to it
* Add expenses to the group
* Split expenses using:

  * Equal split
  * Exact split
* Automatically update balances
* Settle balances partially or fully
* View who owes whom and how much
* Validate exact split inputs so incorrect expenses are rejected

---

## How I Approached the Design

Before writing code, I first tried to understand the **core problem**:

> “Splitwise is basically about tracking who owes whom and how much.”

From that, I identified the main objects in the system:

* User
* Group
* Expense
* Split
* Balance

I then separated the system into **models**, **services**, and **strategies**, so that each part has a clear responsibility and changes in one part don’t affect the others.

---

## Project Structure

```
com.splitwise
│
├── model
│   ├── User.java
│   ├── Group.java
│   ├── Expense.java
│   └── Split.java
│
├── split
│   ├── SplitStrategy.java
│   ├── EqualSplitStrategy.java
│   └── ExactSplitStrategy.java
│
├── service
│   ├── BalanceService.java
│   ├── ExpenseService.java
│   └── SettlementService.java
│
├── controller
│   └── ExpenseController.java (optional)
│
└── Main.java
```

Right now, `Main.java` acts as the controller by taking input from the console and passing it to the services.

---

## Key Design Decisions

### 1. Keeping Models Simple

Classes like `User`, `Group`, and `Expense` only store data.
They do not contain business logic.

This helped keep the code easier to reason about and avoid large “god classes”.

---

### 2. Using Strategy Pattern for Expense Splitting

Since expenses can be split in different ways, I used the **Strategy Pattern**.

* `SplitStrategy` defines how a split should work
* `EqualSplitStrategy` and `ExactSplitStrategy` implement different behaviors

This makes it easy to add new split types later without changing existing code.

---

### 3. Centralized Balance Management

All balance updates happen through `BalanceService`.

Balances are stored in a structure that clearly represents:

```
who owes → whom → how much
```

This made it easy to support:

* Multiple expenses
* Partial settlements
* Full settlements

---

### 4. Input Validation at the Controller Level

For exact splits, I added validation to ensure that:

```
sum of exact splits == total expense amount
```

If this validation fails, the expense is rejected and no balances are updated.
This prevents inconsistent state in the system.

---

## How the App Works (High-Level Flow)

1. The application starts from `Main.java`
2. Users and a group are created
3. Expense details are taken from the console
4. A split type is selected (Equal or Exact)
5. Inputs are validated
6. The expense is processed using `ExpenseService`
7. Balances are updated in `BalanceService`
8. Users can view balances or settle them

No money is actually transferred — the app only tracks debts.

---

## OOPS Concepts Used

* Encapsulation (private fields, controlled access)
* Abstraction (interfaces like `SplitStrategy`)
* Polymorphism (different split strategies)
* Single Responsibility Principle
* Open–Closed Principle
* Dependency Injection
* Separation of Concerns

---

## Limitations

* Data is stored in memory (no database)
* Console-based input only
* No authentication or authorization

These were intentionally left out to focus on **core design and OOPS concepts**.

---

## What I Would Improve Next

* Add percentage-based splitting
* Simplify balances (net settlements)
* Persist data using a database
* Expose REST APIs using a framework like Spring Boot
* Handle concurrency and transactions

---

## Final Thoughts

This project helped me understand how a real-world system like Splitwise can be broken down into smaller, manageable components using OOPS principles.
The main focus was **design clarity and correctness**, not feature completeness.

