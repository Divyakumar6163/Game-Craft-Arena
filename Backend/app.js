const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const guessTheObjectRoutes = require("./routes/guessTheObjectRoute");
const quizRoutes = require("./routes/quizRoute");

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:8000",
  "https://game-craft-arena.vercel.app",
  "https://game-craft-arena.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use(morgan("dev"));

app.use("/guess-the-object", guessTheObjectRoutes);
app.use("/quiz", quizRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running successfully.",
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

module.exports = app;
