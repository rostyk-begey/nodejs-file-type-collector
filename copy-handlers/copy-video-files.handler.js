import { join, basename, extname } from 'path';

import { getExtName, copy } from '../utils.js';
import CopyFilesHandler from './copy-files.handler.js';

export default class CopyVideoFilesHandler extends CopyFilesHandler {
  constructor(outDir) {
    super(outDir);
    this.outDir = join(this.outDir, 'films');
  }

  copy(file) {
    const ext = getExtName(file);
    if (['mp4', 'avi', 'mkv'].includes(ext)) {
      return copy(file, join(this.outDir, this.formatFileName(file)));
    }
    return super.copy(file);
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
