const { v4: uuidv4 } = require("uuid");
const pool = require("../config/db");

async function deposit({ accountId, amount, currency, description }) {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const transactionId = uuidv4();
    const ledgerEntryId = uuidv4();

    // Create transaction record
    await connection.execute(
      `INSERT INTO transactions 
       (id, type, destination_account_id, amount, currency, status, description)
       VALUES (?, 'DEPOSIT', ?, ?, ?, 'COMPLETED', ?)`,
      [transactionId, accountId, amount, currency, description]
    );

    // Create CREDIT ledger entry
    await connection.execute(
      `INSERT INTO ledger_entries
       (id, account_id, transaction_id, entry_type, amount)
       VALUES (?, ?, ?, 'CREDIT', ?)`,
      [ledgerEntryId, accountId, transactionId, amount]
    );

    await connection.commit();
    return { transactionId, status: "COMPLETED" };

  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

async function transfer({
  sourceAccountId,
  destinationAccountId,
  amount,
  currency,
  description
}) {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // 1️⃣ Check source balance
    const [balanceRows] = await connection.execute(
      `SELECT COALESCE(SUM(
         CASE WHEN entry_type = 'CREDIT' THEN amount
              WHEN entry_type = 'DEBIT' THEN -amount
         END
       ), 0) AS balance
       FROM ledger_entries
       WHERE account_id = ?`,
      [sourceAccountId]
    );

    if (balanceRows[0].balance < amount) {
      throw new Error("Insufficient funds");
    }

    const transactionId = uuidv4();

    // 2️⃣ Create transaction record
    await connection.execute(
      `INSERT INTO transactions
       (id, type, source_account_id, destination_account_id, amount, currency, status, description)
       VALUES (?, 'TRANSFER', ?, ?, ?, ?, 'COMPLETED', ?)`,
      [transactionId, sourceAccountId, destinationAccountId, amount, currency, description]
    );

    // 3️⃣ Debit source account
    await connection.execute(
      `INSERT INTO ledger_entries
       (id, account_id, transaction_id, entry_type, amount)
       VALUES (?, ?, ?, 'DEBIT', ?)`,
      [uuidv4(), sourceAccountId, transactionId, amount]
    );

    // 4️⃣ Credit destination account
    await connection.execute(
      `INSERT INTO ledger_entries
       (id, account_id, transaction_id, entry_type, amount)
       VALUES (?, ?, ?, 'CREDIT', ?)`,
      [uuidv4(), destinationAccountId, transactionId, amount]
    );

    await connection.commit();
    return { transactionId, status: "COMPLETED" };

  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

module.exports = {
  deposit,
  transfer
};
