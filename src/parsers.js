import yml from 'js-yaml';
import path from 'path';

const getFileParser = (filepath) => {
  const ext = path.extname(filepath);
  if (ext === '.json') {
    return JSON.parse;
  } if (ext === '.yml' || ext === '.yaml') {
    return yml.load;
  }
  throw new Error('Not Implemented');
};

export default getFileParser;
