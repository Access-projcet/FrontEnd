import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/navbar/Navbar";
import btn1 from "../utils/img/방문_icon.png";
import btn2 from "../utils/img/방문이력_icon.png";
import btn3 from "../utils/img/icon_QR (1).png";
import QrCode from "qrcode.react";
import Modal from "../components/modal/Modal";
import { getUserInfoQr } from "../api/api";
import { useQuery } from "react-query";
import CloseIcon from "@mui/icons-material/Close";

const GuestMain = () => {
  const navigate = useNavigate();
  const [qrCodeValue, setQrCodeValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data } = useQuery("userInfoQr", getUserInfoQr);

  const handleGenerateQrCode = () => {
    const makeUserQr = `name=${data.data.name}&phoneNum=${data.data.phoneNum}`;
    setQrCodeValue(makeUserQr);
    setIsModalOpen(true);
  };

  const moveToMapPage = () => {
    navigate("/guest/company");
  };
  const moveToMyPage = () => {
    navigate("/guest/mypage");
  };
  return (
    <>
      <Navbar />
      <StMain>
        <StMainMenu onClick={moveToMapPage} color="#829cf6;">
          <StMainDiv>방문 신청하기</StMainDiv>
          <StMainImg src={btn1} alt="방문신청하기"></StMainImg>
        </StMainMenu>

        <StMainMenuu>
          <StMainMenu2 onClick={moveToMyPage} color="#57D4D4;">
            <StMainDiv>내 방문 이력 보기</StMainDiv>
            <StMainImg src={btn2} alt="내 방문 이력 보기"></StMainImg>
          </StMainMenu2>
          <StMainMenu3 onClick={handleGenerateQrCode} color="#3DB7B7">
            <StMainDiv>QR 코드 발급</StMainDiv>
            <StMainImg src={btn3} alt="QR발급하기"></StMainImg>
          </StMainMenu3>
        </StMainMenuu>
      </StMain>
      {isModalOpen && (
        <Modal
          children={
            <ModalOverlay>
              <ModalWrapper>
                <ModalInner>
                  <Header>QR CODE</Header>
                  <QrCode value={qrCodeValue} />
                  <CloseIcon
                    onClick={() => {
                      setIsModalOpen(false);
                    }}
                    style={{
                      fontSize: "xx-large",
                      color: "#B1B1B1",
                      cursor: "pointer",
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                    }}
                  ></CloseIcon>
                </ModalInner>
              </ModalWrapper>
            </ModalOverlay>
          }
        />
      )}
    </>
  );
};

export default GuestMain;

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

  @media (max-width: 480px) {
    flex-direction: column;
    height: auto;
  }
`;

const StMainDiv = styled.div`
  color: white;
  font-size: 1.8vw;
  font-weight: 700;
  transition: all 0.2s ease-in-out;
  @media (max-width: 768px) {
    font-size: 3vw;
  }
  @media (max-width: 480px) {
    font-size: 22px;
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
  width: 32.5vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    ${StMainDiv} {
      transform: scale(1.2);
    }
    ${StMainImg} {
      transform: scale(1.2);
    }
  }
  @media (max-width: 1024px) {
    width: 40vw;
  }
  @media (max-width: 768px) {
    width: 40vw;
  }
  @media (max-width: 480px) {
    width: 100vw;
    flex: 2;
    height: auto;
    padding: 10vw 0;
  }
`;
const StMainMenuu = styled.div`
  background-color: ${(props) => props.color || "blue"};
  width: 32.5vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const StMainMenu2 = styled.div`
  background-color: ${(props) => props.color || "blue"};
  width: 32.5vw;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover {
    ${StMainDiv} {
      transform: scale(1.2);
    }
    ${StMainImg} {
      transform: scale(1.2);
    }
  }
  @media (max-width: 1024px) {
    width: 40vw;
  }
  @media (max-width: 768px) {
    width: 40vw;
  }
  @media (max-width: 480px) {
    width: 100vw;
    flex: 2;
    height: auto;
    padding: 10vw 0;
  }
`;

// const StQrBtn = styled.button`
//   color: white;
//   font-size: 32px;
//   font-weight: 700;
//   background-color: transparent;
//   transition: all 0.2s ease-in-out;
//   cursor: pointer;
// `;

const StMainMenu3 = styled.div`
  background-color: ${(props) => props.color || "blue"};
  width: 32.5vw;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    ${StMainDiv} {
      transform: scale(1.2);
    }
    ${StMainImg} {
      transform: scale(1.2);
    }
  }
  @media (max-width: 1024px) {
    width: 40vw;
  }
  @media (max-width: 768px) {
    width: 40vw;
  }
  @media (max-width: 480px) {
    width: 100vw;
    flex: 2;
    height: auto;
    padding: 10vw 0;
  }
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
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.125);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 11px;
`;

const ModalInner = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Header = styled.div`
  background: white;
  position: absolute;
  top: 0;
  width: 92%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-size: x-large;
  font-weight: bolder;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 50px 20px;
`;
