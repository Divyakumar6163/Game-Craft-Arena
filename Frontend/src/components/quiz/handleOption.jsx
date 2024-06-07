function handleOption(option, answer, nextIndex, correctAns) {
  if (option === answer) {
    nextIndex();
    correctAns();
  } else {
    nextIndex();
  }
}
export default handleOption;
