import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { submitlobbycheckin } from "../../api/api";
import styled from "styled-components";

const LobbyModal = ({ onClose }) => {
  const [visitor, setVisitor] = useState("");
  const [phoneNum, setPhoneNum] = useState("");

  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  const queryClient = useQueryClient();
  const mutation = useMutation(submitlobbycheckin, {
    onSuccess: (response) => {
      console.log(response);
      queryClient.invalidateQueries("user");
    },
    onError: (error) => {
      alert(error);
    },
  });

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const check = {
      visitor,
      phoneNum,
      // 현재시간
      time: `${hours}:${minutes}`,
    };
    console.log({
      visitor,
      phoneNum,
      time: `${hours}:${minutes}`,
    });
    mutation.mutate(check);
  };

  return (
    <>
      <ModalOverlay>
        <ModalWrapper>
          <ModalInner>
            <Header>출입 확인</Header>
            <Input1>
              이름
              <input
                value={visitor}
                onChange={(e) => {
                  setVisitor(e.target.value);
                }}
                style={{
                  marginLeft: "90px",
                  width: "200px",
                  height: "30px",
                  fontSize: "20px",
                }}
              />
            </Input1>
            <Input2>
              전화번호
              <input
                value={phoneNum}
                onChange={(e) => {
                  setPhoneNum(e.target.value);
                }}
                style={{
                  marginLeft: "50px",
                  width: "200px",
                  height: "30px",
                  fontSize: "20px",
                }}
              />
            </Input2>
            <ButtonClose onClick={onClose}>x</ButtonClose>
          </ModalInner>
          <CancelBtn onClick={onClose}>취소</CancelBtn>
          <SubmitBtn onClick={onSubmitHandler}>확인</SubmitBtn>
        </ModalWrapper>
      </ModalOverlay>
    </>
  );
};

export default LobbyModal;

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
  background-color: white;
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

const ButtonClose = styled.button`
  width: 40px;
  height: 20px;
  position: absolute;
  top: 0;
  right: 0;
  background-color: transparent;
  font-size: 35px;
  cursor: pointer;
`;

const Header = styled.div`
  background: grey;
  position: absolute;
  top: 0;
  width: 92%;
  display: flex;
  color: white;
  padding: 20px;
  font-size: larger;
  font-weight: bold;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const Input1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: row;
  margin: 50px;
  font-size: 20px;
  font-weight: bold;
`;

const Input2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: row;
  font-size: 20px;
  font-weight: bold;
`;

const CancelBtn = styled.div`
  border-radius: 35px;
  cursor: pointer;

  color: white;
  background: #656565;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 15px;

  position: relative;
  left: -80px;
  top: 20px;
  height: 25px;
  width: 100px;
`;

const SubmitBtn = styled.div`
  border-radius: 35px;
  cursor: pointer;

  color: white;
  background: #636fd7;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 15px;

  position: relative;
  left: 80px;
  top: -35px;
  height: 25px;
  width: 100px;
`;
