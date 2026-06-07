const express = require("express");

const router = express.Router();

const {
  fundWallet,
  verifyWalletFunding,
} = require("../controllers/paymentController");

const {
  protect,
} = require("../middleware/authMiddleware");

router.post(
  "/fund-wallet",
  protect,
  fundWallet
);

router.get(
  "/verify/:reference",
  protect,
  verifyWalletFunding
);

module.exports = router;