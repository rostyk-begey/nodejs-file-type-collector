import { join } from 'path';
import { readdirSync } from 'fs';
import rimraf from 'rimraf';

export default class CollectorService {
  outDir = null;

  copyService = null;

  constructor(outDir, copyService) {
    this.outDir = outDir;
    this.copyService = copyService;
  }

  getFilesSync(dir) {
    return readdirSync(dir, { withFileTypes: true }).reduce((acc, directory) => {
      const res = join(dir, directory.name);
      if (directory.isDirectory()) {
        return [...acc, ...this.getFilesSync(res)];
      }
      return [...acc, res];
    }, []);
  }

  run(dir) {
    rimraf.sync(this.outDir);
    this.getFilesSync(dir).forEach(this.copyService.copy);
  }
}
