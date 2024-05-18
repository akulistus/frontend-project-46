import _ from 'lodash';

const getDiffObject = (content1, content2) => {
  const props = _.union(_.keys(content1), _.keys(content2));
  const diffObject = _.sortBy(props).map((property) => {
    if (!Object.hasOwn(content2, property)) {
      return {
        type: 'deleted',
        key: property,
        value: content1[property],
      };
    }
    if (!Object.hasOwn(content1, property)) {
      return {
        type: 'added',
        key: property,
        value: content2[property],
      };
    }

    const value1 = content1[property];
    const value2 = content2[property];
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return {
        type: 'nested',
        key: property,
        value: getDiffObject(value1, value2),
      };
    }
    if (_.isEqual(value1, value2)) {
      return {
        type: 'unchanged',
        key: property,
        value: value1,
      };
    }
    if (!_.isEqual(value1, value2)) {
      return {
        type: 'changed',
        key: property,
        value1,
        value2,
      };
    }

    return {
      type: 'undefinde action',
      key: property,
      oldValue,
      newValue,
    };
  });

  return diffObject;
};

export default getDiffObject;
