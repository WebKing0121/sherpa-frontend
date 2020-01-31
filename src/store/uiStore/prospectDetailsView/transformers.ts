export const profilesToAgents = (profiles: any) => {
  if (profiles) {
    return profiles.map((profile: any) => ({
      phone: profile.phone || '',
      ...profile.user,
      id: profile.id
    }));
  }

  return [];
};
