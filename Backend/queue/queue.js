const { Queue } = require("bullmq");
const { redis } = require("./redis");

const quizQueue = new Queue("quiz-generation", {
  connection: redis,
});

module.exports = {
  quizQueue,
};
