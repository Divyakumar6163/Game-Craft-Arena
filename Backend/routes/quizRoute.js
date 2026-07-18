const express = require("express");

const router = express.Router();
const { generateAIQuizController } = require("../controllers/aiQuizController");
const { createQuiz, getAllQuizzes } = require("../controllers/quizController");

router.post("/createQuiz", createQuiz);
router.post("/createAIQuiz", generateAIQuizController);

router.get("/playQuiz", getAllQuizzes);

module.exports = router;
