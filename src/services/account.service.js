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

module.exports = {
  createAccount
};
