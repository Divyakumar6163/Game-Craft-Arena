const { Worker } = require("bullmq");
const QuizModel = require("../models/quiz");
const { buildQuizPrompt } = require("../services/prompt");
const { generateAIQuiz } = require("../services/ai");

const { redis } = require("./redis");
const { getIO } = require("../socket/socket");

const quizWorker = new Worker(
  "quiz-generation",
  async (job) => {
    console.log("🔥 Worker picked job:", job.id);
    const io = getIO();
    try {
      const { topic, difficulty, numberOfQuestions, additionalInfo } = job.data;

      io.emit("quiz:processing", {
        jobId: job.id,
        progress: 10,
        message: "Preparing quiz...",
      });

      const prompt = buildQuizPrompt({
        topic,
        difficulty,
        numberOfQuestions,
        additionalInfo,
      });

      io.emit("quiz:processing", {
        jobId: job.id,
        progress: 30,
        message: "Generating prompt...",
      });

      const raw = await generateAIQuiz(prompt);

      io.emit("quiz:processing", {
        jobId: job.id,
        progress: 70,
        message: "Generating questions...",
      });

      let parsed;

      try {
        parsed = JSON.parse(raw);
      } catch (err) {
        throw new Error("AI returned invalid JSON.");
      }

      if (!Array.isArray(parsed)) {
        throw new Error("AI response must be an array.");
      }

      io.emit("quiz:processing", {
        jobId: job.id,
        progress: 90,
        message: "Saving quiz...",
      });
      io.emit("quiz:completed", {
        jobId: job.id,
        quiz: parsed,
      });

      return parsed;
    } catch (error) {
      console.error("Quiz Worker Error:", error);

      io.emit("quiz:failed", {
        jobId: job.id,
        message: error.message || "Quiz generation failed.",
      });

      throw error;
    }
  },
  {
    connection: redis,
    concurrency: 2,
  },
);

quizWorker.on("completed", (job) => {
  console.log(`✅ Quiz Job ${job.id} completed`);
});

quizWorker.on("failed", (job, err) => {
  console.error(`❌ Quiz Job ${job?.id} failed`, err);
});

module.exports = {
  quizWorker,
};
