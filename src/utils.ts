// select-keys function and helpers
// the different arities allows for using it with aggregates
// Ex: data = {hello: 1, two: 2, three: 4}
//     selectKeys(['hello', 'three']) which yields {hello: 1, three: 4}
//
// We can use it on aggregates
// Ex2: data2 = [{hello: 1, two: 2, three: 4}, {hello: 10, two: 20, three: 40}]
//      data2.map(selectKeys('two')) which yields [{two: 2}, {two: 20}]

const selectKeysArity2 = (keys: Array<string>, map: { [key: string]: any }) => {
  return keys.reduce((acc: any, key: string) => {
    if (map.hasOwnProperty(key))
      acc[key] = map[key];

    return acc;
  }, {});
};

const selectKeysArity1 = (keys: Array<string>) =>
  (map: { [key: string]: any }) => selectKeysArity2(keys, map)

export const selectKeys = (keys: Array<string>, map?: { [key: string]: any }) => {
  if (map) return selectKeysArity2(keys, map);
  return selectKeysArity1(keys);
};

// get-in function and helpers
// the different arities allows for using it with aggregates
// It returns undefined if nothing is found on it's way.
// Ex:  data = [{hello: {one: { two: 'hello'}}}, {hello: {one: { two: 'bye'}}}]
//      data.map(getIn(['hello', 'one', 'two'])) which yields  ['hello', 'bye']
//
// Ex2: data = {hello: [1,2,3 {four: "booom"}]}
//      getIn(['hello', 3, 'four']) which yields "booom"
const getInArity2 = (path: Array<string | number>, map: Array<any> | { [key: string]: any }) => {
  return path.reduce((acc: any, step: string | number) => {
    if (!acc)
      return undefined;
    return acc[step];
  }, map)
};
const getInArity1 = (path: Array<string | number>) =>
  (map: Array<any> | { [key: string]: any }) => getInArity2(path, map);

export const getIn = (path: Array<string | number>, map?: Array<any> | { [key: string]: any }) => {
  if (map) return getInArity2(path, map);
  return getInArity1(path);
};

// update-in function to update deeply nested structures
export const updateIn = (path: Array<string | number>, changeFn: (x: any, args: any) => any, fnArgs: any, map: Array<any> | { [key: string]: any }) => {
  // Note: This is update in place
  let value = getIn(path, map);
  let newValue = changeFn(value, fnArgs);
  let [lastKey] = path.slice(-1);

  let val: any = path.slice(0, -1).reduce((acc: any, key) => acc[key], map);
  val[lastKey] = newValue;
};

// updateIn = (path, changeFn, fnArgs, map) => {
//   // Note: This is update in place
//   let value = getIn(path, map);
//   let newValue = changeFn(value, fnArgs);
//   let [lastKey] = path.slice(-1);

//   let val = path.slice(0, -1).reduce((acc, key) => acc[key], map);
//   val[lastKey] = newValue;
// }

// getIn = (path, map) => {
//   return path.reduce((acc, step) => {
//     if (!acc)
//       return undefined;
//     return acc[step];
//   }, map)
// }
