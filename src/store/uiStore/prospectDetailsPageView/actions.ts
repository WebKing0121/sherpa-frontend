import { createAction } from '../../../redux-helpers';
import {
  SET_ACTIVE_TAB,
  RESET_ACTIVE_TAB
} from './actionTypes';

export const setActiveTab = createAction(SET_ACTIVE_TAB);
export const resetActiveTab = createAction(RESET_ACTIVE_TAB);
