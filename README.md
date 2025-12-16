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
<img width="1898" height="921" alt="Screenshot 2025-12-16 192500" src="https://github.com/user-attachments/assets/effa5fb4-929c-4d32-a376-fc7631192164" />

## Get Account Details(with calculated balance)
```text
GET /accounts/{accountId}
```
<img width="1584" height="907" alt="Screenshot 2025-12-16 192631" src="https://github.com/user-attachments/assets/03a5780f-5a6f-4d55-97fb-1437fc106e1c" />

## Get Account Ledger
```text
GET /accounts/{accountId}/ledger
```
<img width="1587" height="901" alt="Screenshot 2025-12-16 192646" src="https://github.com/user-attachments/assets/2711333c-1076-44a9-bdc1-f0f1e1a203c1" />

## Deposit
```text
POST /transactions/deposits
```
<img width="1584" height="905" alt="Screenshot 2025-12-16 192758" src="https://github.com/user-attachments/assets/0db5c6d8-f4f4-4aba-ab3b-cf39536abbe6" />

## Transfer(Double-Entry)
```text
POST /transactions/transfers
```
<img width="1585" height="906" alt="Screenshot 2025-12-16 192850" src="https://github.com/user-attachments/assets/0cb7bd43-2d96-4a17-8739-d56f3ba25dd6" />

