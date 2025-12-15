const express = require("express");
require("dotenv").config();

const app = express();

/**
 * ✅ VERY IMPORTANT
 * JSON middleware MUST come BEFORE routes
 */
app.use(express.json());

// Routes
const accountRoutes = require("./routes/account.routes");
const transactionRoutes = require("./routes/transaction.routes");

app.use("/accounts", accountRoutes);
app.use("/transactions", transactionRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Financial Ledger API is running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
