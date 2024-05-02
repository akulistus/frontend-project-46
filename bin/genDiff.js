import readFile from '../src/readFile.js';
import getDiffObject from '../src/getDiffObject.js';
import getFormatter from '../src/formatters/getFormatter.js';

const genDiff = (filepath1, filepath2, format) => {
  const fileObj1 = readFile(filepath1);
  const fileObj2 = readFile(filepath2);
  const diffObject = getDiffObject(fileObj1, fileObj2);
  const formatter = getFormatter(format);
  const formatedString = formatter(diffObject);
  return formatedString;
};

export default genDiff;
