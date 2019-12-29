import AxiosInstance from '../../axiosConfig';
import {
  SET_PROSPECT_DATA, SET_PROSPECT_CAMPAIGNS,
  SET_PROSPECT_FETCH_STATUS,
  SET_PROSPECT_SMS_RELAY_MAP,
  SET_PROSPECT_CAMPAIGN_ID,
  SET_PROSPECT_UPDATE_ACTION_STATUS,
  CLEAR_PROSPECT_CAMPAIGN_ID
} from './actionTypes.js';
import { Fetching, Updating, Success } from '../../variables';
import { prospectDetailsData } from './selectors';
import { addNewToast } from '../Toasts/actions';


const setProspectFetchStatus = (status: any) => ({
  type: SET_PROSPECT_FETCH_STATUS,
  status
});

const setProspectUpdateStatus = (prospectStatus: string, status: string, ) => ({
  type: SET_PROSPECT_UPDATE_ACTION_STATUS,
  prospectStatus,
  status
});

const setProspect = (prospect: any) => ({
  type: SET_PROSPECT_DATA,
  prospect
});

const setProspectCampaigns = (prospectCampaigns: any) => ({
  type: SET_PROSPECT_CAMPAIGNS,
  prospectCampaigns
});

export const setProspectActiveCampaign = (prospectCampaignId: number | null) => ({
  type: SET_PROSPECT_CAMPAIGN_ID,
  prospectCampaignId
})

export const clearDefaultCampaign = () => ({
  type: CLEAR_PROSPECT_CAMPAIGN_ID
})

const setProspectSmsRelayMap = (smsRelayMap: any) => ({
  type: SET_PROSPECT_SMS_RELAY_MAP,
  smsRelayMap
});

export const fetchProspect = (id: any) => (dispatch: any, _: any) => {
  dispatch(setProspectFetchStatus(Fetching));

  return AxiosInstance
    .get(`prospects/${id}/?expand=campaigns,sms_relay_map`)
    .then(({ data }) => {
      let prospect = data;
      const campaigns = [
        ...prospect.campaigns
      ];
      const smsRelayMap = prospect.smsRelayMap || { rep: { id: "" } };

      delete prospect.campaigns;
      delete prospect.smsRelayMap;

      dispatch(setProspect(prospect));
      dispatch(setProspectCampaigns(campaigns));
      dispatch(setProspectSmsRelayMap(smsRelayMap));
      if (campaigns.length === 1)
        dispatch(setProspectActiveCampaign(campaigns[0].id));
    })
    .catch(error => console.log('Error fetching prospect detail', error.response));
};

export const updateProspect = async (id: any, data: any, dispatch: any, onSuccess: any = () => null) => {
  return AxiosInstance.patch(`prospects/${id}/`, data)
    .then(({ data }) => {
      onSuccess();
      dispatch(setProspect(data))
    })
    .catch(error => console.log('Error updating prospect detail', error.response));
};

export const updateVerifiedStatus = (id: string, payload: any) => (dispatch: any, _: any) => {
  dispatch(setProspectUpdateStatus('verifiedBtnStatus', Updating));
  const onSuccess = () => dispatch(setProspectUpdateStatus('verifiedBtnStatus', Success));
  return updateProspect(id, payload, dispatch, onSuccess);
};

export const updateDncStatus = (id: string, payload: any) => (dispatch: any, _: any) => {
  dispatch(setProspectUpdateStatus('dncBtnStatus', Updating));
  const onSuccess = () => dispatch(setProspectUpdateStatus('dncBtnStatus', Success));
  return updateProspect(id, payload, dispatch, onSuccess);
};

export const updatePriorityStatus = (id: string, payload: any) => (dispatch: any, _: any) => {
  dispatch(setProspectUpdateStatus('priorityBtnStatus', Updating));
  const onSuccess = () => dispatch(setProspectUpdateStatus('priorityBtnStatus', Success));
  return updateProspect(id, payload, dispatch, onSuccess);
};

export const updateQualifiedStatus = (id: string, payload: any) => (dispatch: any, _: any) => {
  dispatch(setProspectUpdateStatus('qualifiedBtnStatus', Updating));
  const onSuccess = () => dispatch(setProspectUpdateStatus('qualifiedBtnStatus', Success));
  return updateProspect(id, payload, dispatch, onSuccess);
};

export const updateLeadstage = (id: string, payload: any) => (dispatch: any, getState: any) => {
  const prospect = prospectDetailsData(getState());

  // dispatch optimistically
  dispatch(setProspect({ ...prospect, ...payload }));
  return updateProspect(id, payload, dispatch);
};

export const updateProspectAgent = (id: string, payload: any) => (dispatch: any, getState: any) => {
  const prospect = prospectDetailsData(getState());

  // dispatch optimistically
  dispatch(setProspect({ ...prospect, ...payload }));
  return updateProspect(id, payload, dispatch);
};

export const setProspectRelay = (payload: any) => (dispatch: any, _: any) => {
  dispatch(setProspectSmsRelayMap({ rep: { id: payload.rep } }))
  return AxiosInstance
    .post('sms-relay-maps/', payload)
    .then(({ data }) => {
      dispatch(setProspectSmsRelayMap({ rep: { id: data.rep } }));
      console.log('relay data', data);
    })
    .catch(error => console.log('Error updating prospect detail', error.response));
};

export const removeRelay = (id: any, payload: any) => (dispatch: any, _: any) => {
  dispatch(setProspectSmsRelayMap({ rep: { id: "" } }));
  return updateProspect(id, payload, dispatch);
}

export const setProspectReminder = (id: any, data: any) => (dispatch: any, _: any) => {
  return AxiosInstance
    .post(`prospects/${id}/set_reminder/`, data)
    .then(({ data }) => {
      dispatch(setProspect(data))
    })
    .catch(error => console.log('Error updating prospect detail', error.response));
};

// NOTE: Update endpoint after Adam's refactor of these actions
// CRM Actions
export const emailToCrmAction = (id: number) => (dispatch: any) => {
  return AxiosInstance
    .post(`campaign-prospects/${id}/email_to_podio/`)
    .then(() => {
      dispatch(addNewToast({ message: 'Email to CRM Success', color: 'success' }));
    })
    .catch(_ => dispatch(addNewToast({ message: 'Email to CRM Failed', color: 'danger' })));
}

export const pushToZapierAction = (id: number) => (dispatch: any) => {
  return AxiosInstance
    .post(`campaign-prospects/${id}/push_to_zapier/`)
    .then(() => {
      dispatch(addNewToast({ message: 'Push to Zapier Success', color: 'success' }));
    })
    .catch(_ => dispatch(addNewToast({ message: 'Push to Zapier Failed', color: 'danger' })));
}
