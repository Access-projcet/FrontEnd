import React, { useState } from "react";
import styled from "styled-components";
import { Tab, Tabs } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import mainImg from "../utils/img/background.png";
import AdminSignUp from "../components/signupForm/AdminSignUp";
import GuestSignUp from "../components/signupForm/GuestSignUp";
import mainLogo from "../utils/img/VISITUS_logo@2x.png";
import { setMenu } from "../redux/store/LoginMenuSlice";

const SignUp = () => {
  const { menu } = useSelector((state) => state.LoginMenuSlice);
  const dispatch = useDispatch();
  const HandleChangeTab = (e, newValue) => {
    dispatch(setMenu(newValue));
  };

  return (
    <>
      <StLogo src={mainLogo} alt="VISITUS 로고" />
      <StMainBackground src={mainImg} alt="VISITUS 메인" />

      <DivLoginContainer>
        <DivLoginBox>
          <DivLoginType>
            <Tabs
              value={menu}
              onChange={HandleChangeTab}
              variant="fullWidth"
              TabIndicatorProps={{ sx: { bgcolor: "white", width: "500" } }}
            >
              <Tab
                label="게스트 회원가입"
                value="guest"
                sx={{
                  backgroundColor: "lightgray",
                  width: "50%",
                  height: "80px",
                  fontSize: "20px",
                  fontWeight: "700",
                  "&.Mui-selected": {
                    color: " #636FD7",
                    fontWeight: "900",
                    backgroundColor: "white",
                  },
                  "&.Mui-selected::after": {
                    content: "''",
                    display: "block",
                    backgroundColor: "#636FD7",
                    width: "100%",
                  },
                  "&.Mui-selected::before": {
                    content: "''",
                    display: "block",
                    backgroundColor: "#636FD7",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    position: "absolute",
                    top: "10px",
                    left: "20px",
                  },
                }}
              />
              <Tab
                label="협력사 회원가입"
                value="admin"
                sx={{
                  backgroundColor: "lightgray",
                  width: "50%",
                  height: "80px",
                  fontSize: "20px",
                  fontWeight: "700",
                  "&.Mui-selected": {
                    color: "#49CDB5",
                    fontWeight: "900",
                    backgroundColor: "white",
                  },
                  "&.Mui-selected::after": {
                    content: "''",
                    display: "block",
                    backgroundColor: "#49CDB5",
                    width: "100%",
                  },
                  "&.Mui-selected::before": {
                    content: "''",
                    display: "block",
                    backgroundColor: "#49CDB5",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    position: "absolute",
                    top: "10px",
                    right: "20px",
                  },
                }}
              />
            </Tabs>
          </DivLoginType>
          {menu === "guest" ? <GuestSignUp /> : <AdminSignUp />}
        </DivLoginBox>
      </DivLoginContainer>
    </>
  );
};

export default SignUp;

const StLogo = styled.img`
  position: absolute;
  left: 50%;
  top: 200px;
  z-index: 0;
  transform: translate(-50%, -50%);
`;

const StMainBackground = styled.img`
  position: absolute;
  z-index: -1;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100vh;
  transform: translate(-50%, -50%);
  object-fit: cover;
`;

const DivLoginContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* background: url(${mainImg}) no-repeat;
  background-size: 100%;
  background-position: center; */
`;

const DivLoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 550px;
  width: 25vw;
  background-color: white;
  border-radius: 30px;
  overflow: hidden;
  padding-bottom: 20px;
`;
const DivLoginType = styled.div`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
`;
