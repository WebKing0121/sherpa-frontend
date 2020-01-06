import { ITemplate } from './actions';

interface ISmsTemplates {
  smsTemplates: {
    templates: ITemplate[];
  };
}

export const smsTemplates = ({ smsTemplates }: ISmsTemplates) => smsTemplates.templates;
