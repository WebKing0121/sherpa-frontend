// Temporary function that creates the ALL folder that's going to be
// removed once the folder-endpoint works properly

export const createMarketsFolders = (data) => {

  const results = data.filter(x => x.campaignCount > 0);

  return results;
}
