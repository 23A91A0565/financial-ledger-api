const ledgerService = require("./ledger.service");
const { v4: uuidv4 } = require("uuid");
const pool = require("../config/db");

async function createAccount({ userId, accountType, currency }) {
  const id = uuidv4();

  const query = `
    INSERT INTO accounts (id, user_id, account_type, currency, status)
    VALUES (?, ?, ?, ?, 'ACTIVE')
  `;

  await pool.execute(query, [id, userId, accountType, currency]);

  return {
    id,
    userId,
    accountType,
    currency,
    status: "ACTIVE"
  };
}

async function getAccountById(accountId) {
  const [rows] = await pool.execute(
    "SELECT * FROM accounts WHERE id = ?",
    [accountId]
  );

  if (rows.length === 0) {
    return null;
  }

  const account = rows[0];
  const balance = await ledgerService.calculateBalance(accountId);

  return {
    id: account.id,
    userId: account.user_id,
    accountType: account.account_type,
    currency: account.currency,
    status: account.status,
    balance
  };
}

async function getAccountLedger(accountId) {
  return await ledgerService.getLedgerEntries(accountId);
}


module.exports = {
  createAccount,
  getAccountById,
  getAccountLedger
};
