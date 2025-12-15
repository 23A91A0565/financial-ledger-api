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

module.exports = {
  calculateBalance
};
