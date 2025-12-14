const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());

// Routes
const accountRoutes = require("./routes/account.routes");
app.use("/accounts", accountRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Financial Ledger API is running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
