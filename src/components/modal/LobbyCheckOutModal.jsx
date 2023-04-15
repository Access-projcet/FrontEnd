import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { submitLobbyCheckOut } from "../../api/api";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import LobbyCheckOutErrorModal from "./LobbyCheckOutErrorModal";
import LobbyCheckOutDoneModal from "./LobbyCheckOutDoneModal";
import LobbyNoMatchModal from "./LobbyNoMatchModal";

const LobbyCheckOutModal = ({ onClose }) => {
  const [visitor, setVisitor] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showCheckOutModal, setShowCheckOutModal] = useState(false);
  const [showNoMatchModal, setShowNoMatchModal] = useState(false);

  const queryClient = useQueryClient();
  const mutation = useMutation(submitLobbyCheckOut, {
    onSuccess: (response) => {
      queryClient.invalidateQueries("user");

      //체크아웃 정상적으로 되었을 때 모달 스위치
      setShowModal(true);

      // 모달을 onClose로 닫으면 위에 모달이 안뜸
      // onClose();
    },
    onError: (error) => {
      //400에러일 때 뜨는 모달 스위치
      setShowNoMatchModal(true);
      //402에러일 때 뜨는 모달 스위치
      if (error.response.data.statusCode === 402) {
        setShowCheckOutModal(true);
      }

      // 모달을 onClose로 닫으면 위에 모달이 안뜸
      // onClose()
    },
  });

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const check = {
      name: visitor,
      phoneNum,
      // 현재시간
    };
    mutation.mutate(check);
  };

  return (
    <>
      <ModalOverlay>
        <ModalWrapper>
          <ModalInner>
            <Header>Check-out</Header>
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
                  borderRadius: "5px",
                  borderStyle: "solid",
                  borderWidth: "1px",
                }}
              />
            </Input1>
            <Input2>
              전화번호
              <input
                type="tel"
                value={phoneNum}
                onChange={(e) => {
                  let value = e.target.value.replace(/-/g, "");
                  if (value.length === 11) {
                    value = value.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
                  } else {
                    value = value.slice(0, 11);
                    value = value.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
                  }
                  setPhoneNum(value);
                }}
                style={{
                  marginLeft: "50px",
                  width: "200px",
                  height: "30px",
                  fontSize: "20px",
                  borderRadius: "5px",
                  borderStyle: "solid",
                  borderWidth: "1px",
                }}
              />
            </Input2>
            <CloseIcon
              onClick={onClose}
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
          <CancelBtn onClick={onClose}>취소</CancelBtn>
          <SubmitBtn onClick={onSubmitHandler}>확인</SubmitBtn>

          {/* 체크아웃 완료가 정상적으로 되었을 때 모달 */}
          {showModal === true ? (
            <LobbyCheckOutDoneModal
              onClose={() => {
                setShowModal(false);
              }}
            />
          ) : null}

          {/* 체크아웃을 이미 했을 때 나오는 모달 */}
          {showCheckOutModal === true ? (
            <LobbyCheckOutErrorModal
              onClose={() => {
                setShowCheckOutModal(false);
              }}
            />
          ) : null}

          {/* 이름 전화번호 입력했을 때 일치하는 사람이 없을때의 모달 */}
          {showNoMatchModal === true ? (
            <LobbyNoMatchModal
              onClose={() => {
                setShowNoMatchModal(false);
              }}
            />
          ) : null}
        </ModalWrapper>
      </ModalOverlay>
    </>
  );
};

export default LobbyCheckOutModal;

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
  position: relative;
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

const Input1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: row;
  padding: 40px;
  margin-top: 100px;
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
  margin-bottom: -20px;
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
  top: -55px;
  height: 25px;
  width: 100px;
`;
