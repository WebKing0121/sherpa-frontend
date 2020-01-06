import React, { useState } from 'react';
import SelectTemplate from './SelectTemplate';
import ReviewSend from './ReviewSend';

import CollapsablePane from '../../../components/CollapsablePane';

const SendTab = () => {
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);

  const toggle1 = () => setIsOpen1(!isOpen1);
  const toggle2 = () => setIsOpen2(!isOpen2);

  return (
    <>
      <CollapsablePane toggle={toggle1} isOpen={isOpen1} header='Select SMS Template'>
        <SelectTemplate />
      </CollapsablePane>
      <CollapsablePane toggle={toggle2} isOpen={isOpen2} header='Review & Send'>
        <ReviewSend />
      </CollapsablePane>
    </>
  );
};

export default SendTab;
