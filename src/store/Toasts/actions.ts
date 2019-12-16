import { ADD_TOAST, DELETE_TOAST, RESET_TOAST_ARRAY } from './actionTypes';

export const addNewToast = (toast: any) => ({
  type: ADD_TOAST,
  toast
});

export const removeAToast = (id: any) => ({
  type: DELETE_TOAST,
  id
});

export const emptyToastArray = () => ({
  type: RESET_TOAST_ARRAY
});
