const express = require("express");

const router = express.Router();

const {
  getAllUsers,
  getAllTransactions,
  getDashboardStats,
  getUserById,
  blockUser,
  unblockUser,
  adminCreditWallet,
    createAdmin

} = require("../controllers/adminController");

const {
  protect,
} = require("../middleware/authMiddleware");

const {adminOnly,} = require("../middleware/adminMiddleware");

router.get("/users", protect, adminOnly, getAllUsers);
router.get("/transactions",protect,adminOnly,getAllTransactions);
router.get("/dashboard",protect,adminOnly, getDashboardStats);
router.get("/users/:id",protect,adminOnly,getUserById);
router.patch("/users/:id/block",protect,adminOnly,blockUser);
router.patch("/users/:id/unblock",protect,adminOnly,unblockUser);
router.post("/wallet/credit",protect,adminOnly,adminCreditWallet);
router.post("/create-admin",protect,adminOnly,createAdmin);

module.exports = router;