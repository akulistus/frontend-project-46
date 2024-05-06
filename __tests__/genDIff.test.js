import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'node:fs';
import genDiff from '../bin/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filepath) => readFileSync(filepath, 'utf-8');

test.each([
  { ext: 'json', result: 'StylishResult.txt', format: 'stylish' },
  { ext: 'yaml', result: 'StylishResult.txt', format: 'stylish' },
  { ext: 'yaml', result: 'PlainResult.txt', format: 'plain' },
  { ext: 'json', result: 'PlainResult.txt', format: 'plain' },
  { ext: 'json', result: 'JsonResult.txt', format: 'json' },
  { ext: 'yaml', result: 'JsonResult.txt', format: 'json' },
])('genDiff', ({ ext, result, format }) => {
  // ALL
  const file1 = getFixturePath(`File1.${ext}`);
  const file2 = getFixturePath(`File2.${ext}`);
  const expectdResult = readFile(getFixturePath(result));
  const actualResult = genDiff(file1, file2, format);
  expect(actualResult).toEqual(expectdResult);
});
