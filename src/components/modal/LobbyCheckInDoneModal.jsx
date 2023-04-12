import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

const LobbyCheckInDoneModal = ({ onClose }) => {
  const navigate = useNavigate();

  const gotoLobby = () => {
    navigate("/lobby");
  };

  return (
    <>
      <StBox>
        <StTxtContainer>
          <div>안녕하세요 {localStorage.getItem("name")}님</div>
          <div>체크인 되었습니다.</div>
        </StTxtContainer>
        <StCheckBtn onClick={onClose}>확인</StCheckBtn>
      </StBox>
    </>
  );
};

export default LobbyCheckInDoneModal;

const StBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 20px;
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
