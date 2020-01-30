import { IState } from './reducers';
import { IResults } from './actions';
import { prospectDetailsReducer } from '../../../helpers/variables';

interface IProspectMessges {
  prospectDetailsReducer: {
    prospectMessages: IState & IResults;
  };
}

const reducer = prospectDetailsReducer;

export const prospectMessagesList = ({ [reducer]: { prospectMessages } }: IProspectMessges) =>
  prospectMessages.list || [];

export const prospectMessgesStatus = ({ [reducer]: { prospectMessages } }: IProspectMessges) =>
  prospectMessages.status;
