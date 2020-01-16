import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SelectTemplate from './SelectTemplate';
import ReviewSend from './ReviewSend';

import { fetchSmsTemplates } from '../../../store/SmsTemplateStore/actions';
import { smsTemplates } from '../../../store/SmsTemplateStore/selectors';

import { updateSmsTemplate } from '../../../store/Campaigns/actions';

import { fetchCampaignsBatchProspects } from '../../../store/CampaignsBatchProspectsStore/actions';

import CollapsablePane from '../../../components/CollapsablePane';

const SendTab = ({ campaign }) => {
  const dispatch = useDispatch();
  const sms_Templates = useSelector(smsTemplates);
  const [message, setMessage] = useState('');

  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);

  const toggle1 = () => setIsOpen1(!isOpen1);
  const toggle2 = () => setIsOpen2(!isOpen2);

  useEffect(() => {
    // fetch all sms templates belonging to the company
    dispatch(fetchSmsTemplates());

    // fetch all campaign prospects that need an sms sent to
    if (campaign.id) {
      dispatch(fetchCampaignsBatchProspects(campaign.id));
    }
  }, [dispatch]);

  useEffect(() => {
    sms_Templates.filter(x => x.id === campaign.smsTemplates);
  })

  const handleChange = e => {
    const chosenTemplate = e.target.value;
    const templateMessage = sms_Templates.filter(x => x.id === parseInt(chosenTemplate));

    let updatedCampaignTemplate = campaign;
    updatedCampaignTemplate.smsTemplate = templateMessage[0].id;

    dispatch(updateSmsTemplate(updatedCampaignTemplate));
    setMessage(templateMessage[0].message);
  }

  return (
    <>
      <CollapsablePane toggle={toggle1} isOpen={isOpen1} header='Select SMS Template'>
        <SelectTemplate
          templateChoices={sms_Templates}
          templateId={campaign.smsTemplates && '0'}
          smsMsg={message}
          choseTemplate={handleChange}
        />
      </CollapsablePane>
      <CollapsablePane toggle={toggle2} isOpen={isOpen2} header='Review & Send'>
        <ReviewSend />
      </CollapsablePane>
    </>
  );
};

export default SendTab;
