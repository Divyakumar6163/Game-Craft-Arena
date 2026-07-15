export default class SearchResult {
  constructor({ success = false, solution = [], metrics = null }) {
    this.success = success;
    this.solution = solution;
    this.metrics = metrics;
  }
}
