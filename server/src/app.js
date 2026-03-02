const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const fs = require("fs");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const problemRoutes = require("./routes/problemRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");

const app = express();

const DEFAULT_DEV_ORIGINS = ["http://localhost:5173", "http://127.0.0.1:5173"];
const envOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? envOrigins
    : [...new Set([...DEFAULT_DEV_ORIGINS, ...envOrigins])];

app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      if (process.env.NODE_ENV !== "production" && allowedOrigins.length === 0) {
        return callback(null, true);
      }

      return callback(new Error("CORS origin not allowed"));
    },
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "dsa-reminder-api",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/problems", problemRoutes);
app.use("/api/feedback", feedbackRoutes);

const frontendDistPath = path.resolve(__dirname, "../../front/dist");

if (process.env.NODE_ENV === "production" && fs.existsSync(frontendDistPath)) {
  app.use("/app", express.static(frontendDistPath));

  app.use((req, res) => {
    res.sendFile(path.join(frontendDistPath, "index.html"));
  });
}

app.use((error, req, res, next) => {
  if (error.message === "CORS origin not allowed") {
    return res.status(403).json({ message: "CORS: origin not allowed" });
  }

  return next(error);
});

module.exports = app;
