const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const fs = require("fs");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const problemRoutes = require("./routes/problemRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

const DEFAULT_DEV_ORIGINS = ["http://localhost:5173", "http://127.0.0.1:5173"];
const DEFAULT_PROD_ORIGINS = ["https://nodenotify-dashboard.onrender.com"];
const envOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const allowedOrigins = new Set(
  process.env.NODE_ENV === "production"
    ? [...DEFAULT_PROD_ORIGINS, ...envOrigins]
    : [...DEFAULT_DEV_ORIGINS, ...DEFAULT_PROD_ORIGINS, ...envOrigins]
);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.has(origin)) {
      return callback(null, true);
    }

    return callback(new Error("CORS origin not allowed"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(helmet());
app.use(cors(corsOptions));
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
app.use("/api/tasks", taskRoutes);
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
