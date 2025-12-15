const express = require("express");
const router = express.Router();
const accountController = require("../controllers/account.controller");

router.post("/", accountController.createAccount);
router.get("/:accountId", accountController.getAccount);
router.get("/:accountId/ledger", accountController.getAccountLedger);

module.exports = router;
