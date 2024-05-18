import applyStylishFormatter from './stylish.js';
import applyPlainFormatter from './plain.js';

const formatDiff = (data, formatter = 'stylish') => {
  switch (formatter) {
    case 'plain':
      return applyPlainFormatter(data);
    case 'stylish':
      return applyStylishFormatter(data);
    case 'json':
      return JSON.stringify(data);
    default:
      throw new Error('Not Implemented');
  }
};

export default formatDiff;
