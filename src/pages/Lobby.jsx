import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/navbar/Navbar";
import btn1 from "../utils/img/방문_icon.png";
import btn2 from "../utils/img/퇴장_icon.png";
import btn3 from "../utils/img/icon_QR (1).png";
import LobbyCheckInModal from "../components/modal/LobbyCheckInModal";
import LobbyCheckOutModal from "../components/modal/LobbyCheckOutModal";
import QrReaderRebuilding from "../components/modal/QrReaderRebuilding";
import QrReaderRebuilding2 from "../components/modal/QrReaderRebuilding2";

const Lobby = () => {
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [showCheckOutModal, setShowCheckOutModal] = useState(false);
  const [showQrModalCheckIn, setShowQrModalCheckIn] = useState(false);
  const [showQrModalCheckOut, setShowQrModalCheckOut] = useState(false);

  return (
    <>
      <Navbar />
      <StMain>
        {/* check-in */}
        <StMainMenu
          onClick={() => {
            setShowCheckInModal(!showCheckInModal);
          }}
          color="#829cf6;"
        >
          <StMainDiv>Check-in</StMainDiv>
          <StMainImg src={btn1} alt="Check-in"></StMainImg>
        </StMainMenu>

        {/* check-out */}
        <StMainMenu
          onClick={() => {
            setShowCheckOutModal(!showCheckOutModal);
          }}
          color="#57D4D4;"
        >
          <StMainDiv>Check-out</StMainDiv>
          <StMainImg src={btn2} alt="Check-out"></StMainImg>
        </StMainMenu>

        {showCheckInModal === true ? (
          <LobbyCheckInModal
            onClose={() => {
              setShowCheckInModal(false);
            }}
          />
        ) : null}
        {showCheckOutModal === true ? (
          <LobbyCheckOutModal
            onClose={() => {
              setShowCheckOutModal(false);
            }}
          />
        ) : null}

        {/* check-in-qr */}
        <StMainMenu
          onClick={() => {
            setShowQrModalCheckIn(!showQrModalCheckIn);
          }}
          color="#636FD7;"
        >
          <StMainDiv>QR Check-in</StMainDiv>
          <StMainImg src={btn3} alt="Check-in"></StMainImg>
        </StMainMenu>

        {/* check-out-qr */}
        <StMainMenu
          onClick={() => {
            setShowQrModalCheckOut(!showQrModalCheckOut);
          }}
          color="#3DB7B7;"
        >
          <StMainDiv>QR Check-out</StMainDiv>
          <StMainImg src={btn3} alt="Check-out"></StMainImg>
        </StMainMenu>
        {showQrModalCheckIn === true ? (
          <QrReaderRebuilding
            onClose={() => {
              setShowQrModalCheckIn(false);
            }}
          />
        ) : null}
        {showQrModalCheckOut === true ? (
          <QrReaderRebuilding2
            onClose={() => {
              setShowQrModalCheckOut(false);
            }}
          />
        ) : null}
      </StMain>
    </>
  );
};

export default Lobby;

const StMain = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 92vh;
  margin: 0 auto;
  padding: 0 11vw;

  @media (max-width: 1024px) {
    padding: 0;
  }
`;
const StMainDiv = styled.div`
  color: white;
  font-size: 32px;
  font-weight: 700;
  transition: all 0.2s ease-in-out;
  @media (max-width: 768px) {
    font-size: 28px;
  }
  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const StMainImg = styled.img`
  margin-top: 25px;
  transition: all 0.2s ease-in-out;
  @media (max-width: 768px) {
    margin-top: 20px;
  }

  @media (max-width: 480px) {
    margin-top: 15px;
  }
`;

const StMainMenu = styled.div`
  background-color: ${(props) => props.color || "blue"};
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    ${StMainDiv} {
      transform: scale(1.2);
    }
    ${StMainImg} {
      transform: scale(1.2);
    }
  }
  flex-wrap: wrap;
  width: 32.5vw;
  @media (max-width: 1024px) {
    width: 40vw;
  }
  @media (max-width: 768px) {
    width: 40vw;
  }

  @media (max-width: 480px) {
    width: 100vw;
  }
`;
