const { join, sep } = require('path');
const BaseCopyStrategy = require('./base-copy-strategy.js');

class OtherFileStrategy extends BaseCopyStrategy {
  copy(file) {
    const dir = join(...file.split(sep).slice(1));
    super.baseCopy(file, join(this.outDir, dir));
  }
}

module.exports = OtherFileStrategy;
