const express = require("express");
const router = express.Router();
const Problem = require("../models/Problem");

const auth = require("../middlewares/authMiddleware");

const {
  getTodayProblems,
  completeProblem,
  getSolvedProblems
} = require("../controllers/problemController");


// =======================
// DAILY 3 PROBLEMS ROUTES
// =======================

router.get("/today", auth, getTodayProblems);

router.post("/complete/:id", auth, completeProblem);

router.get("/solved", getSolvedProblems);


// =======================
// ALL 197 PROBLEMS ROUTES
// =======================

// GET ALL PROBLEMS
router.get("/", async (req, res) => {
  try {
    const problems = await Problem.find();
    res.json(problems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// UPDATE SOLVED STATUS
router.patch("/:id", async (req, res) => {
  try {
    const problem = await Problem.findByIdAndUpdate(
      req.params.id,
      { completed: req.body.completed },
      { new: true }
    );

    res.json(problem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;