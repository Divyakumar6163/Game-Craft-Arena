const QuizModel = require("../models/quiz");

const createQuiz = async (req, res) => {
  try {
    const { quiz } = req.body;

    const newQuiz = new QuizModel({
      quiz,
    });

    await newQuiz.save();

    return res.status(201).json({
      success: true,
      message: "Quiz saved successfully.",
    });
  } catch (err) {
    console.error("Error saving quiz:", err);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await QuizModel.find();

    return res.status(200).json(quizzes);
  } catch (err) {
    console.error("Error fetching quizzes:", err);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

module.exports = {
  createQuiz,
  getAllQuizzes,
};
