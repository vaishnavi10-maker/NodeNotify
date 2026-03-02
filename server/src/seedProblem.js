const path = require("path");
const mongoose = require("mongoose");
const Problem = require("./models/Problem");
const data = require("./leetcode_problems_schema.json");

require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

const importData = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing in .env");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    await Problem.deleteMany({});
    await Problem.insertMany(data);

    console.log("Problems imported successfully.");
  } catch (error) {
    console.error("Error importing data:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

importData();
