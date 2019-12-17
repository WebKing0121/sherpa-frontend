import AxiosInstance from '../../axiosConfig';
import {
  SET_PROSPECT_DATA, SET_PROSPECT_CAMPAIGNS,
  SET_PROSPECT_DETAILS_TAB_LEADSTAGES,
  SET_PROSPECT_DETAILS_TAB_AGENTS,
  SET_PROSPECT_FETCH_STATUS
} from './actionTypes.js';
import { profilesToUsers } from './transformers';


const setProspectFetchStatus = (status: any) => ({
  type: SET_PROSPECT_FETCH_STATUS,
  status
})

const setProspect = (prospect: any) => ({
  type: SET_PROSPECT_DATA,
  prospect
});

const setProspectCampaigns = (prospectCampaigns: any) => ({
  type: SET_PROSPECT_CAMPAIGNS,
  prospectCampaigns
});

const setProspectDetailsTabLeadStages = (leadStages: any) => ({
  type: SET_PROSPECT_DETAILS_TAB_LEADSTAGES,
  leadStages
});

const setProspectDetailsTabAgents = (agents: any) => ({
  type: SET_PROSPECT_DETAILS_TAB_AGENTS,
  agents
});

export const fetchLeadStages = () => (dispatch: any, getState: any) => {
  let { prospectDetails: { prospectDetailsTab: { leadStages = [] } } } = getState();

  // don't refetch leadstages if it's already loaded
  if (leadStages.length === 0) {
    const leadStageNotSelected = {
      leadStageTitle: 'Select a Lead Stage',
      id: ""
    };
    AxiosInstance
      .get('leadstages/')
      .then(response => {
        dispatch(setProspectDetailsTabLeadStages([leadStageNotSelected, ...response.data.results]));

        return response.data
      })
      .catch(error => console.log('Error fetching lead stages', error.response));
  }
}

export const fetchAgents = (id: any) => (dispatch: any, getState: any) => {
  let { prospectDetails: { prospectDetailsTab: { agents = [] } } } = getState();

  // don't refetch agents if already loaded
  if (agents.length === 0) {
    AxiosInstance
      .get(`companies/${id}/`)
      .then(response => {
        dispatch(setProspectDetailsTabAgents(
          profilesToUsers(response.data)
        ));
        return response.data
      })
      .catch(error => console.log('Error fetching agents', error));
  }
}

export const fetchProspect = (id: any) => (dispatch: any, _: any) => {
  dispatch(setProspectFetchStatus("Fetching"));

  return AxiosInstance
    .get(`prospects/${id}/?expand=campaigns,sms_relay_map`)
    .then(({ data }) => {
      let prospect = data;
      let campaigns = prospect.campaigns;
      dispatch(setProspect(prospect));
      dispatch(setProspectCampaigns(campaigns));
    })
    .catch(error => console.log('Error fetching prospect detail', error.response));
}

export const updateProspect = (id: any, data: any) => (dispatch: any, _: any) => {
  return AxiosInstance
    .patch(`prospects/${id}/`, data)
    .then(({ data }) => {
      dispatch(setProspect(data))
    })
    .catch(error => console.log('Error updating prospect detail', error.response));
}

export const setProspectRelay = (payload: any) => (dispatch: any, _: any) => {
  return AxiosInstance
    .post('sms-relay-maps/', payload)
    .then(({ data }) => {
      // dispatch(setProspect(data));
      console.log('relay data', data);
    })
    .catch(error => console.log('Error updating prospect detail', error.response));
}

export const setProspectReminder = (id: any, data: any) => (dispatch: any, _: any) => {
  return AxiosInstance
    .post(`prospects/${id}/set_reminder/`, data)
    .then(({ data }) => {
      dispatch(setProspect(data))
    })
    .catch(error => console.log('Error updating prospect detail', error.response));
}

// export const prospectUpdateOwner

