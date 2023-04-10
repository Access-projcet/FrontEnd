import React, { useState } from "react";
import QrReader from "react-qr-scanner";
import successAudioFile from "../../utils/audio/성공음성.wav";
import failAudioFile from "../../utils/audio/실패음성.wav";
import { submitLobbyCheckInQr } from "../../api/api";
import { useMutation, useQueryClient } from "react-query";

const QrReaderModal = () => {
  const [result, setResult] = useState("");
  const [successAudio] = useState(new Audio(successAudioFile));
  const [failAudio] = useState(new Audio(failAudioFile));

  const queryClient = useQueryClient();
  const mutation = useMutation(submitLobbyCheckInQr, {
    onSuccess: (response) => {
      queryClient.invalidateQueries("qrUser");
      successAudio.play();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      setTimeout(() => {
        setResult("");
      }, 30000);
    },
    onError: (error) => {
      failAudio.play();
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
      <QrReader delay={10000} onError={handleError} onScan={handleScan} />
    </>
  );
};

export default QrReaderModal;
