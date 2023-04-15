import React, { useState } from "react";
import QrReader from "react-qr-scanner";
import successAudioFile from "../../utils/audio/qr체크아웃 완료.mp3";
import failAudioFile from "../../utils/audio/qr유효하지 않는 경우.mp3";
import alreadySuccessAudioFile from "../../utils/audio/qr이미 체크아웃 완료.mp3";
import { submitLobbyCheckOutQr } from "../../api/api";
import { useMutation, useQueryClient } from "react-query";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";

const QrReaderRebuilding2 = ({ onClose }) => {
  const [result, setResult] = useState("");
  const [successAudio] = useState(new Audio(successAudioFile));
  const [failAudio] = useState(new Audio(failAudioFile));
  const [alreadySuccessAudio] = useState(new Audio(alreadySuccessAudioFile));
  const [showModal, setShowModal] = useState(false);

  const queryClient = useQueryClient();
  const mutation = useMutation(submitLobbyCheckOutQr, {
    onSuccess: (response) => {
      queryClient.invalidateQueries("qrUser");
      successAudio.play();
      setShowModal(true);
      onClose();
      setTimeout(() => {
        window.location.reload();
      }, 3000);
      setTimeout(() => {
        setResult("");
      }, 30000);
    },
    onError: (error) => {
      //400에러일 때 나오는 음성
      if (error.response.data.statusCode === 400) {
        failAudio.play();
        onClose();
        //402에러일 때 나오는 음성
      } else if (error.response.data.statusCode === 402) {
        alreadySuccessAudio.play();
        onClose();
      }
    },
  });

  const handleScan = async (data) => {
    if (data) {
      setResult(data);
      const userData = {};
      const values = data.text.split("&");
      for (let i = 0; i < values.length; i++) {
        const keyValuePair = values[i].split("=");
        userData[keyValuePair[0]] = keyValuePair[1];
      }
      try {
        mutation.mutate(userData);
      } catch (error) {
        console.error(error);
      }
    }
  };

  let handleError = (err) => {
    // alert(err);
  };
  return (
    <>
      <ModalOverlay>
        <ModalWrapper>
          <ModalInner>
            <Header>QR Check Out</Header>
            <QrReader
              delay={10000}
              onError={handleError}
              onScan={handleScan}
              style={{ width: "100%", height: "200%" }}
            />
            <QrLine />
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
        </ModalWrapper>
      </ModalOverlay>
    </>
  );
};

export default QrReaderRebuilding2;

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
  border: 5px solid #57d4d4;
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

const QrLine = styled.div`
  width: 200px;
  height: 200px;
  border: 10px dashed #57d4d4;
  position: absolute;
`;
