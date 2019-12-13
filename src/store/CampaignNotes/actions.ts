import {
  POPULATE_CAMPAIGN_NOTES,
  SET_CAMPAIGN_NOTE_ERROR,
  SET_CAMPAIGN_NOTES_STATUS
} from './actionTypes';
import AxiosInstance from '../../axiosConfig';
import { Dispatch } from 'redux';

export interface INote {
  id?: number;
  createdDate?: string;
  text: string;
  campaign: number;
  createdBy: number;
}

export interface IResults {
  count: number;
  next: null;
  previous: null;
  results?: INote[];
}

export const populateCampaignNotes = (data: IResults) => ({
  type: POPULATE_CAMPAIGN_NOTES,
  data
});

export const setCampaignNotesError = (error: string) => ({
  type: SET_CAMPAIGN_NOTE_ERROR,
  error
});

export const setCampaignNotesStatus = (status: string) => ({
  type: SET_CAMPAIGN_NOTES_STATUS,
  status
});

export interface IAxiosConfig {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  url: string;
  data?: INote;
}

const handleError = (message: string, error: any, dispatch: any) => {
  console.log(message, error);
  dispatch(setCampaignNotesError(error));
};

export const fetchCampaignNotes = (id: number) => (dispatch: Dispatch) => {
  const params = { expand: 'created_by', campaign: id };
  dispatch(setCampaignNotesStatus('Fetching'));
  AxiosInstance.get('/campaign-notes', { params })
    .then(({ data }) => dispatch(populateCampaignNotes(data)))
    .catch(error => handleError(`campaign-notes GET error `, error, dispatch));
};

export const updateCampaignNotes = (config: IAxiosConfig, id: number) => (dispatch: any) => {
  const fetchConfig = { ...config, url: `/campaign-notes${config.url}` };
  AxiosInstance(fetchConfig)
    .then(() => dispatch(fetchCampaignNotes(id)))
    .catch(error => handleError(`campaign-notes ${config.method} error `, error, dispatch));
};
