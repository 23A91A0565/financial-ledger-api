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

async function transfer(req, res) {
  try {
    const {
      sourceAccountId,
      destinationAccountId,
      amount,
      currency,
      description
    } = req.body;

    if (!sourceAccountId || !destinationAccountId || !amount || !currency) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (amount <= 0) {
      return res.status(400).json({ error: "Amount must be positive" });
    }

    const result = await transactionService.transfer({
      sourceAccountId,
      destinationAccountId,
      amount,
      currency,
      description
    });

    res.status(201).json(result);
  } catch (error) {
  if (error.message === "Insufficient funds") {
    return res.status(422).json({ error: "Insufficient balance" });
  }
  console.error(error);
  res.status(500).json({ error: "Transfer failed" });
}
}

module.exports = {
  deposit,
  transfer
};
