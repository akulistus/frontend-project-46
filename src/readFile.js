import { readFileSync } from 'node:fs';

const readFile = (filepath) => {
  const file = readFileSync(filepath, 'utf-8');
  const parsedFile = JSON.parse(file);
  return parsedFile;
};

export default readFile;
