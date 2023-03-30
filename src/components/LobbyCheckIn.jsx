import React, { useState } from "react";
import styled from "styled-components";
import LobbyModal from "./modal/LobbyModal";

const LobbyCheckIn = () => {
  const [startDate, setStartDate] = useState("");
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      {"방문날짜:"}
      <input
        type="date"
        value={startDate}
        onChange={(e) => {
          setStartDate(e.target.value);
        }}
      ></input>
      <br />
      <button
        onClick={() => {
          setShowModal(!showModal);
        }}
      >
        확인
      </button>
      {showModal === true ? (
        <Modal_style>
          <LobbyModal startDate={startDate} setShowModal={setShowModal} />
        </Modal_style>
      ) : null}
    </div>
  );
};

const Modal_style = styled.div`
  /* position: absolute;
  top: 300%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  height: 500px; */
  background-color: gray;
`;

export default LobbyCheckIn;
