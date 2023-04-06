import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../../utils/img/VISITUS_logo.png";
import logout from "../../utils/img/logout_icon.png";
import { Link } from "react-router-dom";
import { removeCookie } from "./../../api/cookies";

const Navbar = () => {
  const navigate = useNavigate();
  const { menu } = useSelector((state) => state.LoginMenuSlice);

  const logoutBtn = () => {
    removeCookie("ACCESS_TOKEN", { path: "/" });
    localStorage.removeItem("name");
    localStorage.removeItem("REFRESH_TOKEN");
    localStorage.removeItem("usertype");
  };

  const HandlerMain = (e) => {
    e.stopPropagation();
    menu === "guest" ? navigate("/guest/main") : navigate("/admin/main");
  };
  return (
    <>
      <StNavBar>
        <StNavbarContainer>
          <StLogo src={logo} alt="visitus.logo" onClick={HandlerMain} />
          {menu === "guest" ? (
            <StMenuDiv>
              <StMenuUl>
                <StMenuLi>맵보러가기</StMenuLi>
                <StMenuLi>내가 신청한 목록</StMenuLi>
              </StMenuUl>
            </StMenuDiv>
          ) : (
            <StMenuDiv>
              <StMenuUl>
                <StMenuLi>로비 메뉴</StMenuLi>
                <lStMenuLii>관리자 페이지</lStMenuLii>
              </StMenuUl>
            </StMenuDiv>
          )}
          <StUser>
            <StName>{localStorage.getItem("name")}님 반갑습니다</StName>
            <StLogOutContainer>
              <StLogOut onClick={logoutBtn}>LOGOUT</StLogOut>
              <StLogOutImg src={logout} alt="logoutImg" onClick={logoutBtn}></StLogOutImg>
            </StLogOutContainer>
          </StUser>
        </StNavbarContainer>
      </StNavBar>
    </>
  );
};

export default Navbar;

const StNavBar = styled.div`
  background-color: #636fd7;
  width: 100%;
`;
const StNavbarContainer = styled.div`
  width: 90%;
  height: 80px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
`;

const StLogo = styled.img`
  cursor: pointer;
`;

const StUser = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
`;
const StName = styled.div`
  color: white;
  font-size: 16px;
  font-weight: 800;
`;
const StLogOutContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
const StLogOut = styled.button`
  color: white;
  font-size: 16px;
  font-weight: 800;
  background-color: transparent;
  cursor: pointer;
`;
const StLogOutImg = styled.img``;

const StMenuDiv = styled.div``;

const StMenuUl = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StMenuLi = styled.li`
  color: white;
  font-size: 18;
  font-weight: 700;
  margin: 0 20px;
`;
