const cron = require("node-cron");
const User = require("../models/User");
const DailyAssignment = require("../models/DailyAssignment");
const { getNextProblems } = require("../services/dailyService");

cron.schedule("0 0 * * *", async () => {
  const users = await User.find();

  for (let user of users) {
    const problems = await getNextProblems(user.lastSolvedLeetcodeId);

    await DailyAssignment.create({
      user: user._id,
      date: new Date().toISOString().split("T")[0],
      problems: problems.map(p => ({ problem: p._id }))
    });
  }
});