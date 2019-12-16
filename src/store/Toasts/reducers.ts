import { ADD_TOAST, DELETE_TOAST, RESET_TOAST_ARRAY } from './actionTypes';

const initialState: any = {
  list: []
};

export default function toasts(state = initialState, action: any) {
  switch (action.type) {
    case ADD_TOAST: {
      const toast = action.toast;
      const newToast = { ...toast, id: new Date().toISOString() };
      return {
        ...state,
        list: [...state.list, newToast]
      };
    }
    case DELETE_TOAST:
      const newList = state.list.filter((toast: any) => toast.id !== action.id);
      return {
        ...state,
        list: newList
      };
    case RESET_TOAST_ARRAY:
      return {
        ...state,
        list: []
      };
    default:
      return state;
  }
}
