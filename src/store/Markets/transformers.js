// Temporary function that creates the ALL folder that's going to be
// removed once the folder-endpoint works properly

export const createMarketsFolders = (data) => {
  const results = data.filter(x => x.campaignCount > 0);
  const marketsWithFormattedNumbers = results.map(market => {
    const callForwardingNumber = market.callForwardingNumber || "";
    const [
      _,
      areaCode = "",
      first = "",
      second = ""
    ] = callForwardingNumber.match(/^(\d{3})(\d{3})(\d{4})/) || []
    return {
      ...market,
      callForwardingNumber: `(${areaCode})-${first}-${second}`
    }
  });

  return marketsWithFormattedNumbers;
}
