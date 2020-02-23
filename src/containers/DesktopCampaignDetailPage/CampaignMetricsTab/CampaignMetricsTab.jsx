import React from 'react';
import styled from 'styled-components';
import {
  Col,
  Row,
  Button
} from 'reactstrap';
import IconBg from '../../../components/IconBg';
import { CalloutBlock } from '../../CampaignDetailsPage/SendTab/CalloutSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Wrapper = styled.div`
  --border: 2px solid var(--mediumGray);
  --padding: var(--ypad) var(--xpad);
  --inYpad: var(--pad3);

  padding: var(--padding);

  display: flex;
  flex-direction: column;

  section {
    margin-bottom: var(--ypad);
  }
`;

const Section = styled.div`
  margin-bottom: var(--pad5);

  ul {
    padding: 0;
  }

  .item {
    background: white;
    padding: 1.2rem var(--pad3);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:not(.header):hover {
      background: var(--sherpaBlue);
      color: white !important;
    }

    &.header {
      padding: var(--pad1) var(--pad3);
      background: none;

      span:hover {
        font-weight: 700;
        cursor: pointer;
      }
    }
  }
`;

const StyledList = styled.ul`
  li {
    span {
      text-align: left;
      flex: 0 0 calc(100% / 6);
    }
  }
`;

const SimpleList = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0;
  flex: 1 1 auto;

  li {
    flex: 1 1 auto;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 4px;
  padding: ${props => props.list ? 0 : "var(--pad3)"};
  margin-bottom: ${props => props.list ? "0" : "var(--pad2)"};
  display: flex;
  flex-direction: column;
  height: ${props => props.list ? "100%" : "auto"};
  box-shadow: 0 0 15px -10px #525252;

  .header {
    padding: var(--pad3) var(--pad3);
  }

  .item {
    padding: .8rem var(--pad3);
    border-top: 2px solid var(--lightGray);
    align-items: center;
    justify-content: space-between;
    display: flex;

    .icon {
      flex: 0 1 auto;
      margin-right: .8rem;
    }

    .name {
      flex: 1 0 auto;
      text-align: left;
    }
  }
`;

const DeliveryStatus = props => {
  const Indicator = styled.div`
    background: ${props =>
      props.value < 70 ? "var(--red)" :
      props.value < 90 ? "var(--yellow)" :
      "var(--green)"};
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 4px;
  `;

  return (
    <div className="d-flex align-items-center">
      <Indicator value={props.value}/>
      {props.value}%
    </div>
  );
}

