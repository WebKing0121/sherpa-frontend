import { ADD_TOAST, DELETE_TOAST } from './actionTypes';

export const addNewToast = (toast: any) => ({
  type: ADD_TOAST,
  toast
});

export const removeAToast = (toast: any) => ({
  type: DELETE_TOAST,
  toast
});
