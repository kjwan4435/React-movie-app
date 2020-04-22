import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

const Container = styled.div`
  height: 50vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

export default () => (
  <Container>
    <Helmet>
      <title> Loading... </title>
    </Helmet>
    <span role="img" aria-label="Loading">
      <i className="fas fa-spinner fa-spin"></i>
    </span>
  </Container>
);
