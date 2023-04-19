import React from "react";
import mainLogo from "../utils/img/VISITUS_logo@2x.png";
import mainImg from "../utils/img/background.png";
import styled from "styled-components";

const NotFound = () => {
  return (
    <>
      <StLogo src={mainLogo} alt="VISITUS 로고" />
      <StMainBackground src={mainImg} alt="VISITUS 메인" />
      <ModalOverlay>
        <ModalWrapper>
          <ModalInner>
            <Header>오류페이지</Header>
            <div>정상적인 경로가 아닙니다</div>
          </ModalInner>
        </ModalWrapper>
      </ModalOverlay>
    </>
  );
};

export default NotFound;

const StLogo = styled.img`
  position: absolute;
  left: 50%;
  top: 7%;
  z-index: 0;
  transform: translate(-50%, -50%);
`;

const StMainBackground = styled.img`
  position: absolute;
  z-index: -1;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100vh;
  transform: translate(-50%, -50%);
  object-fit: cover;
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
  border: 5px solid #829cf6;
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
  padding: 30px 20px;
`;
