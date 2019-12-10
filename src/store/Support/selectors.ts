import { ISupportState } from "./reducers";

interface IState {
  supportItems: ISupportState;
}

export const supportItemsArray = ({ supportItems }: IState) => supportItems.items;

export const supportItemsError = ({ supportItems }: IState) => supportItems.error;
