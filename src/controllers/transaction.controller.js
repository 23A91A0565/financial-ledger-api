const transactionService = require("../services/transaction.service");

async function deposit(req, res) {
  try {
    const { accountId, amount, currency, description } = req.body;

    if (!accountId || !amount || !currency) {
      return res.status(400).json({
        error: "accountId, amount and currency are required"
      });
    }

    if (amount <= 0) {
      return res.status(400).json({ error: "Amount must be positive" });
    }

    const result = await transactionService.deposit({
      accountId,
      amount,
      currency,
      description
    });

    res.status(201).json(result);
  } catch (error) {
  console.error(error);
  res.status(500).json({ error: "Deposit failed" });
}
}

module.exports = {
  deposit
};
