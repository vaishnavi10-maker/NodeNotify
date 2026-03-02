const express = require("express");
const router = express.Router();
const { register, login, getUser } = require("../controllers/authController");
const auth = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");

router.post("/register", (req, res, next) => {
  upload.single("profilePic")(req, res, (err) => {
    if (err) {
      console.error("Upload error:", err);
    }
    next();
  });
}, register);

router.post("/login", login);
router.get("/user", auth, getUser);

module.exports = router;