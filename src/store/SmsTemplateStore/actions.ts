import {
  POPULATE_SMS_TEMPLATES,
  SET_SMS_TEMPLATES_STATUS,
  SET_SMS_TEMPLATES_ERROR
} from './actionTypes';
import AxiosInstance, { delayedRequest } from '../../axiosConfig';
import { Fetching, fastSpinner } from '../../helpers/variables';
import { Dispatch } from 'redux';
import { arrayToMapIndex } from '../utils';

export interface ITemplate {
  company: number;
  message: string;
  isActive: boolean;
  templateName: string;
  alternateMessage: string;
}

export const populateSmsTemplates = (templates: ITemplate[]) => ({
  type: POPULATE_SMS_TEMPLATES,
  templates
});

export const setSmsTemplatesStatus = (status: string) => ({
  type: SET_SMS_TEMPLATES_STATUS,
  status
});

export const setSmsTemplatesError = (error: string) => ({
  type: SET_SMS_TEMPLATES_ERROR,
  error
});

const handleError = (message: string, error: string, dispatch: Dispatch) => {
  console.log(message, error);
  dispatch(setSmsTemplatesError(error));
};

export const fetchSmsTemplates = () => (dispatch: Dispatch) => {
  dispatch(setSmsTemplatesStatus(Fetching));

  AxiosInstance.get('/sms-templates/')
    .then(({ data }) => {
      const smsMap = arrayToMapIndex('id', data);
      dispatch(populateSmsTemplates(smsMap));
    })
    .catch((error: any) => handleError(`campaign-notes GET error `, error, dispatch));
};
