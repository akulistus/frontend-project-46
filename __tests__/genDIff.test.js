import genDiff from "../bin/genDiff.js";
import fs from 'node:fs'
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
let file1;
let file2;
let resultDiff;

test('test Plain diff', () => {
  //DELETE
  file1 = getFixturePath('delete/deletePlainFile1.json');
  file2 = getFixturePath('delete/deletePlainFile2.json');
  resultDiff = genDiff(file1, file2);
  expect(resultDiff).toEqual('{\n  - proxy: 123.234.53.22\n}');

  //ADD
  file1 = getFixturePath('add/addPlainFile1.json');
  file2 = getFixturePath('add/addPlainFile2.json');
  resultDiff = genDiff(file1, file2);
  expect(resultDiff).toEqual('{\n  + host: hexlet.io\n}');

  //CHANGE
  file1 = getFixturePath('change/changePlainFile1.json');
  file2 = getFixturePath('change/changePlainFile2.json');
  resultDiff = genDiff(file1, file2);
  expect(resultDiff).toEqual('{\n  - timeout: 50\n  + timeout: 70\n}');

  //NOCHANGE
  file1 = getFixturePath('nochange/nochangePlainFile1.json');
  file2 = getFixturePath('nochange/nochangePlainFile2.json');
  resultDiff = genDiff(file1, file2);
  expect(resultDiff).toEqual('{\n    follow: false\n}');

  //ALL
  file1 = getFixturePath('all/allPlainFile1.json');
  file2 = getFixturePath('all/allPlainFile2.json');
  const result = 
  `{
    host: hexlet.io
  - timeout: 50
  + timeout: 20
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`
  resultDiff = genDiff(file1, file2);
  expect(resultDiff).toEqual(result);
});