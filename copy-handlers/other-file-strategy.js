import { join, sep } from 'path';

import BaseCopyStrategy from './base-copy-strategy.js';

export default class OtherFileStrategy extends BaseCopyStrategy {
  copy(file) {
    const dir = join(...file.split(sep).slice(1));
    super.baseCopy(file, join(this.outDir, dir));
  }
}
