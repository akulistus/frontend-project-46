const getIndent = (depth) => '    '.repeat(depth);

const stringify = (property, value, symbol, depth) => {
  if (typeof value !== 'object' || value === null) {
    return `${getIndent(depth)}${symbol}${property}: ${value}`;
  }
  const keys = Object.keys(value);
  const result = keys.map((key) => stringify(key, value[key], '    ', depth + 1));
  return `${getIndent(depth)}${symbol}${property}: {\n${result.join('\n')}\n${getIndent(depth)}    }`;
};

const applyStylishFormatter = (diffObject) => {
  const iter = (diffObject, depth) => {
    const result = diffObject.map((property) => {
      switch (property.type) {
        case 'added':
          return stringify(property.key, property.value, '  + ', depth);
        case 'deleted':
          return stringify(property.key, property.value, '  - ', depth);
        case 'changed':
          return `${stringify(property.key, property.value1, '  - ', depth)}\n${stringify(property.key, property.value2, '  + ', depth)}`;
        case 'unchanged':
          return stringify(property.key, property.value, '    ', depth);
        case 'nested':
          // fix somehow...
          return `${getIndent(depth)}    ${property.key}: {\n${iter(property.value, depth + 1).join('\n')}\n${getIndent(depth)}    }`;
        default:
          throw new Error('Not Implemented');
      }
    });
    return result;
  };
  return ['{', ...iter(diffObject, 0), '}'].join('\n');
};

export default applyStylishFormatter;
