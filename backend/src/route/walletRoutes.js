const express = require("express");
const router = express.Router();

const {getWallet,fundWallet,} = require("../controllers/walletController.js");
const {protect,} = require("../middleware/authMiddleware");

router.get("/getWallet", protect, getWallet);
router.post("/fundWallet", protect, fundWallet);
module.exports = router;