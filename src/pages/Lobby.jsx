import React from "react";
import { Link } from "react-router-dom";

const Lobby = () => {
  return (
    <div>
      <Link to={"/lobby/checkin"}>입장 확인하기</Link>
      <br />
      <Link to={"/lobby/checkout"}>퇴장 확인하기</Link>
    </div>
  );
};

export default Lobby;
