export const owners = (state) => state.companyOwners.owners;
export const companyId = (state) => {
  let { auth: { userData: { company: { id } } } } = state;

  return id;
};
