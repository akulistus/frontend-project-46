const TYPE = {
  ADDED: 'added',
  DELETED: 'deleted',
  CHANGED: 'changed',
  UNCHANGED: 'unchanged',
  NESTED: 'nested',
};

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
  const iter = (Object, depth) => {
    const result = Object.map((property) => {
      switch (property.type) {
        case TYPE.ADDED:
          return stringify(property.key, property.newValue, '  + ', depth);
        case TYPE.DELETED:
          return stringify(property.key, property.oldValue, '  - ', depth);
        case TYPE.CHANGED:
          return `${stringify(property.key, property.oldValue, '  - ', depth)}\n${stringify(property.key, property.newValue, '  + ', depth)}`;
        case TYPE.UNCHANGED:
          return stringify(property.key, property.oldValue, '    ', depth);
        case TYPE.NESTED:
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
