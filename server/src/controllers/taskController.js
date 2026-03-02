const Task = require("../models/Task.js");

const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });

  res.json(tasks);
};

const completeTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  task.completed = !task.completed;

  await task.save();

  res.json(task);
};

module.exports = { getTasks, completeTask };
