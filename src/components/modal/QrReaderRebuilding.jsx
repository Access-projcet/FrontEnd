import React, { useState } from "react";
import QrReader from "react-qr-scanner";
import successAudioFile from "../../utils/audio/성공음성.wav";
import failAudioFile from "../../utils/audio/실패음성.wav";
import { submitLobbyCheckInQr } from "../../api/api";
import { useMutation, useQueryClient } from "react-query";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";
import Swal from "sweetalert2";

const QrReaderRebuilding = ({ onClose }) => {
  const [result, setResult] = useState("");
  const [successAudio] = useState(new Audio(successAudioFile));
  const [failAudio] = useState(new Audio(failAudioFile));
  const [showModal, setShowModal] = useState(false);

  const queryClient = useQueryClient();
  const mutation = useMutation(submitLobbyCheckInQr, {
    onSuccess: (response) => {
      queryClient.invalidateQueries("qrUser");
      successAudio.play();
      setShowModal(true);
      onClose();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      setTimeout(() => {
        setResult("");
      }, 30000);
    },
    onError: (error) => {
      failAudio.play();
      onClose();
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
    Swal.fire("실패", "요청 실패", "error");
  };
  return (
    <>
      <ModalOverlay>
        <ModalWrapper>
          <ModalInner>
            <Header>QR Check In</Header>
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

export default QrReaderRebuilding;

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

const QrLine = styled.div`
  width: 200px;
  height: 200px;
  border: 10px dashed #829cf6;
  position: absolute;
`;
