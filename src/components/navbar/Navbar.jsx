import React from "react";
import styled from "styled-components";
import logo from "../../utils/img/VISITUS_logo.png";
import logout from "../../utils/img/logout_icon.png";
import { Link } from "react-router-dom";
import { removeCookie } from "./../../apis/cookies";
const Navbar = () => {
  const logoutBtn = () => {
    removeCookie("ACCESS_TOKEN");
    localStorage.removeItem("name");
    localStorage.removeItem("REFRESH_TOKEN");
  };
  return (
    <>
      <StNavBar>
        <StNavbarContainer>
          <StLogo src={logo} alt="visitus.logo" />
          <StUser>
            <StName>{localStorage.getItem("name")}님 반갑습니다</StName>
            <StLogOutContainer>
              <Link to={"/"}>
                <StLogOut onClick={logoutBtn}>LOGOUT</StLogOut>

                <StLogOutImg
                  src={logout}
                  alt="logoutImg"
                  onClick={logoutBtn}
                ></StLogOutImg>
              </Link>
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

const StLogo = styled.img``;

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
