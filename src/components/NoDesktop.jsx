import React from 'react';
import styled from 'styled-components';
import logo from "../assets/images/sherpaLogo.png";

const Message = styled.div`
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  background: var(--sherpaBlueGradient);
  color: var(--white);
  z-index: 999999;

  align-items: center;
  flex-direction: column;
  justify-content: center;
  display: none;

  padding: 2em;
  font-size: calc(28px + .6vw);
  line-height: 1.4;

  .content {
    max-width: 900px;
    position: relative;
  }

  .text {
    font-size: 1.1em;
    font-weight: 700;
  }

  em {
    align-self: flex-start;
    margin-top: 1em;
    font-weight: 400;
    font-size: 1.1em;
    display: inline-block;
    margin-bottom: 4em;
  }

  img {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 250px;
    padding-bottom: 50px;
  }

  h1 {
    font-size: 1.6em;
    margin-bottom: 1.1em;
    text-align: center;
    letter-spacing: 1px;
    font-weight: 900;
  }

  @media (min-width: 768px) {
    display: flex;
  }
`;

function NoDesktop(props) {
  return (
    <Message {...props}>
      <div className="content">
        <h1>Sorry...</h1>
        <div className="text">
        We are currently working on a full desktop version of the new Sherpa. Until then, you will need to be on a mobile device to use this version of Sherpa.
        </div>
        <em>-The Sherpa Team</em>
      </div>
      <img src={logo} alt="sherpa"/>
    </Message>
  );
}

export default NoDesktop;
