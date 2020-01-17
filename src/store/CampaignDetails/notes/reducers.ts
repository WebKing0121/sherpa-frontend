import {
  POPULATE_CAMPAIGN_NOTES,
  SET_CAMPAIGN_NOTE_ERROR,
  SET_CAMPAIGN_NOTES_STATUS,
  ADD_CAMPAIGN_NOTE,
  EDIT_CAMPAIGN_NOTE,
  RESTORE_CAMPAIGN_NOTE,
  DELETE_CAMPAIGN_NOTE
} from './actionTypes';
import { INote, IResults } from './actions';
import { Fetching, Success, FetchError } from '../../../helpers/variables';

interface IAction {
  type: string;
  data?: IResults;
  note?: any;
  id?: number;
  index?: number;
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
    case ADD_CAMPAIGN_NOTE:
      return {
        ...state,
        list: [action.note, ...state.list!],
        status: Success
      };
    case EDIT_CAMPAIGN_NOTE:
      const updatedList = state.list!.map(item => {
        if (item.id === action.note!.id) {
          return { ...action.note!, text: action.note!.text };
        }
        return item;
      });
      return {
        ...state,
        list: updatedList,
        status: Success
      };
    case DELETE_CAMPAIGN_NOTE:
      const filteredList = state.list!.filter(item => item.id !== action.note!.id);
      return {
        ...state,
        list: filteredList,
        status: Success
      };
    case RESTORE_CAMPAIGN_NOTE:
      const newList = [...state.list!];
      newList.splice(action.index!, 0, action.note!);
      return {
        ...state,
        list: newList,
        status: Success
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
