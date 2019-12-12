import AxiosInstance from "../../axiosConfig";
import { SET_FETCH_CAMPAIGN_FOLDERS, SET_FETCH_CAMPAIGN_FOLDERS_ERROR, FETCH_CAMPAIGN_FOLDERS } from "./actionTypes";
import { createFolders, chkForMultipleMarkets } from "./transformers";
import { history } from "../../history";
import { saveToLocalStorage } from "./utils";

export const setFetchCampaignFoldersStatus = (status) => ({
  type: FETCH_CAMPAIGN_FOLDERS,
  status
})

export const setFetchedCampaignFolders = campaignFolders => ({
  type: SET_FETCH_CAMPAIGN_FOLDERS,
  campaignFolders
});

export const setFetchedCampaignFoldersError = error => ({
  type: SET_FETCH_CAMPAIGN_FOLDERS_ERROR,
  error
});

export const fetchCampaignFolders = () => (dispatch, _) => {
  // NOTE: Needs to hit the Folder-endpoint in the future
  // For now we will render 1 folder called ALL that will contain all campaigns
  const handleError = (error, message) => {
    console.log("error campaigns", error.response);
    dispatch(setFetchedCampaignFoldersError(message));
  };

  dispatch(setFetchCampaignFoldersStatus('Fetching'));

  AxiosInstance.get("/campaigns/")
    .then(campaigns => {
      AxiosInstance.get("/markets/")
        .then(markets => {
          const {
            data: { results: campaignsData }
          } = campaigns;
          const {
            data: { results: marketsData }
          } = markets;

          const marketIds = chkForMultipleMarkets(campaignsData);

          if (marketIds.length > 1 || (marketIds.length === 0 && campaignsData.length === 0)) {
            const folderView = createFolders(campaignsData, marketsData);
            dispatch(setFetchedCampaignFolders(folderView));
            saveToLocalStorage("folderView", JSON.stringify(folderView));
          } else {
            let id = marketIds[0];
            history.push(`/folder/${id}/campaigns`);
          }
        })
        .catch(error => {
          handleError(error, "Error when fetching markets");
        });
    })
    .catch(error => {
      handleError(error, "Error when fetching campaigns");
    });
};
