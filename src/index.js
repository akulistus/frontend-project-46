import readFile from './readFile.js';
import getDiffObject from './getDiffObject.js';
import formatDiff from './formatters/index.js';

const genDiff = (filepath1, filepath2, format) => {
  const content1 = readFile(filepath1);
  const content2 = readFile(filepath2);
  const diffObject = getDiffObject(content1, content2);
  const formatedString = formatDiff(diffObject, format);
  return formatedString;
};

export default genDiff;
