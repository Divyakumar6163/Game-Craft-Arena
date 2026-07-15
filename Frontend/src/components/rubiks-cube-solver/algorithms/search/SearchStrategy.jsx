export default class SearchStrategy {
  createOpenSet() {
    throw new Error("createOpenSet() not implemented.");
  }

  add(open, node) {
    throw new Error();
  }

  remove(open) {
    throw new Error();
  }
}
