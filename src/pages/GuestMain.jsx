import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/navbar/Navbar";
import btn1 from "../utils/img/방문_icon@2x.png";
import btn2 from "../utils/img/방문이력_icon@2x.png";
const GuestMain = () => {
  return (
    <>
      <Navbar />
      <StMain>
        <Link to={"/guest/company"}>
          <StMainMenu color="#829cf6;">
            <StMainDiv>방문 신청하기</StMainDiv>
            <StMainImg src={btn1} alt="방문신청하기"></StMainImg>
          </StMainMenu>
        </Link>
        <Link to={"/guest/mypage"}>
          <StMainMenu color="#57D4D4;">
            <StMainDiv>내 방문 이력 보기</StMainDiv>
            <StMainImg src={btn2} alt="내 방문 이력 보기"></StMainImg>
          </StMainMenu>
        </Link>
      </StMain>
    </>
  );
};

export default GuestMain;

const StMain = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const StMainMenu = styled.div`
  background-color: ${(props) => props.color || "blue"};
  width: 600px;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const StMainDiv = styled.div`
  color: white;
  font-size: 32px;

  font-weight: 700;
`;

const StMainImg = styled.img``;
