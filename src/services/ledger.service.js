const pool = require("../config/db");

async function calculateBalance(accountId) {
  const query = `
    SELECT 
      COALESCE(
        SUM(
          CASE
            WHEN entry_type = 'CREDIT' THEN amount
            WHEN entry_type = 'DEBIT' THEN -amount
          END
        ), 0
      ) AS balance
    FROM ledger_entries
    WHERE account_id = ?
  `;

  const [rows] = await pool.execute(query, [accountId]);
  return rows[0].balance;
}

async function getLedgerEntries(accountId) {
  const query = `
    SELECT 
      id,
      transaction_id,
      entry_type,
      amount,
      created_at
    FROM ledger_entries
    WHERE account_id = ?
    ORDER BY created_at ASC
  `;

  const [rows] = await pool.execute(query, [accountId]);
  return rows;
}


module.exports = {
  calculateBalance,
  getLedgerEntries
};
