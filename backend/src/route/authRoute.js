const express = require("express");
const router = express.Router();

const { createUser,loginUser,logoutUser,refreshToken} = require("../controllers/authController.js");
const { protect } = require("../middleware/authMiddleware.js");
// Create user route
router.post("/register", createUser);
router.post("/login", loginUser );
router.post("/logout", protect, logoutUser);
router.post("/refresh", refreshToken);

module.exports = router;