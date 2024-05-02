import applyStylishFormatter from './stylish.js';
import getFormatedString from './getFormatedString.js';

const getFormatter = (formatter = 'stylish') => {
  switch (formatter) {
    case 'plain':
      return getFormatedString;
    case 'stylish':
      return applyStylishFormatter;
    default:
      throw new Error('Not Implemented');
  }
};

export default getFormatter;
