import {
  POPULATE_PROSPECT_NOTES,
  SET_PROSPECT_NOTE_ERROR,
  SET_PROSPECT_NOTES_STATUS,
  ADD_PROSPECT_NOTE,
  EDIT_PROSPECT_NOTE,
  DELETE_PROSPECT_NOTE,
  RESTORE_PROSPECT_NOTE
} from './actionTypes';
import AxiosInstance, { delayedRequest } from '../../../axiosConfig';
import { Dispatch } from 'redux';
import { Fetching, generalNetworkError, fastSpinner } from '../../../variables';
import { addNewToast } from '../../Toasts/actions';

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

export const restoreProspectNote = (note: INote, index: number) => ({
  type: RESTORE_PROSPECT_NOTE,
  note,
  index
});

export const addProspectNote = (note: INote) => ({
  type: ADD_PROSPECT_NOTE,
  note
});

export const editProspectNote = (note: INote) => ({
  type: EDIT_PROSPECT_NOTE,
  note
});

export const deleteProspectNote = (note: INote) => ({
  type: DELETE_PROSPECT_NOTE,
  note
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

const handleError = (message: string, error: string, dispatch: any) => {
  console.log(message, error);
  dispatch(addNewToast({ message: generalNetworkError, color: 'danger' }));
  dispatch(setProspectNotesError(error));
};

export const fetchProspectNotes = (id: number) => (dispatch: Dispatch) => {
  const params = { expand: 'created_by', prospect: id };
  dispatch(setProspectNotesStatus(Fetching));
  delayedRequest(AxiosInstance.get('/prospect-notes', { params }), fastSpinner)
    .then(({ data }: any) => dispatch(populateProspectNotes(data)))
    .catch((error: any) => handleError(`prospects-notes GET error `, error, dispatch));
};

export const updateProspectNotes = (
  config: IAxiosConfig,
  successMsg: string,
  successAction?: Function,
  failAction?: Function
) => (dispatch: any) => {
  //if adding note, set note status to "Fetching"
  successAction === addProspectNote && dispatch(setProspectNotesStatus(Fetching));
  const fetchConfig = { ...config, url: `/prospect-notes${config.url}` };
  return delayedRequest(AxiosInstance(fetchConfig), fastSpinner)
    .then(({ data }: any) => {
      successAction && dispatch(successAction(data));
      dispatch(addNewToast({ message: successMsg }));
    })
    .catch((error: any) => {
      failAction && dispatch(failAction);
      handleError(`prospects-notes ${config.method} error `, error, dispatch);
    });
};
