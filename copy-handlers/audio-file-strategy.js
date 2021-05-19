import { sep, join, basename, extname } from 'path';

import getFileExtension from '../getFileExtension.js';
import BaseCopyStrategy from './base-copy-strategy.js';

export default class AudioFileStrategy extends BaseCopyStrategy {
  copy(file) {
    const ext = getFileExtension(file);

    const subDir = ext === 'mp3' ? ext : 'lossless';
    const paths = file.split(sep).slice(1);
    const dest = paths.length === 1
      ? `to_sort_${basename(file, extname(file))}_music.${ext}`
      : join(...paths.slice(0, -1), paths.join('-'));

    super.baseCopy(file, join(this.outDir, subDir, dest));
  }
}
