import React from "react";
import styled from "styled-components";
import FooterHeader from "./components/FooterHeader";
import FooterFoot from "./components/FooterFoot";
import FooterMain from "./components/FooterMain";

const Footer = () => {
  return (
    <Wrapper>
      <FooterMain />
      <FooterFoot />
      </Wrapper>
      )
    }

const Wrapper = styled.section`
  padding-top: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ;
 `

 export default Footer