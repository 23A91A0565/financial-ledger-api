# 📘 Financial Ledger API – Double-Entry Bookkeeping

## 📌 Overview
This project is a **Financial Ledger REST API** built using **Node.js, Express, and MySQL**, implementing the principles of **double-entry bookkeeping**.  
It serves as the backend for a mock banking system where **account balances are never stored directly**, but are **calculated dynamically from immutable ledger entries**, ensuring strong **data integrity, auditability, and correctness**.

This system goes beyond basic CRUD operations by enforcing **ACID transactions**, **ledger immutability**, and **strict business rules such as overdraft prevention**.

---

## 🎯 Objectives
- Implement **double-entry bookkeeping**
- Maintain an **immutable ledger** as the single source of truth
- Enforce **balance integrity** (no negative balances)
- Use **ACID-compliant database transactions**
- Provide a **verifiable transaction history**

---

## 🛠 Tech Stack
- **Node.js**
- **Express.js**
- **MySQL**
- **mysql2** (for transaction support)
- **UUID** (secure unique identifiers)
- **dotenv** (environment variable management)

---

## 🗄 Database Schema

### Accounts
Stores account metadata only (**no balance is stored**).

| Column | Description |
|------|------------|
| id | UUID (Primary Key) |
| user_id | User identifier |
| account_type | savings / checking |
| currency | INR |
| status | ACTIVE / FROZEN |
| created_at | Timestamp |

---

### Transactions
Represents the intent of a financial operation.

| Column | Description |
|------|------------|
| id | UUID |
| type | DEPOSIT / TRANSFER |
| source_account_id | Nullable |
| destination_account_id | Nullable |
| amount | DECIMAL |
| currency | Currency code |
| status | PENDING / COMPLETED / FAILED |
| description | Optional text |
| created_at | Timestamp |

---

### Ledger Entries (Immutable)
The **single source of truth** for all balances.

| Column | Description |
|------|------------|
| id | UUID |
| account_id | FK → accounts |
| transaction_id | FK → transactions |
| entry_type | CREDIT / DEBIT |
| amount | DECIMAL |
| created_at | Timestamp |

> ⚠ Ledger entries are **append-only** and can never be updated or deleted.

---

## 🔁 Double-Entry Bookkeeping
- Every **transfer** generates:
  - One **DEBIT** entry from the source account
  - One **CREDIT** entry to the destination account
- The sum of ledger entries for a transaction is always **zero**
- All operations occur within a **single database transaction**

---

## 🧮 Balance Calculation
Balances are **not stored** in the database.

```text
Balance = SUM(CREDITS) − SUM(DEBITS)
