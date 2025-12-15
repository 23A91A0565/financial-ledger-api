const accountService = require("../services/account.service");

async function createAccount(req, res) {
  try {
    const { userId, accountType, currency } = req.body;

    if (!userId || !accountType || !currency) {
      return res.status(400).json({
        error: "userId, accountType and currency are required"
      });
    }

    const account = await accountService.createAccount({
      userId,
      accountType,
      currency
    });

    res.status(201).json(account);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create account" });
  }
}

async function getAccount(req, res) {
  try {
    const { accountId } = req.params;

    const account = await accountService.getAccountById(accountId);

    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }

    res.json(account);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch account" });
  }
}


module.exports = {
  createAccount,
  getAccount
};
