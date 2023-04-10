import React, { useState } from "react";
import { TextField, Button, Link, Grid } from "@mui/material";
import styled, { keyframes } from "styled-components";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";

import { loginGuest } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../api/cookies";
import { makeStyles } from "@mui/styles";
import arrow from "../../utils/img/arrow_icon.png";

//mui custom css

const useStyles = makeStyles({
  root: {
    borderRadius: 30,
    "& .MuiOutlinedInput-root": {
      borderRadius: "30px",

      "&.Mui-focused fieldset": {
        borderColor: "#636FD7",
      },
      "&.Mui-focused label": {
        color: "#636FD7",
      },
    },
  },
});

export default function GuestLoginForm() {
  const navigate = useNavigate();
  const { menu } = useSelector((state) => state.LoginMenuSlice);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();
  const mutation = useMutation(loginGuest, {
    onSuccess: (data) => {
      console.log(data);
      setCookie("ACCESS_TOKEN", data.headers.authorization.split(" ")[1]);
      localStorage.setItem("REFRESH_TOKEN", data.headers.refreshtoken.split(" ")[1]);
      localStorage.setItem("name", data.data.data.name);
      localStorage.setItem("usertype", menu);
      navigate("/guest/main");
    },
    onError: (error) => {
      console.log(error.response);
    },
  });
  const guestSignUpBtn = () => {
    navigate("/signup");
  };

  const HandlerGuestLogin = (e) => {
    e.preventDefault();
    const user = {
      userId: userId,
      password: password,
    };
    mutation.mutate(user);
    console.log("로그인");
  };

  return (
    <>
      <DivLoginContainer>
        <StForm onSubmit={HandlerGuestLogin}>
          <InputForm>
            <TextField
              margin="normal"
              label="아이디"
              name="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
              autoFocus
              fullWidth
              className={classes.root}
              sx={{
                "& label": {
                  "&.Mui-focused": {
                    color: "#636FD7",
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: "#636FD7",

                  ":&focus": {
                    color: "#636FD7",
                  },
                },
              }}
            />
            <TextField
              margin="normal"
              label="비밀번호"
              type="password"
              autoComplete="current-password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              color="primary"
              className={classes.root}
              sx={{
                "& label": {
                  "&.Mui-focused": {
                    color: "#636FD7",
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: "#636FD7",

                  "&.focused": {
                    color: "red",
                  },
                },
              }}
            />
          </InputForm>
          <StLoginBtn>
            <Button
              className={classes.button}
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                mb: 2,
                background: "#636FD7",
                borderRadius: 30,
                height: "60px",
                "&:hover": {
                  background: "#636FD7",
                },
              }}
              size="large"
            >
              LOG IN
            </Button>
            <StloginImg src={arrow} alt="로그인버튼" />
          </StLoginBtn>
          <LoginFindForm>
            <Link href="/search">
              <StFindBtn>아이디 / 비밀번호 찾기</StFindBtn>
            </Link>
          </LoginFindForm>
          <hr />
          <StLoginBtn>
            <Button
              className={classes.button2}
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                mb: 2,
                background: "#686868",
                borderRadius: 30,
                height: "60px",
                "&:hover": {
                  background: "#686868",
                },
              }}
              size="large"
              onClick={guestSignUpBtn}
            >
              JOIN US
            </Button>
            <StloginImg src={arrow} alt="로그인버튼" />
          </StLoginBtn>
        </StForm>
      </DivLoginContainer>
    </>
  );
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const DivLoginContainer = styled.div`
  width: 500px;
  height: 500px;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} 1s linear;
  justify-content: space-around;
`;
const StLoginBtn = styled.div`
  position: relative;
`;
const StloginImg = styled.img`
  position: absolute;
  top: 40%;
  right: 20%;
`;
const StForm = styled.form``;

const InputForm = styled.div`
  margin-top: -50px;
`;

const StFindBtn = styled.div`
  color: black;
  margin-top: 30px;
`;

const LoginFindForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: -20px;
  margin-bottom: 30px;
`;
