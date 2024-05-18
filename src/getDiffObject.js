import _ from 'lodash';

const getDiffObject = (data1, data2) => {
  const props = _.union(_.keys(data1), _.keys(data2));
  const diffObject = _.sortBy(props).map((property) => {
    if (!Object.hasOwn(data2, property)) {
      return {
        type: 'deleted',
        key: property,
        value: data1[property],
      };
    }
    if (!Object.hasOwn(data1, property)) {
      return {
        type: 'added',
        key: property,
        value: data2[property],
      };
    }

    const value1 = data1[property];
    const value2 = data2[property];
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
      type: 'Undefinde action',
      key: property,
      value1,
      value2,
    };
  });

  return diffObject;
};

export default getDiffObject;
