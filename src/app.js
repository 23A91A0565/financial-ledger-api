const express = require("express");
require("dotenv").config();

const app = express();

// Middleware to parse incoming JSON
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.send("Financial Ledger API is running");
});

// Port configuration
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
