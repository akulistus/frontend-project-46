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
      .reduce((acc, property) => {
        const key = [parentProperty, property.key].filter((item) => item !== '').join('.');
        switch (property.type) {
          case 'added':
            acc.push(`Property '${key}' was added with value: ${stringify(property.value)}`);
            break;
          case 'deleted':
            acc.push(`Property '${key}' was removed`);
            break;
          case 'changed':
            acc.push(`Property '${key}' was updated. From ${stringify(property.value1)} to ${stringify(property.value2)}`);
            break;
          case 'nested':
            acc.push(iter(property.value, key));
            break;
          case 'unchanged':
            break;
          default:
            throw new Error(`Unknown action: \nKey:'${property.key}'\nValue1:'${property.value1}'\nValue2:'${property.value2}'`);
        }
        return acc;
      }, []);
    return result.join('\n');
  };

  return iter(diffObject);
};

export default applyPlainFormatter;
