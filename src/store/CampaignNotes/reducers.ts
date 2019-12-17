import {
  POPULATE_CAMPAIGN_NOTES,
  SET_CAMPAIGN_NOTE_ERROR,
  SET_CAMPAIGN_NOTES_STATUS
} from './actionTypes';
import { INote, IResults } from './actions';
import { Fetching, Success, FetchError } from '../../variables';

interface IAction {
  type: string;
  data?: IResults;
  note?: INote;
  id?: number;
  error?: string;
  status?: string;
}

export interface IState {
  error?: string;
  list?: INote[];
  status?: string;
}

const initialState: IState & IResults = {
  count: 0,
  next: null,
  previous: null,
  error: '',
  list: [],
  status: Fetching
};

export default function(state = initialState, action: IAction) {
  switch (action.type) {
    case SET_CAMPAIGN_NOTES_STATUS:
      return {
        ...state,
        status: action.status
      };
    case POPULATE_CAMPAIGN_NOTES:
      const { results, ...rest } = action.data!;
      return {
        ...rest,
        list: results,
        status: Success
      };
    case SET_CAMPAIGN_NOTE_ERROR:
      return {
        ...state,
        error: action.error,
        status: FetchError
      };
    default:
      return state;
  }
}