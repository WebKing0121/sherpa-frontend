import { getIn, identity } from "./utils";

export const createAction = (type, payloadKey = 'payload') => {
  const action = (payload) => ({
    type,
    [payloadKey]: payload
  });

  action.toString = () => type;

  return action;
};

export const createSelector =
  (path, transformationFn = identity) =>
    state => transformationFn(getIn(path, state));

export const createSelectorContext =
  (root) =>
    (path, transformationFn) =>
      createSelector([...root, path], transformationFn)
