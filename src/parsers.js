import yml from 'js-yaml';

const getDataParser = (dataType) => {
  if (dataType === 'json') {
    return JSON.parse;
  } if (dataType === 'yml' || dataType === 'yaml') {
    return yml.load;
  }
  throw new Error('Not Implemented');
};

export default getDataParser;
