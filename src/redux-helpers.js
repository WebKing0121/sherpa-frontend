export const createAction = (type, payloadKey = 'payload') => {
  return (payload) => ({
    type,
    [payloadKey]: payload
  });
};
