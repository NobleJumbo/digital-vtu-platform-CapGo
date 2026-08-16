const express = require("express");
const router = express.Router();

// const {fundWallet,verifyWalletFunding,} = require("../controllers/paymentController");
const {initializeServicePayment,} = require("../controllers/paymentControllerBackUp.js");

const {protect,} = require("../middleware/authMiddleware");

// router.post("/fund-wallet",protect,fundWallet);
// router.get("/verify/:reference",protect,verifyWalletFunding);

router.post("/initialize",protect,initializeServicePayment);

module.exports = router;