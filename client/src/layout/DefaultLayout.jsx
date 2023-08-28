import React from "react";
import { styled } from "styled-components";
import { Header } from "../components/Header";

export const DefaultLayout = ({ children }) => {
  return (
    <LayoutContainer>
      <LayoutWrapper>
        <Header />
        <main>{children}</main>
      </LayoutWrapper>
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const LayoutWrapper = styled.div`
  width: 100%;
  max-width: 980px;
`;
