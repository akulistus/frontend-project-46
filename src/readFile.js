import { readFileSync } from 'node:fs';

const readFile = (filepath) => {
  const file = readFileSync(filepath);
  const parsedFile = JSON.parse(file);
  return parsedFile;
};

export default readFile;
