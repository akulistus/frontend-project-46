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
  const iter = (diffContent, parentProperty = '') => {
    const result = diffContent
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
          case 'unchanged':
            return undefined;
          default:
            throw new Error(`Unknown action: \nKey:'${property.key}'\nValue1:'${property.value1}'\nValue2:'${property.value2}'`);
        }
      });
    console.log(result);
    return result.filter((item) => item !== undefined).join('\n');
  };

  return iter(diffObject);
};

export default applyPlainFormatter;
