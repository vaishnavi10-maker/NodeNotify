const mongoose = require("mongoose");

const dailySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: String,
  problems: [{
    problem: { type: mongoose.Schema.Types.ObjectId, ref: "Problem" },
    status: { type: String, default: "pending" }
  }]
});

module.exports = mongoose.model("DailyAssignment", dailySchema);