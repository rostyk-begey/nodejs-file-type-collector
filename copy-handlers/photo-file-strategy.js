const { join, basename, sep } = require('path');
const BaseCopyStrategy = require('./base-copy-strategy.js');

class PhotoFileStrategy extends BaseCopyStrategy {
  copy(file) {
    const paths = file.split(sep).slice(1);

    if (paths.length === 1) {
      super.baseCopy(file, join(this.outDir, 'to_sort', basename(file)));
    }

    const subDirs = paths.slice(0, -1);
    const filename = [...subDirs, subDirs.length, basename(file)].join('-');
    super.baseCopy(file, join(this.outDir, ...subDirs, filename));
  }
}

module.exports = PhotoFileStrategy;
