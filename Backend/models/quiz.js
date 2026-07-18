const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Please add a question"],
      trim: true,
    },
    options: {
      type: [String],
      required: [true, "Please add options"],
      validate: {
        validator: (options) => options.length === 4,
        message: "A question must have exactly 4 options.",
      },
    },
    answer: {
      type: String,
      required: [true, "Please add the correct answer"],
      trim: true,
    },
  },
  {
    _id: false,
  },
);

const quizSchema = new mongoose.Schema(
  {
    quiz: {
      type: [questionSchema],
      required: [true, "Quiz cannot be empty"],
      validate: {
        validator: (quiz) => quiz.length > 0,
        message: "Quiz must contain at least one question.",
      },
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Quiz", quizSchema);
