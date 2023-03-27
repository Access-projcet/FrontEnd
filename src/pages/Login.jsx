import React, { useState } from "react";
import styled from "styled-components";
import { AppBar, Avatar, Tab, Tabs, Typography } from "@mui/material";

import GuestLoginForm from "../components/GuestLoginForm";
import AdminLoginForm from "../components/AdminLoginForm";
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
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>로고</Avatar>
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          VRS
        </Typography>
        <DivLoginType>
          <AppBar
            position="static"
            color="default"
            sx={{ backgroundColor: "transparent" }}
          >
            <Tabs
              value={loginType}
              onChange={HandleChangeTab}
              variant="fullWidth"
              TabIndicatorProps={{ sx: { bgcolor: "white" } }}
            >
              <Tab
                label="게스트"
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
                label="관리자"
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
          </AppBar>
          {/* 
          <Button variant="contained" onClick={() => setLoginType("guest")}>
            Guest
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => setLoginType("Admin")}
          >
            Admin
          </Button> */}
        </DivLoginType>
        {loginType === "guest" ? <GuestLoginForm /> : <AdminLoginForm />}
        asdf
      </DivLoginBox>
    </DivLoginContainer>
  );
};

export default Login;

const DivLoginContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DivLoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 700px;
  height: 100%;
  background-color: #a7bcff;
`;
const DivLoginType = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
