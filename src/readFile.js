import { readFileSync } from 'node:fs';
import path from 'path';
import getDataParser from './parsers.js';

const readFile = (filepath) => {
  const file = readFileSync(filepath, 'utf-8');
  const dataType = path.extname(filepath).slice(1);
  const parser = getDataParser(dataType);
  const parsedFile = parser(file);
  return parsedFile;
};

export default readFile;
