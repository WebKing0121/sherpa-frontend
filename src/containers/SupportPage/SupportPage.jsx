import React, { useEffect } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import { useSelector, useDispatch } from "react-redux";
import SupportCard from "./SupportCard";
import { supportItemsArray } from "../../store/Support/selectors";
import { fetchSupportItems } from "../../store/Support/actions";

const CardContainer = styled.div`
  margin: var(--pad5) auto 0;
  display: flex;
  flex-direction: column;
`;

const SupportWrap = styled.div`
  padding: var(--pad5) var(--pad3);
  text-align: center;
  background: var(--coolGray);
`;
const Subtitle = styled.p`
  text-align: center;
  max-width: 90%;
  margin: 0 auto;
  line-height: 1.4 !important;
`;
function SupportPage() {
  const support_items = useSelector(supportItemsArray);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSupportItems());
  }, [dispatch]);

  return (
    <>
      <Header>Support</Header>
      <SupportWrap>
        <h2>How can we help?</h2>
        <Subtitle className="textL">
          We are dedicated to helping you succeed. Browse some of our support resources below.
        </Subtitle>
        <CardContainer>
          {support_items.map((item, idx) => {
            return <SupportCard key={idx} item={item} />;
          })}
        </CardContainer>
      </SupportWrap>
    </>
  );
}

export default SupportPage;