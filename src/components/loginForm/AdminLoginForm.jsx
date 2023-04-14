import React, { useState } from "react";
import { TextField, Button, Link } from "@mui/material";
import styled, { keyframes } from "styled-components";
import { useMutation } from "react-query";
import { loginBusiness } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../api/cookies";
import { makeStyles } from "@mui/styles";
import arrow from "../../utils/img/arrow_icon.png";
import { useSelector } from "react-redux";
import SearchAdminId from "../modal/SearchAdminID";
import SearchAdminPw from "../modal/SearchAdminPW";
import Swal from "sweetalert2";
import { Checkbox, FormControlLabel } from "@mui/material";

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
  const { menu } = useSelector((state) => state.LoginMenuSlice);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showIDModal, setShowIDModal] = useState(false);
  const [showPWModal, setShowPWModal] = useState(false);
  const [showPW, setShowPW] = useState(false);
  const classes = useStyles();
  const mutation = useMutation(loginBusiness, {
    onSuccess: (data) => {
      setCookie("ACCESS_TOKEN", data.headers.authorization.split(" ")[1]);
      localStorage.setItem(
        "REFRESH_TOKEN",
        data.headers.refreshtoken.split(" ")[1]
      );
      localStorage.setItem("name", data.data.data.name);
      if (data.data.data.name.includes("LobbyId")) {
        navigate("/lobby");
        localStorage.setItem("usertype", "lobby");
      } else {
        localStorage.setItem("usertype", menu);
        navigate("/admin/main");
      }
    },
    onError: (error) => {
      Swal.fire("실패", error.response.data.message, "error");
    },
  });

  const adminSignUpBtn = () => {
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
            />
            <TextField
              margin="normal"
              label="비밀번호"
              type={showPW ? "tel" : "password"}
              autoComplete={showPW ? "off" : "current-password"}
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
            />
            <StShowPW>
              <FormControlLabel
                control={
                  <Checkbox
                    value="allowExtraEmails"
                    color="primary"
                    required
                    onClick={() => {
                      setShowPW(!showPW);
                    }}
                  />
                }
                label="비밀번호 표시"
              />
            </StShowPW>
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
                background: "#49CDB5",
                borderRadius: 30,
                height: 50,
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
          <LoginFindForm>
            <Link
              onClick={() => {
                setShowIDModal(!showIDModal);
              }}
            >
              <StFindBtn>아이디 찾기</StFindBtn>
            </Link>
            <Link
              onClick={() => {
                setShowPWModal(!showPWModal);
              }}
            >
              <StFindBtn>비밀번호 찾기</StFindBtn>
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
                height: 50,
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
        {showIDModal === true ? (
          <SearchAdminId
            onClose={() => {
              setShowIDModal(false);
            }}
          />
        ) : null}
        {showPWModal === true ? (
          <SearchAdminPw
            onClose={() => {
              setShowPWModal(false);
            }}
          />
        ) : null}
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
width: 70%;
margin-top: 10%;
padding: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} 1s linear;
  justify-content: space-around;
`;
const StForm = styled.form``;

const InputForm = styled.div`
  margin-top: -50px;
`;

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
  cursor: pointer;
`;

const LoginFindForm = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: -20px;
  margin-bottom: 30px;
  gap: 30px;
`;

const StShowPW = styled.div`
  margin-left: 10px;
`;
