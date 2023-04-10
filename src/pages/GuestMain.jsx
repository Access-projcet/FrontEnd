import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/navbar/Navbar";
import btn1 from "../utils/img/방문_icon@2x.png";
import btn2 from "../utils/img/방문이력_icon@2x.png";
import QrCode from "qrcode.react";
import Modal from "../components/modal/Modal";
import { getUserInfoQr } from "../api/api";
import { useQuery } from "react-query";
import CloseIcon from "@mui/icons-material/Close";

const GuestMain = () => {
  const [qrCodeValue, setQrCodeValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data } = useQuery("userInfoQr", getUserInfoQr);
  console.log(data);

  const downloadQRCode = () => {
    const canvas = document.getElementById("qr-code");
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleGenerateQrCode = () => {
    const makeUserQr = `name=${data.data.name}&phoneNum=${data.data.phoneNum}`;
    setQrCodeValue(makeUserQr);
    setIsModalOpen(true);
  };

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

        <StMainMenu color="#28d4d4;">
          <StQrBtn onClick={(handleGenerateQrCode, downloadQRCode)}>QR 코드 발급</StQrBtn>
          <StMainImg src={btn2} alt="내 방문 이력 보기"></StMainImg>
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
