const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
app.use(cors());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use(morgan("dev"));

const guessTheObjectRoutes = require("./routes/guessTheObjectRoute");
const quizRoutes = require("./routes/quizRoute");

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
