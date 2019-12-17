export const profilesToUsers = (data) => {
  let profiles = data.profiles;
  let timezone = data.timezone;

  return profiles.map(
    (profile) => ({ timezone, phone: profile.phone, ...profile.user, id: profile.id })
  );
}
