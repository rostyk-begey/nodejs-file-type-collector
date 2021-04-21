export default class CopyFilesHandler {
  outDir = 'output_root';

  nextHandler = null;

  constructor(outDir = 'output_root') {
    this.outDir = outDir;
  }

  setNext(handler) {
    return this.nextHandler = handler;
  }

  copy(file) {
    if (this.nextHandler) {
      return this.nextHandler.copy(file);
    }

    return null;
  }
}
