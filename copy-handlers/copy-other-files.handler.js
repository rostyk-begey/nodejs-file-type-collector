import { join, sep } from 'path';

import { copy } from '../utils.js';
import CopyFilesHandler from './copy-files.handler.js';

export default class CopyOtherFilesHandler extends CopyFilesHandler {
  constructor(outDir) {
    super(outDir);
    this.outDir = join(this.outDir, 'other');
  }

  copy(file) {
    const dir = join(...file.split(sep).slice(1));
    return copy(file, join(this.outDir, dir));
  }
}
