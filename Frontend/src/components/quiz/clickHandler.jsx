function handleRestart(reStart) {
  reStart();
}
export function handleTest(reTest) {
  reTest();
}
export function handleHome(navigate, url) {
  navigate(url);
}
export default handleRestart;
