import React, { useState } from "react";
import styled from "styled-components";
import { Tab, Tabs } from "@mui/material";

import GuestLoginForm from "../components/GuestLoginForm";
import AdminLoginForm from "../components/AdminLoginForm";
import mainImg from "../utils/img/background.png";
const Login = () => {
  //로그인 타입 지정
  const [loginType, setLoginType] = useState("guest");
  const HandleChangeTab = (e, newValue) => {
    console.log(newValue);
    setLoginType(newValue);
  };

  return (
    <DivLoginContainer>
      <DivLoginBox>
        <DivLoginType>
          <Tabs
            value={loginType}
            onChange={HandleChangeTab}
            variant="fullWidth"
            TabIndicatorProps={{ sx: { bgcolor: "white" } }}
          >
            <Tab
              label="게스트로그인"
              value="guest"
              sx={{
                "&.Mui-selected": {
                  color: "primary.main",
                  fontWeight: "bold",
                },
                "&.Mui-selected::after": {
                  content: "''",
                  display: "block",
                  backgroundColor: "primary.main",
                  width: "100%",
                },
              }}
            />
            <Tab
              label="협력사로그인"
              value="admin"
              sx={{
                "&.Mui-selected": {
                  color: "secondary.main",
                  fontWeight: "bold",
                },
                "&.Mui-selected::after": {
                  content: "''",
                  display: "block",
                  backgroundColor: "secondary.main",
                  width: "100%",
                },
              }}
            />
          </Tabs>
        </DivLoginType>
        {loginType === "guest" ? <GuestLoginForm /> : <AdminLoginForm />}
      </DivLoginBox>
    </DivLoginContainer>
  );
};

export default Login;

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
  background: url(${mainImg}) no-repeat;
  background-size: cover;
`;

const DivLoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 550px;
  background-color: white;
  border-radius: 30px;
`;
const DivLoginType = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
