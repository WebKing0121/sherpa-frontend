import {
  POPULATE_PROSPECT_MESSAGES,
  SET_PROSPECT_MESSAGES_ERROR,
  SET_PROSPECT_MESSAGES_STATUS
} from './actionTypes';
import { IMessage } from './actions';
import { Fetching, Success, FetchError } from '../../../variables';

interface IAction {
  type: string;
  data?: IMessage[];
  note?: any;
  id?: number;
  index?: number;
  error?: string;
  status?: string;
}

export interface IState {
  error?: string;
  list?: IMessage[];
  status?: string;
}

const initialState: IState = {
  error: '',
  list: [],
  status: Fetching
};

export default function(state = initialState, action: IAction) {
  switch (action.type) {
    case SET_PROSPECT_MESSAGES_STATUS:
      return {
        ...state,
        status: action.status
      };
    case POPULATE_PROSPECT_MESSAGES:
      return {
        ...state,
        list: [...action.data!],
        status: Success
      };
    case SET_PROSPECT_MESSAGES_ERROR:
      return {
        ...state,
        error: action.error,
        status: FetchError
      };
    default:
      return state;
  }
}
