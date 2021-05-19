import { dirname } from 'path';
import { existsSync, mkdirSync, copyFileSync } from 'fs';

export default class BaseCopyStrategy {
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
