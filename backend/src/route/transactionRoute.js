const express = require("express");

const {
  getTransactions,
  getTransaction,
} = require( "../controllers/transactionController");

const {protect,} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/",protect,getTransactions);
router.get("/:id",protect,getTransaction);

module.exports = router;
