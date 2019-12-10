import axios from "axios";
import AxiosInstance from "../../axiosConfig";
import { SET_FETCH_CAMPAIGN_FOLDERS, SET_FETCH_CAMPAIGN_FOLDERS_ERROR } from "./actionTypes";
import { createFolders, chkForMultipleMarkets } from "./transformers";
import { history } from "../../history";

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

  AxiosInstance.get("/campaigns/")
    .then(campaigns => {
      AxiosInstance.get("/markets/")
        .then(markets => {
          const {
            data: { results: campsData }
          } = campaigns;
          const {
            data: { results: marksData }
          } = markets;
          const marketIds = chkForMultipleMarkets(campsData);
          if (marketIds.length > 1) {
            dispatch(setFetchedCampaignFolders(createFolders(campsData, marksData)));
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
