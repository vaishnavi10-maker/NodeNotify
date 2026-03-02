const Problem = require("../models/Problem");
const User = require("../models/User");

exports.getTodayProblems = async (req, res) => {
  const user = await User.findById(req.user.id);

  const problems = await Problem.find({
    leetcodeId: { $gt: user.lastSolvedLeetcodeId }
  })
  .sort({ leetcodeId: 1 })
  .limit(3);

  res.json(problems);
};

exports.completeProblem = async (req, res) => {
  const problemId = req.params.id;
  const user = await User.findById(req.user.id);

  const problem = await Problem.findByIdAndUpdate(
    problemId,
    { completed: true },
    { new: true }
  );

  if (problem.leetcodeId > user.lastSolvedLeetcodeId) {
    user.lastSolvedLeetcodeId = problem.leetcodeId;
    user.streak += 1;
    await user.save();
  }

  res.json({ message: "Problem completed" });
};

exports.getSolvedProblems = async (req, res) => {

  try{

    const solved = await Problem.find({completed:true});

    res.json(solved);

  }catch(err){
    res.status(500).json({message:err.message});
  }

};
