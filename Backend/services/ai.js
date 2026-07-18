const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const MODELS = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-2.5-lite"];

const generateAIQuiz = async (prompt) => {
  let lastError;

  for (const modelName of MODELS) {
    try {
      console.log(`Trying Gemini model: ${modelName}`);

      const model = genAI.getGenerativeModel({
        model: modelName,
      });

      const result = await model.generateContent(prompt);

      const response = await result.response;

      const text = response.text();

      if (!text) {
        throw new Error("Empty Gemini response");
      }

      return text;
    } catch (error) {
      console.error(`Gemini failed (${modelName})`, error.message);

      lastError = error;
    }
  }

  throw lastError;
};

module.exports = {
  generateAIQuiz,
};
