import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../bin/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
let file1;
let file2;
let resultDiff;

test.each([
  { ext: 'json' },
  { ext: 'yaml' },
])('test genDiff', ({ ext }) => {
  // ALL
  file1 = getFixturePath(`all/allPlainFile1.${ext}`);
  file2 = getFixturePath(`all/allPlainFile2.${ext}`);
  const result = `{
    host: hexlet.io
  - timeout: 50
  + timeout: 20
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;
  resultDiff = genDiff(file1, file2);
  expect(resultDiff).toEqual(result);
});
