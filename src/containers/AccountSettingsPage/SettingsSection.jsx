import React from 'react';
import styled from 'styled-components';

const Section = styled.div`
  margin-bottom: var(--pad5);

  .settingCard {
    background: ${props => props.type === "form" ? "white" : "transparent"};
    padding:
      ${props => props.type === "form" ? "var(--pad3)" : "0"}
      ${props => props.type === "form" ? "var(--pad3)" : "0"};
    border-radius: 4px;
  }

  .form-group {
    margin-bottom: var(--pad3);
  }

  .item {
    background: white;
    padding: var(--pad2) var(--pad3);
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
  }
`;

function SettingSection(props) {
  return (
    <Section type={props.type}>
      {props.header}
      <div className="settingCard">
        {props.children}
      </div>
    </Section>
  );
}

export default SettingSection;
