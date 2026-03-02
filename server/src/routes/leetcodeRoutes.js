const express = require("express");
const { getLeetCodeStats } = require("../controllers/leetcodeController.js");

const router = express.Router();

router.get("/:username",getLeetCodeStats);

module.exports = router;