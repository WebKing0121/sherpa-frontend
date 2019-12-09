import React from 'react';
import styled from 'styled-components';
import TextBtn from '../../../components/TextBtn';
import Icon from '../../../components/Icon';
import zillow from '../../../assets/images/zillow.gif';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;

  .imgSection {
    margin-right: var(--pad3);
    position: relative;
  }

  .Info {
    flex-basis: auto;
    flex-grow: 1;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

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

const ImgHolster = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: var(--pad2);
  padding: 0;
  background: white;
  top: 0;
  left: 0;

  img {
    margin-right: 0;
  }

`;

const ZillowSection = (props) => {

  return (
    <>
    <Wrapper>
      <div className="imgSection">
        <img src="http://placeimg.com/150/150/arch" alt="house"/>
        <ImgHolster>
          <img src={zillow} alt="provided by zillow" width="75"/>
        </ImgHolster>
      </div>

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
        <TextBtn color="sherpaBlue" href="#" className="text-left textM align-center"><Icon name="zillow" margin="mr-2"/>View on Zillow</TextBtn>

      </Info>
    </Wrapper>
    </>
  );
}

export default ZillowSection;
