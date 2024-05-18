const stringify = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  return value;
};

const applyPlainFormatter = (diffObject) => {
  const iter = (diffObject, parentProperty = '') => {
    const result = diffObject
      .filter((property) => property.type !== 'unchanged')
      .map((property) => {
        const key = [parentProperty, property.key].filter((item) => item !== '').join('.');
        switch (property.type) {
          case 'added':
            return `Property '${key}' was added with value: ${stringify(property.value)}`;
          case 'deleted':
            return `Property '${key}' was removed`;
          case 'changed':
            return `Property '${key}' was updated. From ${stringify(property.value1)} to ${stringify(property.value2)}`;
          case 'nested':
            return iter(property.value, key);
          default:
            throw new Error('Not Implemented');
        }
      });
    return result.join('\n');
  };

  return iter(diffObject);
};

export default applyPlainFormatter;
