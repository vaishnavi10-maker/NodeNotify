const express = require("express");
const protect = require("../middlewares/authMiddleware.js");
const { getTasks, completeTask } = require("../controllers/taskController.js");

const router = express.Router();

router.get("/", protect, getTasks);

router.patch("/:id", protect, completeTask);

module.exports = router;
