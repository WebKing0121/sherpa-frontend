import AxiosInstance from "../../axiosConfig";
import { SET_FETCH_SUPPORT_ITEMS, SET_FETCH_SUPPORT_ITEMS_ERROR } from "./actionTypes";

export interface ISupportItems {
  id: number;
  title: string;
  description: string;
  icon: string;
  url: string;
}

export const setFetchedSupportItems = (items: ISupportItems[]) => ({
  type: SET_FETCH_SUPPORT_ITEMS,
  items
});

export const setFetchedSupportItemsError = (error: string) => ({
  type: SET_FETCH_SUPPORT_ITEMS_ERROR,
  error
});

export const fetchSupportItems = () => (dispatch: any) => {
  AxiosInstance.get("/support-links/")
    .then(({ data }) => {
      dispatch(setFetchedSupportItems(data.results));
    })
    .catch(error => {
      console.log("error support", error.response);
      dispatch(setFetchedSupportItemsError("Error when fetching support"));
    });
};
