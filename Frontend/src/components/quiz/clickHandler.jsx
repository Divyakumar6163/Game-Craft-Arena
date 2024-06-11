function handleRestart(reStart) {
  reStart();
}
export function handleTest(reTest) {
  reTest();
}
// export function handlePause(setIsPause) {
//   setIsPause((prev) => !prev);
// }
export function handleHome(navigate, url) {
  navigate(url);
}
export default handleRestart;
