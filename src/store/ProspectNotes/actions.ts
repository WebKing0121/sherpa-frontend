import {
  POPULATE_PROSPECT_NOTES,
  SET_PROSPECT_NOTE_ERROR,
  SET_PROSPECT_NOTES_STATUS
} from './actionTypes';
import AxiosInstance from '../../axiosConfig';
import { Dispatch } from 'redux';

export interface INote {
  id?: number;
  createdDate?: string;
  text: string;
  prospect: number;
  createdBy: number;
}

export interface IResults {
  count: number;
  next: null;
  previous: null;
  results?: INote[];
}

export const populateProspectNotes = (data: IResults) => ({
  type: POPULATE_PROSPECT_NOTES,
  data
});

export const setProspectNotesError = (error: string) => ({
  type: SET_PROSPECT_NOTE_ERROR,
  error
});

export const setProspectNotesStatus = (status: string) => ({
  type: SET_PROSPECT_NOTES_STATUS,
  status
});

export interface IAxiosConfig {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  url: string;
  data?: INote;
}

const handleError = (message: string, error: any, dispatch: any) => {
  console.log(message, error);
  dispatch(setProspectNotesError(error));
};

export const fetchProspectNotes = (id: number) => (dispatch: Dispatch) => {
  const params = { expand: 'created_by', prospect: id };
  dispatch(setProspectNotesStatus('Fetching'));
  AxiosInstance.get('/prospect-notes', { params })
    .then(({ data }) => dispatch(populateProspectNotes(data)))
    .catch(error => handleError(`prospects-notes GET error `, error, dispatch));
};

export const updateProspectNotes = (config: IAxiosConfig, id: number) => (dispatch: any) => {
  const fetchConfig = { ...config, url: `/prospect-notes${config.url}` };
  AxiosInstance(fetchConfig)
    .then(() => dispatch(fetchProspectNotes(id)))
    .catch(error => handleError(`prospects-notes ${config.method} error `, error, dispatch));
};
