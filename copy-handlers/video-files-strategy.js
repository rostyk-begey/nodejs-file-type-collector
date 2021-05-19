import { join, basename, extname } from 'path';

import BaseCopyStrategy from './base-copy-strategy.js';

export default class VideoFilesStrategy extends BaseCopyStrategy {
  copy(file) {
    super.baseCopy(file, join(this.outDir, this.formatFileName(file)));
  }

  capitalizeFirstLetter(string) {
    const str = string.toLowerCase();
    return str[0].toUpperCase() + str.slice(1);
  }

  formatFileName(file) {
    const ext = extname(file);
    const baseFilename = basename(file, ext);
    const filenameParts = baseFilename.split(/[._]/);
    const year = baseFilename.match(/\d\d\d\d/);
    const re = /(fullhd|xdiv|(\d\d\d\d))/i;
    const filename = filenameParts
      .filter((x) => !(re.test(x)))
      .map(this.capitalizeFirstLetter)
      .join(' ');
    return year ? `${filename} [${year}]${ext}` : `${filename}${ext}`;
  }
}
