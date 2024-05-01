const TYPE = {
  ADDED: 'added',
  DELETED: 'deleted',
  CHANGED: 'changed',
  UNCHANGED: 'unchanged',
  NESTED: 'nested',
};

const getIndent = (depth) => {
  return '    '.repeat(depth);
};

const stringify = (key, value, symbol, depth) => {
  if (typeof value !== 'object' || value === null) {
    return `${getIndent(depth)}${symbol}${key}: ${value}`;
  } else {
    const keys = Object.keys(value);
    const result = keys.map((key) => {
      return stringify(key, value[key], '    ', depth + 1);
    })

    return `${getIndent(depth)}${symbol}${key}: {\n${result.join('\n')}\n${getIndent(depth)}    }`
  }
}

const applyStylishFormatter = (diffObject) => {
  const iter = (diffObject, depth) => {
    const result = diffObject.map((property) => {
      switch (property.type) {
        case TYPE.ADDED:
          return stringify(property.key, property.newValue, '  + ', depth);
        case TYPE.DELETED:
          return stringify(property.key, property.oldValue, '  - ', depth);
        case TYPE.CHANGED:
          return `${stringify(property.key, property.oldValue, '  - ', depth)}\n${stringify(property.key, property.newValue, '  + ', depth)}`;
        case TYPE.UNCHANGED:
          return stringify(property.key, property.oldValue, '    ', depth);;
        case TYPE.NESTED:
          return `${iter(property.value, depth + 1).join('\n')}`;
        default:
          throw new Error('Not Implemented');
      }
    });
    return result;
  };
  return ['{', ...iter(diffObject, 0), '}'].join('\n');
};

export default applyStylishFormatter;
