import React, { useState } from "react";
import { TextField, Button, Link, Grid } from "@mui/material";
import styled, { keyframes } from "styled-components";

export default function GuestLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const HandlerGuestLogin = (e) => {
    e.preventDefault();
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
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2, mb: 2 }}
          size="large"
        >
          게스트 로그인
        </Button>
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
