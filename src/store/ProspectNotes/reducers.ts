import { ADD_NOTE, UPDATE_NOTE, DELETE_NOTE, POPULATE_NOTES, SET_ERROR } from "./actionTypes";
import { INote, IResults } from "./actions";

interface IAction {
  type: string;
  data?: IResults;
  note?: INote;
  id?: number;
  error?: string;
}

interface IState {
  error?: string;
  list?: INote[];
}

const initialState: IState & IResults = {
  count: 0,
  next: null,
  previous: null,
  error: "",
  list: []
};

export default function(state = initialState, action: IAction) {
  switch (action.type) {
    case POPULATE_NOTES:
      console.log(action);
      const { results, ...rest } = action.data!;
      return {
        ...rest,
        list: results
      };
    case ADD_NOTE:
      return {
        ...state,
        list: [action.note!, ...state.list!]
      };
    case UPDATE_NOTE:
      const updatedList = state.list!.map(item => {
        if (item.id === action.note!.id) {
          return { ...action.note!, text: action.note!.text };
        }
        return item;
      });
      return {
        ...state,
        list: updatedList
      };
    case DELETE_NOTE:
      const filteredList = state.list!.filter(item => item.id !== action.id);
      return {
        ...state,
        list: filteredList
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
}
