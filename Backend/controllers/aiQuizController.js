const QuizModel = require("../models/quiz");
const { quizQueue } = require("../queue/queue");

const generateAIQuizController = async (req, res) => {
  try {
    const { topic, difficulty, numberOfQuestions, additionalInfo } = req.body;

    // Validation
    if (!topic) {
      return res.status(400).json({
        success: false,
        message: "Topic is required",
      });
    }

    if (!difficulty) {
      return res.status(400).json({
        success: false,
        message: "Difficulty is required",
      });
    }

    if (!numberOfQuestions) {
      return res.status(400).json({
        success: false,
        message: "Number of questions is required",
      });
    }

    const job = await quizQueue.add(
      "generate-ai-quiz",
      {
        topic,
        difficulty,
        numberOfQuestions,
        additionalInfo,
      },
      {
        removeOnComplete: 50,
        removeOnFail: 20,
      },
    );

    console.log(`Quiz job queued : ${job.id}`);

    res.status(202).json({
      success: true,
      message: "Quiz generation started.",
      jobId: job.id,
    });
  } catch (error) {
    console.error("Generate Quiz Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to queue quiz generation.",
    });
  }
};

const getGeneratedQuizController = async (req, res) => {
  try {
    const quizzes = await QuizModel.find().sort({ createdAt: -1 }).lean();

    res.status(200).json({
      success: true,
      count: quizzes.length,
      data: quizzes,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch quizzes.",
    });
  }
};

const deleteQuizController = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedQuiz = await QuizModel.findByIdAndDelete(id);

    if (!deletedQuiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Quiz deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete quiz.",
    });
  }
};

module.exports = {
  generateAIQuizController,
  getGeneratedQuizController,
  deleteQuizController,
};
