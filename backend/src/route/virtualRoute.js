const express = require("express");

const router = express.Router();

const { getMyVirtualAccount,} = require("../controllers/virtualController.js");

const {protect,} = require("../middleware/authMiddleware");

router.get("/me",protect,getMyVirtualAccount);

module.exports = router;