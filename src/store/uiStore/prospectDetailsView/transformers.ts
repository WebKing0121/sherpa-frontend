export const profilesToAgents = (profiles: any) => {
  return profiles.map((profile: any) => ({
    phone: profile.phone || '',
    ...profile.user,
    id: profile.id
  }));
};
