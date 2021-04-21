import { extname, dirname } from 'path';
import { existsSync, mkdirSync, copyFileSync } from 'fs';

export const getExtName = (file) => extname(file).slice(1);

export const copy = (src, dest) => {
  const dir = dirname(dest);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  copyFileSync(src, dest);
};
