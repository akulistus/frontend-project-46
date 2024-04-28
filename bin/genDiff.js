import readFile from "../src/readFile.js";
import getFormatedString from "../src/formatters/getFormatedString.js";
import getDiffObject from '../src/getDiffObject.js'

const genDiff = (filepath1, filepath2, options) => {
	const fileObj1 = readFile(filepath1);
	const fileObj2 = readFile(filepath2);
	const diffObject = getDiffObject(fileObj1, fileObj2);
	const formatedString = getFormatedString(diffObject);
	return formatedString;
};

export default genDiff;
