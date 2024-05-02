import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'node:fs';
import genDiff from '../bin/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filepath) => readFileSync(filepath, 'utf-8');

test.each([
  { ext: 'json', result: 'all/allStylishResult.txt' },
  { ext: 'yaml', result: 'all/allStylishResult.txt' },
])('test genDiff', ({ ext, result }) => {
  // ALL
  const file1 = getFixturePath(`all/allStylishFile1.${ext}`);
  const file2 = getFixturePath(`all/allStylishFile2.${ext}`);
  const expectdResult = readFile(getFixturePath(result));
  const actualResult = genDiff(file1, file2);
  expect(actualResult).toEqual(expectdResult);
});
