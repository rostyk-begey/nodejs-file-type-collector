const { dirname } = require('path');
const { existsSync, mkdirSync, copyFileSync } = require('fs');

class BaseCopyStrategy {
  outDir = 'output_root';

  constructor(outDir = 'output_root') {
    this.outDir = outDir;
  }

  copy(file) {
    throw new Error('Copy method is not implemented')
  }

  baseCopy(src, dest) {
    const dir = dirname(dest);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    copyFileSync(src, dest);
  };
}

module.exports = BaseCopyStrategy;
