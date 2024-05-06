const TYPE = {
  ADDED: 'added',
  DELETED: 'deleted',
  CHANGED: 'changed',
  UNCHANGED: 'unchanged',
  NESTED: 'nested',
};

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
  const iter = (Object, parentProperty = '') => {
    const result = Object
      .filter((property) => property.type !== TYPE.UNCHANGED)
      .map((property) => {
        const key = [parentProperty, property.key].filter((item) => item !== '').join('.');
        switch (property.type) {
          case TYPE.ADDED:
            return `Property '${key}' was added with value: ${stringify(property.newValue)}`;
          case TYPE.DELETED:
            return `Property '${key}' was removed`;
          case TYPE.CHANGED:
            return `Property '${key}' was updated. From ${stringify(property.oldValue)} to ${stringify(property.newValue)}`;
          case TYPE.NESTED:
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
