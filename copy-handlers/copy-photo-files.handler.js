import { sep, join, basename } from 'path';

import { getExtName, copy } from '../utils.js';
import CopyFilesHandler from './copy-files.handler.js';

export default class CopyPhotoFilesHandler extends CopyFilesHandler {
  constructor(outDir) {
    super(outDir);
    this.outDir = join(this.outDir, 'images');
  }

  copy(file) {
    const ext = getExtName(file);
    if (['png', 'jpg', 'jpeg', 'gif'].includes(ext)) {
      const paths = file.split(sep).slice(1);

      if (paths.length === 1) {
        return copy(file, join(this.outDir, 'to_sort', basename(file)));
      }

      const subDirs = paths.slice(0, -1);
      const filename = [...subDirs, subDirs.length, basename(file)].join('-');
      return copy(file, join(this.outDir, ...subDirs, filename));
    }
    return super.copy(file);
  }
}
