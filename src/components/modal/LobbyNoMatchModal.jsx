import React from "react";
import styled from "styled-components";

const LobbyNoMatchModal = ({ onClose }) => {
  return (
    <>
      <StBox>
        <StTxtContainer>
          <div>일치하는 방문 예약자가 없습니다.</div>
        </StTxtContainer>
        <StCheckBtn onClick={onClose}>확인</StCheckBtn>
      </StBox>
    </>
  );
};

export default LobbyNoMatchModal;

const StBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 20px;
  z-index: 10;
`;
const StTxtContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 700;
  line-height: 2;
`;

const StCheckBtn = styled.button`
  background-color: #636fd7;
  border-radius: 35px;
  width: 120px;
  height: 48px;
  color: white;
  font-size: 16px;
  font-weight: 700;
`;
