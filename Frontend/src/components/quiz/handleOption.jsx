function handleOption(option, answer, nextIndex, correctAns, setTimer) {
  if (option === answer) {
    nextIndex();
    correctAns();
    setTimer(10);
  } else {
    nextIndex();
    setTimer(10);
  }
}
export default handleOption;
