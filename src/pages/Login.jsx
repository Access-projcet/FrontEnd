import React, { useEffect } from "react";
import styled from "styled-components";
import { Tab, Tabs } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import GuestLoginForm from "../components/loginForm/GuestLoginForm";
import AdminLoginForm from "../components/loginForm/AdminLoginForm";
import mainImg from "../utils/img/background.png";
import mainLogo from "../utils/img/VISITUS_logo@2x.png";
import { setMenu } from "../redux/store/LoginMenuSlice";
import { getCookie } from "../api/cookies";

const Login = () => {
  //로그인 타입 지정
  const { menu } = useSelector((state) => state.LoginMenuSlice);
  const dispatch = useDispatch();

  //로그인되어있을시 로그인페이지 이동 막고 메인으로 이동 => acc 토큰 여부로 확인
  const navigate = useNavigate();
  const isToken = getCookie("ACCESS_TOKEN");

  useEffect(() => {
    if (isToken) {
      console.log("여기요;;");
      const usertype = localStorage.getItem("usertype");
      usertype === "guest" ? navigate("/guest/main") : navigate("/admin/main");
    }
  }, [isToken, navigate]);

  const HandleChangeTab = (e, newValue) => {
    console.log(newValue);
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
                label="게스트로그인"
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
                label="협력사로그인"
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
          {menu === "guest" ? <GuestLoginForm /> : <AdminLoginForm />}
        </DivLoginBox>
      </DivLoginContainer>
    </>
  );
};

export default Login;

const StLogo = styled.img`
  position: absolute;
  left: 50%;
  top: 5vw;
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
