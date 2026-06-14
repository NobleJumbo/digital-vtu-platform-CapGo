const express = require("express");
const router = express.Router();


const { protect } = require("../middleware/authMiddleware.js");
const { getProfile } = require("../controllers/profileController.js");

router.get("/", protect, getProfile);
module.exports = router;
