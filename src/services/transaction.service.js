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

module.exports = {
  deposit
};
