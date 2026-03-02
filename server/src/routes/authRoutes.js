const express = require("express");
const router = express.Router();
const { register, login, getUser } = require("../controllers/authController");
const auth = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");
router.post("/register",upload.single("profilePic"),register);
router.post("/login", login);
router.get("/user", auth, getUser);

module.exports = router;