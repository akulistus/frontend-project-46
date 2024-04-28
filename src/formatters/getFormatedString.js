const TYPE = {
  ADDED: 'added',
  DELETED: 'deleted',
  CHANGED: 'changed',
  UNCHANGED: 'unchanged',
};

const getFormatedString = (diffObject) => {
  const result = diffObject.map((property) => {
    switch (property.type) {
      case TYPE.ADDED:
        return `  + ${property.key}: ${property.newValue}`;
      case TYPE.DELETED:
        return `  - ${property.key}: ${property.oldValue}`;
      case TYPE.CHANGED:
        return `  - ${property.key}: ${property.oldValue}\n  + ${property.key}: ${property.newValue}`;
      case TYPE.UNCHANGED:
        return `    ${property.key}: ${property.oldValue}`;
    }
  });

  return ['{', ...result, '}'].join('\n');
};

export default getFormatedString;
