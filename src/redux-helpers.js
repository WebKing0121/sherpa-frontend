export const createAction = (type, payloadKey = 'payload') => {
  const action = (payload) => ({
    type,
    [payloadKey]: payload
  });

  action.toString = () => type;

  return action;
};
