import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/navbar/Navbar";
import btn1 from "../utils/img/방문_icon@2x.png";
import btn2 from "../utils/img/방문이력_icon@2x.png";
import btn3 from "../utils/img/icon-QR.png";
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

        <StMainMenu>
          <StMainMenu2 onClick={moveToMyPage} color="#57D4D4;">
            <StMainDiv>내 방문 이력 보기</StMainDiv>
            <StMainImg src={btn2} alt="내 방문 이력 보기"></StMainImg>
          </StMainMenu2>
          <StMainMenu2 color="#3DB7B7">
            <StQrBtn onClick={handleGenerateQrCode}>QR 코드 발급</StQrBtn>
            <StMainImg src={btn3} alt="QR발급하기"></StMainImg>
          </StMainMenu2>
        </StMainMenu>
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
  justify-content: center;
  align-items: center;
  height: 94vh;
`;

const StMainMenu = styled.div`
  background-color: ${(props) => props.color || "blue"};
  width: 60vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const StMainMenu2 = styled.div`
  background-color: ${(props) => props.color || "blue"};
  width: 60vh;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StMainDiv = styled.div`
  color: white;
  font-size: 32px;

  font-weight: 700;
`;

const StMainImg = styled.img`
  margin-top: 25px;
`;

const StQrBtn = styled.button`
  color: white;
  font-size: 32px;
  font-weight: 700;
  background-color: transparent;
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
