const express = require("express");
const protect = require("../middlewares/authMiddleware.js");
const { getMe } = require("../controllers/userController.js");

const router = express.Router();

router.get("/me",protect,getMe);

module.exports = router;