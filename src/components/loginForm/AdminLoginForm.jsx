import React, { useState } from "react";
import { TextField, Button, Link, Grid } from "@mui/material";
import styled, { keyframes } from "styled-components";
import { useMutation } from "react-query";
import { loginbusiness } from "../../api/api";
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
        borderColor: "#49CDB5",
      },
      "&.Mui-focused label": {
        color: "#49CDB5",
      },
    },
  },
});

export default function AdminLoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();

  const mutation = useMutation(loginbusiness, {
    onSuccess: (data) => {
      console.log(data);
      setCookie("ACCESS_TOKEN", data.headers.authorization.split(" ")[1]);
      localStorage.setItem("REFRESH_TOKEN", data.headers.refresh_token.split(" ")[1]);
      localStorage.setItem("name", data.data.data.name);
      setCookie("ACCESS_TOKEN", data.headers.authorization.split(" ")[1]);
      localStorage.setItem("REFRESH_TOKEN", data.headers.refresh_token.split(" ")[1]);
      localStorage.setItem("name", data.data.name);
      navigate("/admin/main");
    },
    onError: (error) => {
      console.log(error.response);
    },
  });

  const adminSignUpBtn = () => {
    navigate("/signup");
  };
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
    <>
      <DivLoginContainer>
        <StForm onSubmit={HandlerGuestLogin}>
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
            sx={{
              "& label": {
                "&.Mui-focused": {
                  color: "#49CDB5",
                },
              },
            }}
            InputLabelProps={{
              sx: {
                color: "#49CDB5",

                ":&focus": {
                  color: "#49CDB5",
                },
              },
            }}
            helperText="Please enter a valid input"
            FormHelperTextProps={{
              sx: {
                color: "red",
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
            className={classes.root}
            sx={{
              "& label": {
                "&.Mui-focused": {
                  color: "#49CDB5",
                },
              },
            }}
            InputLabelProps={{
              sx: {
                color: "#49CDB5",

                ":&focus": {
                  color: "#49CDB5",
                },
              },
            }}
            helperText="Please enter a valid input"
            FormHelperTextProps={{
              sx: {
                color: "red",
              },
            }}
          />
          <StLoginBtn>
            <Button
              className={classes.button}
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                mb: 2,
                background: "#49CDB5",
                borderRadius: 30,
                height: "60px",
                "&:hover": {
                  background: "#49CDB5",
                },
              }}
              size="large"
            >
              LOG IN
            </Button>
            <StloginImg src={arrow} alt="로그인버튼" />
          </StLoginBtn>
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
              onClick={adminSignUpBtn}
            >
              JOIN US
            </Button>
            <StloginImg src={arrow} alt="로그인버튼" />
          </StLoginBtn>
        </StForm>

        <Grid item xs>
          <Link href="#">
            <StFindBtn>아이디 / 비밀번호 찾기</StFindBtn>
          </Link>
        </Grid>
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
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} 1s linear;
  justify-content: space-around;
`;
const StForm = styled.form``;
const StLoginBtn = styled.div`
  position: relative;
`;
const StloginImg = styled.img`
  position: absolute;
  top: 40%;
  right: 10%;
`;

const StFindBtn = styled.div`
  color: black;
  margin-top: 30px;
`;
