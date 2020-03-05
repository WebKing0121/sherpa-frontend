import Axios from '../../axiosConfig';
import { arrayToMapIndex } from '../utils';
import { parsePhoneNumbers } from './transformers';

import {
  fetchPhoneNumbers,
  fetchPhoneNumbersError,
  fetchPhoneNumbersSuccess
} from './actions'

export const getPhoneNumbersList = () => (dispatch: any) => {
  dispatch(fetchPhoneNumbers(true));
  return Axios
    .get('/phone-numbers/')
    .then(({ data }) => {
      dispatch(fetchPhoneNumbers(false));
      dispatch(fetchPhoneNumbersSuccess(
        arrayToMapIndex('id', parsePhoneNumbers(data))
      ));
      return data;
    })
    .catch(_ => {
      dispatch(fetchPhoneNumbersError(true))
    });
};
