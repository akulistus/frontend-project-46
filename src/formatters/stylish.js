import _ from 'lodash';

const getIndent = (depth) => '    '.repeat(depth);

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return value;
  }
  const keys = Object.keys(value);
  const result = keys.map((key) => `${getIndent(depth + 1)}    ${key}: ${stringify(value[key], depth + 1)}`);
  return `{\n${result.join('\n')}\n${getIndent(depth)}    }`;
};

const applyStylishFormatter = (diffObject) => {
  const iter = (diffContent, depth) => {
    const result = diffContent.map((property) => {
      switch (property.type) {
        case 'added':
          return `${getIndent(depth)}  + ${property.key}: ${stringify(property.value, depth)}`;
        case 'deleted':
          return `${getIndent(depth)}  - ${property.key}: ${stringify(property.value, depth)}`;
        case 'changed':
          return `${getIndent(depth)}  - ${property.key}: ${stringify(property.value1, depth)}\n${getIndent(depth)}  + ${property.key}: ${stringify(property.value2, depth)}`;
        case 'unchanged':
          return `${getIndent(depth)}    ${property.key}: ${stringify(property.value, depth)}`;
        case 'nested':
          return `${getIndent(depth)}    ${property.key}: {\n${iter(property.value, depth + 1).join('\n')}\n${getIndent(depth)}    }`;
        default:
          throw new Error(`Unknown action: \nKey:'${property.key}'\nValue1:'${property.value1}'\nValue2:'${property.value2}'`);
      }
    });
    return result;
  };
  return ['{', ...iter(diffObject, 0), '}'].join('\n');
};

export default applyStylishFormatter;
