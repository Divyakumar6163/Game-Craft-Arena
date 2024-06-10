const handleOptionClick = (
  option,
  currentQuestion,
  setIsCorrect,
  correctAns,
  setSelectedOption
) => {
  handleOption(option, currentQuestion.answer, setIsCorrect, correctAns);
  setSelectedOption(option);
};
function handleOption(option, answer, setIsCorrect, correctAns) {
  if (option === answer) {
    setIsCorrect(true);
    correctAns();
  } else {
    setIsCorrect(false);
  }
}
export default handleOptionClick;
