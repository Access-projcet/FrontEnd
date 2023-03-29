import React from "react";
import { Link } from "react-router-dom";

const GuestMain = () => {
  return (
    <div>
      <Link to={"/guest/company"}>방문 신청하기</Link>
      <br />
      <Link to={"/guest/mypage"}>내 방문 이력 보기</Link>
    </div>
  );
};

export default GuestMain;
