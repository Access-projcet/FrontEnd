import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import styled from "styled-components";
import mainImg from "../utils/img/background.png";
import mainLogo from "../utils/img/VISITUS_logo@2x.png";
import { useNavigate } from "react-router-dom";
import { ChangeAdminPW } from "../api/api";
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

function ChangeGuestPw() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const navigate = useNavigate();

  const classes = useStyles();

  const queryClient = useQueryClient();
  const mutation = useMutation(ChangeAdminPW, {
    onSuccess: (response) => {
      console.log(response.data.message);
      alert(response.data.message);
      queryClient.invalidateQueries("user");
      navigate("/");
    },
    onError: (error) => {
      alert(error.response.data.message);
    },
  });

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const changeAdminPW = {
      password,
      newPassword,
      checkPassword,
    };
    console.log({
      password,
      newPassword,
      checkPassword,
    });
    mutation.mutate(changeAdminPW);
  };

  return (
    <>
      <StLogo src={mainLogo} alt="VISITUS 로고" />
      <StMainBackground src={mainImg} alt="VISITUS 메인" />

      <StContainer>
        <DivLoginContainer>
          <StForm onSubmit={onSubmitHandler}>
            <h2>비밀번호 변경</h2>
            <InputForm>
              <TextField
                margin="normal"
                label="현재 비밀번호"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                error={
                  password.trim() !== "" &&
                  !/^([a-zA-Z0-9!@#$%^&*()_+={}|:;"'`<>,.?]){8,15}$/.test(
                    password
                  )
                }
                helperText={
                  password.trim() !== "" &&
                  !/^([a-zA-Z0-9!@#$%^&*()_+={}|:;"'`<>,.?]){8,15}$/.test(
                    password
                  )
                    ? "비밀번호는 8~15자리의 영대소문자, 숫자, 특수문자로만 입력 가능합니다"
                    : " "
                }
                FormHelperTextProps={{
                  sx: {
                    color: "red",
                  },
                }}
              />
              <TextField
                margin="normal"
                label="새 비밀번호"
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
                error={
                  newPassword.trim() !== "" &&
                  !/^([a-zA-Z0-9!@#$%^&*()_+={}|:;"'`<>,.?]){8,15}$/.test(
                    newPassword
                  )
                }
                helperText={
                  newPassword.trim() !== "" &&
                  !/^([a-zA-Z0-9!@#$%^&*()_+={}|:;"'`<>,.?]){8,15}$/.test(
                    newPassword
                  )
                    ? "비밀번호는 8~15자리의 영대소문자, 숫자, 특수문자로만 입력 가능합니다"
                    : " "
                }
                FormHelperTextProps={{
                  sx: {
                    color: "red",
                  },
                }}
              />
              <TextField
                margin="normal"
                label="새 비밀번호 확인"
                type="password"
                name="checkPassword"
                value={checkPassword}
                onChange={(e) => setCheckPassword(e.target.value)}
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
                error={
                  checkPassword.trim() !== "" && newPassword !== checkPassword
                }
                helperText={
                  checkPassword.trim() !== "" && newPassword !== checkPassword
                    ? "비밀번호가 일치하지 않습니다."
                    : " "
                }
                FormHelperTextProps={{
                  sx: {
                    color: "red",
                  },
                }}
              />
            </InputForm>
            <StCheckBtn>확인</StCheckBtn>
          </StForm>
        </DivLoginContainer>
      </StContainer>
    </>
  );
}

export default ChangeGuestPw;

const StContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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

const InputForm = styled.div`
  position: relative;
  margin: 70px;
  align-items: center;
  /* margin-top: -20px; */
  margin-bottom: 10px;
`;

const DivLoginContainer = styled.div`
  position: relative;
  width: 30%;
  height: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 30px;
`;

const StCheckBtn = styled.button`
  position: relative;
  background-color: #49cdb5;
  border-radius: 35px;
  width: 120px;
  height: 48px;
  color: white;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
`;

const StForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding-top: -40px;
  gap: 10px;
`;
