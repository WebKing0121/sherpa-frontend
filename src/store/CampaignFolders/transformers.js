// Temporary function that creates the ALL folder that's going to be
// removed once the folder-endpoint works properly

const searchForIdx = (dataToSearch, searchFor, group) => {
  return dataToSearch.findIndex(item => item['id'] === searchFor[group])
}

const groupBy = (allData, indexData, grouping) => {
  return allData.reduce((listOfGrouping, prospect) => {

    // Check if a folder object already exists
    const folderIdx = searchForIdx(listOfGrouping, prospect, grouping);

    // Find the market to associate with the folder
    const marketIdx = searchForIdx(indexData, prospect, grouping);

    if (folderIdx === -1) {
      // Create a new folder object
      let folderObj = {
        id: prospect.market,
        name: marketIdx === -1 ? 'Uncategorized' : indexData[marketIdx].name,
        company: prospect.company,
        isActive: prospect.isArchived,
        hasUnreadSMS: prospect.hasUnreadSms,
        totalCampaigns: 1,
      }
      listOfGrouping.push(folderObj);
    }
    else {
      // Increment the total number of campaigns to an existing folder
      listOfGrouping[folderIdx]['totalCampaigns'] = listOfGrouping[folderIdx]['totalCampaigns'] + 1;
    }
    return listOfGrouping
  }, [])
}

// Returns an array of unique Ids from a set of data
export const chkForMultipleMarkets = (allData) => {

  const distinctList = [...new Set(allData.map(x => x.market))];

  return distinctList;
}

export const createFolders = (campaigns, markets) => {

  const results = groupBy(campaigns, markets, 'market');

  return results;
}
