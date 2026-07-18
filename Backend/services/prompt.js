const buildQuizPrompt = ({
  topic,
  difficulty,
  numberOfQuestions,
  additionalInfo,
}) => {
  return `
You are an expert quiz creator.

Generate a high-quality multiple-choice quiz.

STRICT RULES

1. Return ONLY valid JSON.
2. Do NOT return markdown.
3. Do NOT wrap the response in \`\`\`.
4. Do NOT add explanations.
5. Do NOT add comments.
6. The response MUST work with JSON.parse().
7. Generate EXACTLY ${numberOfQuestions} questions.
8. Every question must have EXACTLY 4 options.
9. Exactly ONE option must be correct.
10. The answer MUST exactly match one of the options.
11. Questions should be unique.
12. Avoid repeating concepts.
13. Keep questions relevant to the topic.
14. Difficulty should be ${difficulty}.

TOPIC

${topic}

DIFFICULTY

${difficulty}

NUMBER OF QUESTIONS

${numberOfQuestions}

ADDITIONAL INSTRUCTIONS

${additionalInfo || "None"}

RETURN JSON IN EXACTLY THIS FORMAT

[
  {
    "question": "What is React?",
    "options": [
      "Library",
      "Framework",
      "Database",
      "Programming Language"
    ],
    "answer": "Library"
  },
  {
    "question": "Which hook is used for state management?",
    "options": [
      "useEffect",
      "useRef",
      "useState",
      "useMemo"
    ],
    "answer": "useState"
  }
]

FINAL RULES

- Return ONLY JSON.
- No markdown.
- No code block.
- No explanation.
- No comments.
- No extra text.
- Must work directly with JSON.parse().
`;
};

module.exports = {
  buildQuizPrompt,
};
