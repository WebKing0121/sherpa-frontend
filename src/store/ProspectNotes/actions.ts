import { ADD_NOTE, DELETE_NOTE, UPDATE_NOTE, POPULATE_NOTES, SET_ERROR } from "./actionTypes";
import AxiosInstance from "../../axiosConfig";
import { Dispatch } from "redux";

export interface INote {
  id?: number;
  createdDate?: string;
  text: string;
  prospect: number;
  createdBy: number;
}

export interface IResults {
  count: number;
  next: null;
  previous: null;
  results?: INote[];
}

export const populateNotes = (data: IResults) => ({
  type: POPULATE_NOTES,
  data
});

export const addNote = (note: INote) => ({
  type: ADD_NOTE,
  note
});

export const deleteNote = (id: number) => ({
  type: DELETE_NOTE,
  id
});

export const updateNote = (note: string) => ({
  type: UPDATE_NOTE,
  note
});

export const setNotesError = (error: string) => ({
  type: SET_ERROR,
  error
});

export interface IAxiosConfig {
  method: "GET" | "POST" | "PATCH" | "DELETE";
  url: string;
  data?: INote;
}

export const notesRequest = (config: IAxiosConfig, callback: Function, id?: number) => (
  dispatch: Dispatch
) => {
  AxiosInstance(config)
    .then(({ data }) => {
      dispatch(callback(data || id));
    })
    .catch(error => {
      console.log(`prospects-notes ${config.method} error `, error);
      dispatch(setNotesError(error));
    });
};
