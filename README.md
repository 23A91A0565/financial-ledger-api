# 📘 Financial Ledger API – Double-Entry Bookkeeping

## 📌Overview

This project is a **Financial Ledger REST API** built using **Node.js, Express, and MySQL**, implementing the principles of **double-entry bookkeeping**. 

This system will serve as the backbone for a mock banking application, requiring absolute data integrity and auditability. The primary goal is to build a service that can reliably track and manage financial transactions between accounts..

---

## 🎯Objectives
- **double-entry bookkeeping**
- **immutable ledger**
- **balance integrity**
- **ACID-compliant database transactions**
- **verifiable transaction history**

---

## 🛠Tech Stack
- **Node.js**
- **Express.js**
- **MySQL**
- **mysql2** (for transaction support)
- **UUID** (secure unique identifiers)
- **dotenv** (environment variable management)

---

## 🗄 Database Schema

### Accounts
Each consists of

- **id**
- **user_id**
- **account_type** (savings/checking)
- **currency**
- **status** (Active/Frozen)

---

### Transactions
Represents the intent of a financial operation.

- **id**
- **type**(Deposit/Transfer)
- **source_account_id**
- **destination_account_id**
- **amount**
- **status**(Pending/completed/Failed)
- **description**

---

### Ledger Entries (Immutable)
The **single source of truth** for all balances.

- **id**
- **account_id**
- **transaction_id**
- **entry_type** (Debit/Credit)
- **amount**

---

## 🔁Double-Entry Bookkeeping
- Every **transfer** generates:
  - One **DEBIT** entry from the source account
  - One **CREDIT** entry to the destination account
- The sum of ledger entries for a transaction is always **zero**

---

## 🧮Balance Calculation
Balances are **not stored** in the database.

```text
Balance = SUM(CREDITS) − SUM(DEBITS)
```
---

# 🚀API Endpoints

## Create Account
```text
POST /accounts
```
## Get Account Details(with calculated balance)
```text
GET /accounts/{accountId}
```
## Get Account Ledger
```text
GET /accounts/{accountId}/ledger
```
## Deposit
```text
POST /transactions/deposits
```
## Transfer(Double-Entry)
```text
POST /transactions/transfers
```
