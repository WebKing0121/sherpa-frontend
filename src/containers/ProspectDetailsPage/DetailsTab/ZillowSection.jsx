import React from 'react';
import styled from 'styled-components';
import TextBtn from '../../../components/TextBtn';
import Icon from '../../../components/Icon';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;



  img {
    margin-right: var(--pad3);
  }

  .Info {
    flex-basis: auto;
    flex-grow: 1;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .title {
    margin-bottom: .5em;
  }

  .callouts {
    span:not(:last-child) {
      padding-right: var(--pad1);
      margin-right: var(--pad1);
      border-right: 1px solid var(--mediumGray);
    }
  }
`;

const ZillowSection = (props) => {

  return (
    <Wrapper>
      <img src="https://baconmockup.com/140/140" alt="house"/>

      <Info className="Info">
        <p className="title textL fw-bold">2331 Shoshone Rd <br/>Indian Hills, CO 80454</p>
        <p className="callouts textS darkGray">
          <span>3 beds</span>
          <span>2.5 bath</span>
          <span>1,492sqft</span>
        </p>
        <p className="estimate">
          <span className="textS fw-bold blue mr-1">Zestimates<sup>&reg;</sup>:</span>
          <span className="textM fw-bold">$187,987</span>
        </p>
        <TextBtn color="sherpaBlue" href="#" className="text-left textM align-center"><Icon name="zillow" margin="mr-1 mb-1" width="17px"/>View on Zillow</TextBtn>
      </Info>
    </Wrapper>
  );
}

export default ZillowSection;
