const Problem = require("../models/Problem");

exports.getNextProblems = async (lastSolvedId, limit = 3) => {
  return await Problem.find({
    leetcodeId: { $gt: lastSolvedId }
  })
  .sort({ leetcodeId: 1 })
  .limit(limit);
};