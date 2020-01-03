import {
  POPULATE_PROSPECT_MESSAGES,
  SET_PROSPECT_MESSAGES_ERROR,
  SET_PROSPECT_MESSAGES_STATUS
} from './actionTypes';
import axiosInstance, { delayedRequest } from '../../../axiosConfig';
import { Dispatch } from 'redux';
import { Fetching, fastSpinner, generalNetworkError } from '../../../variables';
import { addNewToast } from '../../Toasts/actions';

export interface IMessage {
  prospect: number;
  message: string;
  fromNumber: string;
  dt: string;
  fromProspect: boolean;
}

export interface IResults {
  count: number;
  next: null;
  previous: null;
  results?: IMessage[];
}

export const populateProspectMessages = (data: IMessage[]) => ({
  type: POPULATE_PROSPECT_MESSAGES,
  data
});

export const setProspectMessagesError = (error: any) => ({
  type: SET_PROSPECT_MESSAGES_ERROR,
  error
});

export const setProspectMessagesStatus = (status: string) => ({
  type: SET_PROSPECT_MESSAGES_STATUS,
  status
});

const handleError = (message: string, error: string, dispatch: any) => {
  console.log(message, error);
  dispatch(addNewToast({ message: generalNetworkError, color: 'danger' }));
  dispatch(setProspectMessagesError(error));
};

export const fetchProspectMessages = (id: number) => (dispatch: Dispatch) => {
  dispatch(setProspectMessagesStatus(Fetching));
  delayedRequest(axiosInstance.get(`/prospects/${id}/messages/`), fastSpinner)
    .then(({ data }: any) => dispatch(populateProspectMessages(data)))
    .catch((error: any) => handleError(`prospects messages GET error `, error, dispatch));
};

//   export const updateProspectNotes = (
//     config: IAxiosConfig,
//     successMsg: string,
//     successAction?: Function,
//     failAction?: Function
//   ) => (dispatch: any) => {
//     //if adding note, set note status to "Fetching"
//     successAction === addProspectNote && dispatch(setProspectNotesStatus(Fetching));
//     const fetchConfig = { ...config, url: `/prospect-notes${config.url}` };
//     return delayedRequest(AxiosInstance(fetchConfig), fastSpinner)
//       .then(({ data }: any) => {
//         successAction && dispatch(successAction(data));
//         dispatch(addNewToast({ message: successMsg }));
//       })
//       .catch((error: any) => {
//         failAction && dispatch(failAction);
//         handleError(`prospects-notes ${config.method} error `, error, dispatch);
//       });
//   };
