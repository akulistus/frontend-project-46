import { readFileSync } from 'node:fs';
import getFileParser from './parsers.js';

const readFile = (filepath) => {
  const file = readFileSync(filepath, 'utf-8');
  const parser = getFileParser(filepath);
  const parsedFile = parser(file);
  return parsedFile;
};

export default readFile;
