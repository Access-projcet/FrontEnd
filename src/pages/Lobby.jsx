import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/navbar/Navbar";
import btn1 from "../utils/img/방문_icon@2x.png";
import btn2 from "../utils/img/퇴장_icon@2x.png";
import btn3 from "../utils/img/icon-QR.png";
import LobbyCheckInModal from "../components/modal/LobbyCheckInModal";
import LobbyCheckOutModal from "../components/modal/LobbyCheckOutModal";
import QrReaderModal from "../components/modal/QrReaderModal";
import QrReaderModal2 from "../components/modal/QrReaderModal2";
import Modal from "../components/modal/Modal";

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

        {/* check-out */}
        <StMainMenu
          onClick={() => {
            setShowCheckOutModal(!showCheckOutModal);
          }}
          color="#57D4D4;"
        >
          <StMainDiv>check-out</StMainDiv>
          <StMainImg src={btn2} alt="Check-out"></StMainImg>
        </StMainMenu>

        {/* check-in-qr */}
        <StMainMenu
          onClick={() => {
            setShowQrModalCheckIn(!showQrModalCheckIn);
          }}
          color="#636FD7;"
        >
          <StMainDiv>Qr-Check-in</StMainDiv>
          <StMainImg src={btn3} alt="Check-in"></StMainImg>
        </StMainMenu>
        {showQrModalCheckIn === true ? (
          <Modal
            children={
              <ModalOverlay>
                <ModalWrapper>
                  <QrReaderModal />
                </ModalWrapper>
              </ModalOverlay>
            }
          />
        ) : null}

        {/* check-out-qr */}
        <StMainMenu
          onClick={() => {
            setShowQrModalCheckOut(!showQrModalCheckOut);
          }}
          color="#3DB7B7;"
        >
          <StMainDiv>Qr-Check-out</StMainDiv>
          <StMainImg src={btn3} alt="Check-out"></StMainImg>
        </StMainMenu>
        {showQrModalCheckOut === true ? (
          <Modal
            children={
              <ModalOverlay>
                <ModalWrapper>
                  <QrReaderModal2 />
                </ModalWrapper>
              </ModalOverlay>
            }
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
  height: 94vh;
  margin: 0 auto;
  width: 80%;
`;

const StMainMenu = styled.div`
  background-color: ${(props) => props.color || "blue"};
  width: 60vh;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

const StMainDiv = styled.div`
  color: white;
  font-size: 32px;
  font-weight: 700;
`;

const StMainImg = styled.img`
  margin-top: 25px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  background-color: #f2f2f2;
  width: 500px;
  height: 500px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.125);
  border: 10px dashed #829cf6;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 11px;
`;
