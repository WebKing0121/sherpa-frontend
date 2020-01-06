import { Record } from '../../types';

export interface ILatestMessageReceived {
  prospect: number;
  message: string;
  fromNumber: string;
  dt: string;
  fromProspect: boolean;
};

export interface IRep {
  id: number | null;
};

export interface ISmsRelayMap {
  rep: IRep;
};

export interface IResourceStore {
  next: string | null;
  previous: string | null;
  isLoading: boolean;
  error: boolean;
  errorMessage?: string;
}

export interface IProspect {
  agent: number | null;
  campaigns?: Array<any>;
  doNotCall: boolean;
  emailedToPodio: boolean;
  firstName: string;
  hasUnreadSms: boolean;
  id: number;
  isPriority: boolean;
  isQualifiedLead: boolean;
  lastName: string;
  latestMessageReceived: ILatestMessageReceived | null;
  leadStage: number | null;
  name: string;
  ownerVerifiedStatus: string;
  phoneDisplay: string | null;
  phoneFormattedDisplay: string | null;
  phoneRaw: string | null;
  phoneType: string;
  propertyAddress: string | null;
  propertyCity: string | null;
  propertyState: string | null;
  propertyZip: string | null;
  pushedToZapier: boolean;
  reminderDateLocal: string | null;
  reminderDateUtc: string | null;
  sherpaPhoneNumber: string | null;
  smsRelayMap?: ISmsRelayMap;
  wrongNumber: boolean;
  zillowLink: string | null;
};

const Prospect: IProspect = {
  agent: -1,
  doNotCall: false,
  emailedToPodio: false,
  firstName: "",
  hasUnreadSms: false,
  id: 0,
  isPriority: false,
  isQualifiedLead: false,
  lastName: "",
  latestMessageReceived: null,
  leadStage: null,
  name: "",
  ownerVerifiedStatus: "",
  phoneDisplay: "",
  phoneFormattedDisplay: "",
  phoneRaw: "",
  phoneType: "",
  propertyAddress: "",
  propertyCity: "",
  propertyState: "",
  propertyZip: "",
  pushedToZapier: false,
  reminderDateLocal: null,
  reminderDateUtc: null,
  sherpaPhoneNumber: null,
  smsRelayMap: { rep: { id: -1 } } as ISmsRelayMap,
  wrongNumber: false,
  campaigns: [{}],
  zillowLink: ""
}

// does not include campaigns
export const PartialProspect: IProspect = { ...Prospect }
delete PartialProspect.campaigns;

export interface IProspectStore extends IResourceStore {
  prospects: { [key: number]: IProspect };
}

export const ProspectRecord = Record(Prospect);
export const PartialProspectRecord = Record(PartialProspect);
