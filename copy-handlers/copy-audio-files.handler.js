import { sep, join, basename, extname } from 'path';

import { getExtName, copy } from '../utils.js';
import CopyFilesHandler from './copy-files.handler.js';

export default class CopyAudioFilesHandler extends CopyFilesHandler {
  constructor(outDir) {
    super(outDir);
    this.outDir = join(this.outDir, 'music');
  }

  copy(file) {
    const ext = getExtName(file);

    if (['mp3', 'flac', 'ape', 'cue', 'wav'].includes(ext)) {
      const subDir = ext === 'mp3' ? ext : 'lossless';
      const paths = file.split(sep).slice(1);
      const dest = paths.length === 1
        ? `to_sort_${basename(file, extname(file))}_music.${ext}`
        : join(...paths.slice(0, -1), paths.join('-'));

      return copy(file, join(this.outDir, subDir, dest));
    }
    return super.copy(file);
  }
}
