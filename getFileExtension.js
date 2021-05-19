import { extname } from 'path';

const getFileExtension = (file) => extname(file).slice(1);

export default getFileExtension;
