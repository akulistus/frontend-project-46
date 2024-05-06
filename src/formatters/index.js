import applyStylishFormatter from './stylish.js';
import applyPlainFormatter from './plain.js';

const getFormatter = (formatter = 'stylish') => {
  switch (formatter) {
    case 'plain':
      return applyPlainFormatter;
    case 'stylish':
      return applyStylishFormatter;
    case 'json':
      return JSON.stringify;
    default:
      throw new Error('Not Implemented');
  }
};

export default getFormatter;
