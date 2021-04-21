export default class CopyService {
  firstHandler = null;

  lastHandler = null;

  constructor(copyHandlers = []) {
    this.firstHandler = copyHandlers?.reduceRight((next, copyHandler) => {
      copyHandler.setNext(next);
      return copyHandler;
    }, null);

    this.lastHandler = copyHandlers.pop() || null;

    this.copy = this.copy.bind(this);
  }

  copy(file) {
    this.firstHandler.copy(file);
  }

  addHandler(handler) {
    if (this.lastHandler) {
      this.lastHandler.setNext(handler);
    }

    if (!this.firstHandler) {
      this.firstHandler = handler;
    }

    this.lastHandler = handler;
  }
}
