import {
  POPULATE_CAMPAIGN_NOTES,
  SET_CAMPAIGN_NOTE_ERROR,
  SET_CAMPAIGN_NOTES_STATUS,
  RESTORE_CAMPAIGN_NOTE,
  ADD_CAMPAIGN_NOTE,
  EDIT_CAMPAIGN_NOTE,
  DELETE_CAMPAIGN_NOTE
} from './actionTypes';
import AxiosInstance from '../../axiosConfig';
import { Dispatch } from 'redux';
import { Fetching, generalNetworkError } from '../../variables';
import { addNewToast } from '../Toasts/actions';

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

export const restoreCampaignNote = (note: INote, index: number) => ({
  type: RESTORE_CAMPAIGN_NOTE,
  note,
  index
});

export const addCampaignNote = (note: INote) => ({
  type: ADD_CAMPAIGN_NOTE,
  note
});

export const editCampaignNote = (note: INote) => ({
  type: EDIT_CAMPAIGN_NOTE,
  note
});

export const deleteCampaignNote = (note: INote) => ({
  type: DELETE_CAMPAIGN_NOTE,
  note
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

const handleError = (message: string, error: string, dispatch: any) => {
  console.log(message, error);
  dispatch(addNewToast({ message: generalNetworkError, color: 'danger' }));
  dispatch(setCampaignNotesError(error));
};

export const fetchCampaignNotes = (id: number) => (dispatch: Dispatch) => {
  const params = { expand: 'created_by', campaign: id };
  dispatch(setCampaignNotesStatus(Fetching));
  AxiosInstance.get('/campaign-notes', { params })
    .then(({ data }) => dispatch(populateCampaignNotes(data)))
    .catch(error => handleError(`campaign-notes GET error `, error, dispatch));
};

export const updateCampaignNotes = (
  config: IAxiosConfig,
  successMsg: string,
  successAction?: Function,
  failAction?: Function
) => (dispatch: any) => {
  const fetchConfig = { ...config, url: `/campaign-notes${config.url}` };
  return AxiosInstance(fetchConfig)
    .then(({ data }) => {
      successAction && dispatch(successAction(data));
      dispatch(addNewToast({ message: successMsg }));
    })
    .catch(error => {
      failAction && dispatch(failAction);
      handleError(`campaign-notes ${config.method} error `, error, dispatch);
    });
};
