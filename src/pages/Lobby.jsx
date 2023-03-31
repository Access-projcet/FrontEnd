import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/navbar/Navbar";
import btn1 from "../utils/img/방문_icon@2x.png";
import btn2 from "../utils/img/퇴장_icon@2x.png";
import LobbyModal from "../components/modal/LobbyModal";

const Lobby = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar />
      <StMain>
        <Link
          onClick={() => {
            setShowModal(!showModal);
          }}
        >
          <StMainMenu color="#829cf6;">
            <StMainDiv>Check-in</StMainDiv>
            <StMainImg src={btn1} alt="Check-in"></StMainImg>
          </StMainMenu>
        </Link>
        {showModal === true ? (
          <LobbyModal
            onClose={() => {
              setShowModal(false);
            }}
          />
        ) : null}
        <Link
          onClick={() => {
            setShowModal(!showModal);
          }}
        >
          <StMainMenu color="#57D4D4;">
            <StMainDiv>check-out</StMainDiv>
            <StMainImg src={btn2} alt="Check-out"></StMainImg>
          </StMainMenu>
        </Link>
      </StMain>
    </>
  );
};

export default Lobby;

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
