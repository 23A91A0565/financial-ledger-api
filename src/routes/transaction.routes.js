const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transaction.controller");

router.post("/deposits", transactionController.deposit);
router.post("/transfers", transactionController.transfer);

module.exports = router;
