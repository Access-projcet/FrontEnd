import React from "react";
import styled from "styled-components";

const LobbyCheckOutDoneModal = ({ onClose }) => {
  return (
    <>
      <StBox>
        <StTxtContainer>
          <div>체크아웃 되었습니다. 안녕히가세요.</div>
        </StTxtContainer>
        {/* <StCheckBtn onClick={onClose}>확인</StCheckBtn> */}
      </StBox>
    </>
  );
};

export default LobbyCheckOutDoneModal;

const StBox = styled.div`
  position: fixed;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  display: flex;
  background-color: #f2f2f2;
  width: 400px;
  height: 200px;
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
