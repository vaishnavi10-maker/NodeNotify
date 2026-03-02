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

// Default dev origins
const DEFAULT_DEV_ORIGINS = ["http://localhost:5173", "http://127.0.0.1:5173"];

// Add your production frontend here
const PROD_FRONTEND_ORIGIN = "https://nodenotify-dashboard.onrender.com";

const envOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

// Merge dev + prod + env origins
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? [...new Set([PROD_FRONTEND_ORIGIN, ...envOrigins])]
    : [...new Set([...DEFAULT_DEV_ORIGINS, ...envOrigins])];

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., mobile apps, Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS origin not allowed"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // allow preflight
  })
);

// Handle preflight requests for all routes
app.options("*", cors());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "dsa-reminder-api",
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/problems", problemRoutes);
app.use("/api/feedback", feedbackRoutes);

// Serve frontend in production
const frontendDistPath = path.resolve(__dirname, "../../front/dist");
if (process.env.NODE_ENV === "production" && fs.existsSync(frontendDistPath)) {
  app.use("/app", express.static(frontendDistPath));

  app.use((req, res) => {
    res.sendFile(path.join(frontendDistPath, "index.html"));
  });
}

// Error handler
app.use((error, req, res, next) => {
  if (error.message === "CORS origin not allowed") {
    return res.status(403).json({ message: "CORS: origin not allowed" });
  }

  console.error(error);
  return res.status(500).json({ message: error.message || "Internal Server Error" });
});

module.exports = app;