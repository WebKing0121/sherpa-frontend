import AxiosInstance from '../../axiosConfig';
import {
  SET_FETCH_CAMPAIGNS_BATCH_PROSPECTS,
  SET_FETCH_CAMPAIGNS_BATCH_PROSPECTS_ERROR,
  FETCH_CAMPAIGNS_BATCH_PROSPECTS
} from './actionTypes';
import { Fetching } from '../../helpers/variables';

export const setFetchedCampaignsBatchPropsectsStatus = status => ({
  type: FETCH_CAMPAIGNS_BATCH_PROSPECTS,
  status
});

export const setFetchedCampaignsBatchProspects = data => ({
  type: SET_FETCH_CAMPAIGNS_BATCH_PROSPECTS,
  data
});

export const setFetchedCampaignsError = error => ({
  type: SET_FETCH_CAMPAIGNS_BATCH_PROSPECTS_ERROR,
  error
});

export const fetchCampaignsBatchProspects = id => (dispatch, _) => {
  dispatch(setFetchedCampaignsBatchPropsectsStatus(Fetching));

  AxiosInstance.get(`/campaigns/${id}/batch_prospects/`)
    .then(({ data }) => {
      const { results } = data;

      dispatch(setFetchedCampaignsBatchProspects(results));
    })
    .catch(error => {
      console.log('error campaigns', error.response);
      dispatch(setFetchedCampaignsError('Error when fetching campaigns batch propects'));
    });
};

export const sendInitialSmsMessage = data => (dispatch, _) => {

  const { id, phoneRaw, smsStatus, hasUnreadSms, campaign, prospect } = data;

  const postDataCampaign = {
    name: campaign.name,
    company: campaign.company,
    market: campaign.market,
    createdBy: campaign.createdBy,
    smsTemplateId: campaign.smsTemplate
  }

  const postDataProspect = {
    smsRelayMap: prospect.smsRelayMap
  }

  const postData = {
    campaigns: postDataCampaign,
    prospect: postDataProspect,
    smsTemplateId: campaign.smsTemplate,
    phoneRaw,
    smsStatus,
    hasUnreadSms,
  }

  AxiosInstance.post(`/campaign-prospects/${id}/batch_send/`, postData)
    .then((data) => {
      console.log('data sms sent: ', data);
    })
    .catch(error => {
      console.log('error sending sms: ', error.response);
    });
}
