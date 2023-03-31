import React, { useState } from "react";
import { TextField, Button, Link, Grid } from "@mui/material";
import styled, { keyframes } from "styled-components";
import { useMutation } from "react-query";
import { loginguest } from "../api/api";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../api/cookies";
import { makeStyles } from "@mui/styles";
import arrow from "../utils/img/arrow_icon.png";
//mui custom css
const useStyles = makeStyles({
  root: {
    borderRadius: 10,
  },
  button: {
    background: "#636FD7",
    borderRadius: 30,
    "&:hover": {
      background: "#636FD7",
    },
  },
});

export default function GuestLoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();
  const mutation = useMutation(loginguest, {
    onSuccess: (data) => {
      setCookie("ACCESS_TOKEN", data.headers.authorization.split(" ")[1]);
      localStorage.setItem(
        "REFRESH_TOKEN",
        data.headers.refresh_token.split(" ")[1]
      );
      localStorage.setItem("name", data.data.name);
      console.log(data);
      setCookie("ACCESS_TOKEN", data.headers.authorization.split(" ")[1]);
      localStorage.setItem(
        "REFRESH_TOKEN",
        data.headers.refresh_token.split(" ")[1]
      );
      localStorage.setItem("name", data.data.data.name);

      alert("로그인 성공");
      navigate("/guest/main");
      setCookie("ACCESS_TOKEN", data.headers.authorization.split(" ")[1]);
      localStorage.setItem(
        "REFRESH_TOKEN",
        data.headers.refresh_token.split(" ")[1]
      );
      localStorage.setItem("name", data.data.data.name);
    },
    onError: (error) => {
      alert("로그인 실패");
      console.log(error.response);
    },
  });

  const HandlerGuestLogin = (e) => {
    e.preventDefault();
    const user = {
      userId: email,
      password: password,
    };
    mutation.mutate(user);
    console.log("로그인");
  };

  return (
    <DivLoginContainer>
      <form onSubmit={HandlerGuestLogin}>
        <TextField
          margin="normal"
          label="Email"
          autoComplete="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoFocus
          fullWidth
          className={classes.root}
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
        />
        <StLoginBtn>
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, mb: 2 }}
            size="large"
          >
            LOG IN
          </Button>
          <StloginImg src={arrow} alt="로그인버튼" />
        </StLoginBtn>
      </form>

      <Grid container>
        <Grid item xs>
          <Link href="#" underline="hover">
            아이디 & 비밀번호 찾기
          </Link>
        </Grid>
        <Grid item>
          <Link href="/guest/signup" underline="hover">
            게스트 회원가입
          </Link>
        </Grid>
      </Grid>
    </DivLoginContainer>
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
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} 1s linear;

  /* gap: 10px; */
`;
const StLoginBtn = styled.div`
  position: relative;
`;
const StloginImg = styled.img`
  position: absolute;
  top: 40%;
  right: 20%;
`;