const CampaignSendTab = props => {
  const circleSize = "2rem";
  const iconSize = "sm";

  const downIcon = <FontAwesomeIcon icon="chevron-down" size="xs" className="mr-1"/>
  const addIcon = <FontAwesomeIcon icon="plus-circle" size="xl" color="var(--green)" className="mr-1"/>;
  const downloadIcon = <Button className="p-0" color="link"><FontAwesomeIcon icon="download" className="ml-2" color="var(--sherpaBlue)" style={{fontSize: ".75rem"}} /></Button>;

  return (
    <Wrapper>
      <section>
        <h2 className="fw-bold mb-3">Campaign Metrics</h2>
        <Row>
          <Col>
            <Row>
              <Col xs="12">
                <Card className="text-center">
                  <h2 className="m-0 fw-regular">{addIcon}List Health: <span className="fw-black">GOOD</span></h2>
                </Card>
              </Col>
              <Col xs="6">
                <Card>
                  <CalloutBlock color="yellow" value="4210">SMS Sent</CalloutBlock>
                </Card>
              </Col>
              <Col xs="6">
                <Card>
                  <CalloutBlock color="purple" value="93%">Delivery Rate</CalloutBlock>
                </Card>
              </Col>
              <Col xs="6">
                <Card>
                  <CalloutBlock color="green" value="37%">Response Rate</CalloutBlock>
                </Card>
              </Col>
              <Col xs="6">
                <Card>
                  <CalloutBlock color="green" value="978">Total Responses</CalloutBlock>
                </Card>
              </Col>
              <Col xs="6">
                <Card className="m-0">
                  <CalloutBlock color="sherpaBlue" value="26">New Leads</CalloutBlock>
                </Card>
              </Col>
              <Col xs="6">
                <Card className="m-0">
                  <CalloutBlock color="sherpaBlue" value="3431">Total Prospects</CalloutBlock>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col>
            <Card list>
              <h4 className="header fw-black textXL m-0">Message Stats</h4>
              <SimpleList className="p-0">
                <li className="item textM">
                  <IconBg className="icon" color="yellow" icon="times" faSize={iconSize} width={circleSize} height={circleSize}/>
                  <span className="name">Daily Send Limit</span>
                  <span className="value fw-black textXL">9100</span>
                </li>
                <li className="item textM">
                  <IconBg className="icon" color="yellow" icon="paper-plane" faSize={iconSize} width={circleSize} height={circleSize}/>
                  <span className="name">Sends Available</span>
                  <span className="value fw-black textXL">4831</span>
                </li>
                <li className="item textM">
                  <IconBg className="icon" color="orange" icon="share" faSize={iconSize} width={circleSize} height={circleSize}/>
                  <span className="name">Skipped</span>
                  <span className="value fw-black textXL">0</span>
                </li>
                <li className="item textM">
                  <IconBg className="icon" color="red" icon="phone-slash" faSize={iconSize} width={circleSize} height={circleSize}/>
                  <span className="name">Undeliverable</span>
                  <span className="value fw-black textXL">239</span>
                </li>
                <li className="item textM">
                  <IconBg className="icon" color="red" icon="skull" faSize={iconSize} width={circleSize} height={circleSize}/>
                  <span className="name">Auto Dead Rate</span>
                  <span className="value fw-black textXL">28%</span>
                </li>
                <li className="item textM">
                  <IconBg className="icon" color="red" icon="skull" faSize={iconSize} width={circleSize} height={circleSize}/>
                  <span className="name">Total Auto Dead</span>
                  <span className="value fw-black textXL">53</span>
                </li>
              </SimpleList>

            </Card>
          </Col>
          <Col>
            <Card list>
              <h4 className="header fw-black textXL m-0">Import Stats</h4>
              <SimpleList className="p-0">
                <li className="item textM">
                  <IconBg className="icon" color="green" icon="address-book" faSize={iconSize} width={circleSize} height={circleSize}/>
                  <span className="name">Phone Numbers</span>
                  <span className="value fw-black textXL">10392</span>
                  <span>{downloadIcon}</span>
                </li>
                <li className="item textM">
                  <IconBg className="icon" color="green" icon="mobile-alt" faSize={iconSize} width={circleSize} height={circleSize}/>
                  <span className="name">Mobile</span>
                  <span className="value fw-black textXL">82%</span>
                  <span>{downloadIcon}</span>
                </li>
                <li className="item textM">
                  <IconBg className="icon" color="green" icon="phone" faSize={iconSize} width={circleSize} height={circleSize}/>
                  <span className="name">Landline</span>
                  <span className="value fw-black textXL">9100</span>
                  <span>{downloadIcon}</span>
                </li>
                <li className="item textM">
                  <IconBg className="icon" color="green" icon="question" faSize={iconSize} width={circleSize} height={circleSize}/>
                  <span className="name">Other Phone</span>
                  <span className="value fw-black textXL">4831</span>
                  <span>{downloadIcon}</span>
                </li>
                <li className="item textM">
                  <IconBg className="icon" color="red" icon="gavel" faSize={iconSize} width={circleSize} height={circleSize}/>
                  <span className="name">Litigators Removed</span>
                  <span className="value fw-black textXL">28%</span>
                  <span>{downloadIcon}</span>
                </li>
                <li className="item textM">
                  <IconBg className="icon" color="red" icon="phone-slash" faSize={iconSize} width={circleSize} height={circleSize}/>
                  <span className="name">DNC Skipped</span>
                  <span className="value fw-black textXL">293</span>
                  <span>{downloadIcon}</span>
                </li>
              </SimpleList>
            </Card>
          </Col>
        </Row>
      </section>

      <Section>
        <h2 className="fw-bold mb-3">Batch Stats</h2>
        <StyledList>
          <li className="item header textM mb-1">
            <span>{downIcon} Batch</span>
            <span>{downIcon} Response</span>
            <span>{downIcon} Attempts</span>
            <span>{downIcon} Delivery</span>
            <span>{downIcon} Skipped</span>
            <span>{downIcon} Last Send</span>
          </li>
          <li className="item textM mb-1">
            <span className="fw-black">#401</span>
            <span>23%</span>
            <span>100</span>
            <span><DeliveryStatus value={91}/></span>
            <span>0</span>
            <span className="gray">10/2/19 | 10:34pm</span>
          </li>
          <li className="item textM mb-1">
            <span className="fw-black">#402</span>
            <span>43%</span>
            <span>2</span>
            <span><DeliveryStatus value={99}/></span>
            <span>0</span>
            <span className="gray">10/2/19 | 10:34pm</span>
          </li>
          <li className="item textM mb-1">
            <span className="fw-black">#403</span>
            <span>13%</span>
            <span>100</span>
            <span><DeliveryStatus value={78}/></span>
            <span>0</span>
            <span className="gray">10/2/19 | 10:34pm</span>
          </li>
          <li className="item textM mb-1">
            <span className="fw-black">#404</span>
            <span>73%</span>
            <span>45</span>
            <span><DeliveryStatus value={33}/></span>
            <span>0</span>
            <span className="gray">10/2/19 | 10:34pm</span>
          </li>
          <li className="item textM mb-1">
            <span className="fw-black">#405</span>
            <span>23%</span>
            <span>100</span>
            <span><DeliveryStatus value={45}/></span>
            <span>0</span>
            <span className="gray">10/2/19 | 10:34pm</span>
          </li>
        </StyledList>
      </Section>
    </Wrapper>
  );
};

export default CampaignSendTab;
