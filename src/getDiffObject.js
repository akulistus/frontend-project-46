const getDiffObject = (obj1, obj2) => {
  const objProps1 = new Set(Object.keys(obj1));
  const objProps2 = new Set(Object.keys(obj2));
  const props = new Set([...objProps1, ...objProps2]);
  const diffObject = Array.from(props).map((property) => {
    const oldValue = obj1[property];
    const newValue = obj2[property];
    if (!Object.hasOwn(obj2, property)) {
      return {
        type: 'deleted',
        key: [property],
        oldValue,
      };
    }
    if (!Object.hasOwn(obj1, property)) {
      return {
        type: 'added',
        key: [property],
        newValue,
      };
    }
    if (oldValue === newValue) {
      return {
        type: 'unchanged',
        key: [property],
        oldValue,
      };
    }
    if (oldValue !== newValue) {
      return {
        type: 'changed',
        key: [property],
        oldValue,
        newValue,
      };
    }
  });

  return diffObject;
};

export default getDiffObject;
