export const selectKeys = (map, keys) => {
  keys.reduce((acc, key) => {
    if (map.hasOwnProperty(key))
      acc[key] = map[key]
    return acc
  }, {});
};

