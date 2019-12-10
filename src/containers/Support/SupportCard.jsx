import React from "react";
import styled from "styled-components";
import { Card } from "reactstrap";
import Icon from "../../components/Icon";

const StyledCard = styled(Card)`
  &.card {
    box-sizing: border-box;
    padding: 1rem;
    margin: 1rem 0;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    box-shadow: 0 0 5px var(--gray);
    img {
      margin: 0 1rem;
    }
    a {
      color: black;
    }
  }
`;

function SupportCard(props) {
  const { title, description, icon, alt, url } = props.item;

  return (
    <StyledCard name={title} target="_blank" rel="noopener noreferrer">
      <Icon name={icon || "alert"} alt={alt} width="60px" />
      <a target="_blank" rel="noopener noreferrer" href="https://leadsherpa.freshdesk.com/support/home">
        <h3>{title}</h3>
        <div>{description}</div>
      </a>
    </StyledCard>
  );
}

export default SupportCard;
