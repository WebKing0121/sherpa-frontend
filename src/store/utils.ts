export const arrayToMapIndex = (indexKey: string, array: Array<any>) => {
  return array.reduce(
    (acc: any, elem: any) => {
      acc[elem[indexKey]] = elem;
      return acc;
    },
    {}
  );
}

export const mapIndexToArray = (map: any) => {
  return Object.keys(map).map(key => map[key]);
}
