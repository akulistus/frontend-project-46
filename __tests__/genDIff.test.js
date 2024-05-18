import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'node:fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filepath) => readFileSync(filepath, 'utf-8');

test.each([
  { ext: 'json', result: 'stylishResult.txt', format: 'stylish' },
  { ext: 'yaml', result: 'stylishResult.txt', format: 'stylish' },
  { ext: 'yaml', result: 'plainResult.txt', format: 'plain' },
  { ext: 'json', result: 'plainResult.txt', format: 'plain' },
  { ext: 'json', result: 'jsonResult.txt', format: 'json' },
  { ext: 'yaml', result: 'jsonResult.txt', format: 'json' },
  { ext: 'yaml', result: 'stylishResult.txt'}
])('genDiff', ({ ext, result, format }) => {
  // ALL
  const file1 = getFixturePath(`File1.${ext}`);
  const file2 = getFixturePath(`File2.${ext}`);
  const expectdResult = readFile(getFixturePath(result));
  const actualResult = genDiff(file1, file2, format);
  expect(actualResult).toEqual(expectdResult);
});
