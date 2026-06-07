const express = require("express");
const router = express.Router();

const { buyAirtime } = require("../controllers/vtuController.js");
const { protect } = require("../middleware/authMiddleware.js");

router.post("/airtime", protect, buyAirtime);
router.post("/data", protect, buyAirtime);
router.post("/cable", protect, buyAirtime);
router.post("/electricity", protect, buyAirtime);
module.exports = router;