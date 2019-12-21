export const owners = (state) => state.filters.owners;
export const companyId = (state) => {
  let { auth: { userData: { company: { id } } } } = state;

  return id;
};
