const express = require("express");
const router = express.Router();

const {  getDataPlans, buyData} = require("../controllers/vtuController.js");
const { protect } = require("../middleware/authMiddleware.js");

router.get("/data/plans/:network",protect, getDataPlans);
router.post("/data/buy",protect,buyData);

module.exports = router;
