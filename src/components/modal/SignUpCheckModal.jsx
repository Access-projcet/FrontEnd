import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

const SignUpCheckModal = () => {
  const navigate = useNavigate();

  const gotoLogin = () => {
    navigate("/");
  };
  return (
    <>
      <StBox>
        <StTxtContainer>
          <div>환영합니다!</div>
          <div>로그인페이지로 이동합니다.</div>
        </StTxtContainer>
        <StCheckBtn onClick={gotoLogin}>확인</StCheckBtn>
      </StBox>
    </>
  );
};

export default SignUpCheckModal;

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
  cursor: pointer;
`;
