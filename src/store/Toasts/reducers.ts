import { ADD_TOAST, DELETE_TOAST } from './actionTypes';

const initialState: any = {
  list: []
};

export default function toasts(state = initialState, action: any) {
  switch (action.type) {
    case ADD_TOAST:
      const newToast = { ...action.toast, id: new Date().toISOString() };
      return {
        ...state,
        list: [...state.list, newToast]
      };
    case DELETE_TOAST:
      const newList = state.list.filter((toast: any) => toast.id !== action.toast.id);
      return {
        ...state,
        list: newList
      };
    default:
      return state;
  }
}
