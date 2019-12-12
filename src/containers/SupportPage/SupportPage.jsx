import React, { useEffect } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import { useSelector, useDispatch } from "react-redux";
import SupportCard from "./SupportCard";
import { supportItemsArray } from "../../store/Support/selectors";
import { fetchSupportItems } from "../../store/Support/actions";

const CardContainer = styled.div`
  width: 90vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
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
      <h3 className="text-center mb-4 mt-5">How can we help?</h3>
      <p className="text-center" style={{ maxWidth: "90vw", margin: "0 auto" }}>
        We are dedicated to helping you succeed. Browse some of our support resources below.
      </p>
      <CardContainer>
        {support_items.map((item, idx) => {
          return <SupportCard key={idx} item={item} />;
        })}
      </CardContainer>
    </>
  );
}

export default SupportPage;
