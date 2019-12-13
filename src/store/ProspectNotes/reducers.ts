import {
  POPULATE_PROSPECT_NOTES,
  SET_PROSPECT_NOTE_ERROR,
  SET_PROSPECT_NOTES_STATUS
} from './actionTypes';
import { INote, IResults } from './actions';

interface IAction {
  type: string;
  data?: IResults;
  note?: INote;
  id?: number;
  error?: string;
  status?: string;
}

interface IState {
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
  status: 'Fetching'
};

export default function(state = initialState, action: IAction) {
  switch (action.type) {
    case SET_PROSPECT_NOTES_STATUS:
      return {
        ...state,
        status: action.status
      };
    case POPULATE_PROSPECT_NOTES:
      const { results, ...rest } = action.data!;
      return {
        ...rest,
        list: results,
        status: 'Success'
      };
    case SET_PROSPECT_NOTE_ERROR:
      return {
        ...state,
        error: action.error,
        status: 'Error'
      };
    default:
      return state;
  }
}
