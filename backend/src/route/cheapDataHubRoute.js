const express = require("express");
const router = express.Router();

const {
buyAirtime,
buyData,
} = require("../controllers/cheapDateHubController.js");
const { protect } = require("../middleware/authMiddleware.js");



router.post("/airtime",protect,buyAirtime);
router.post("/data",protect,buyData);

module.exports = router;