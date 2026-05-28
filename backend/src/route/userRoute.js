const express = require("express");
const router = express.Router();

const { createUser } = require("../controllers/userController.js");

// Create user route
router.post("/register", createUser);

module.exports = router;