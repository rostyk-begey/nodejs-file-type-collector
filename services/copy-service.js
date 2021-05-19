import { join } from 'path';
import { readdirSync } from 'fs';
import rimraf from 'rimraf';

import getFileExtension from '../getFileExtension.js';
import AudioFileStrategy from '../copy-handlers/audio-file-strategy.js';
import VideoFilesStrategy from '../copy-handlers/video-files-strategy.js';
import OtherFileStrategy from '../copy-handlers/other-file-strategy.js';

export default class CopyService {
  outDir = null;

  constructor(outDir) {
    this.outDir = outDir;
  }

  *getFilesSync(dir) {
    const dirs = readdirSync(dir, { withFileTypes: true });
    for (let directory of dirs) {
      const res = join(dir, directory.name);
      if (directory.isDirectory()) {
        yield *this.getFilesSync(res);
      } else {
        yield res;
      }
    }
  }

  getCopyStrategy(file) {
    const ext = getFileExtension(file);
    switch (ext) {
      case 'mp4':
      case 'avi':
      case 'mkv':
        return new VideoFilesStrategy(join(this.outDir, 'music'));
      case 'png':
      case 'jpg':
      case 'gif':
      case 'jpeg':
        return new VideoFilesStrategy(join(this.outDir, 'images'));
      case 'mp3':
      case 'ape':
      case 'cue':
      case 'wav':
      case 'flac':
        return new AudioFileStrategy(join(this.outDir, 'music'));
      default:
        return new OtherFileStrategy(join(this.outDir, 'other'));
    }
  }


  copyFiles(dir) {
    rimraf.sync(this.outDir);
    for (let file of this.getFilesSync(dir)) {
      try {
        const copyStrategy = this.getCopyStrategy(file);
        copyStrategy.copy(file);
        console.log(`Copied ${file}`);
      } catch (e) {
        console.error(`Error coping ${file}`);
      }
    }
  }
}
