import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import styled from "styled-components";
import mainImg from "../utils/img/background.png";
import mainLogo from "../utils/img/VISITUS_logo@2x.png";
import { useNavigate } from "react-router-dom";
import { ChangeAdminPW } from "../api/api";
import HomeIcon from "@mui/icons-material/Home";
import { Checkbox, FormControlLabel } from "@mui/material";
import Swal from "sweetalert2";

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
  const [showPW, setShowPW] = useState(false);
  const [showNewPW, setShowNewPW] = useState(false);
  const [showCheckPW, setShowCheckPW] = useState(false);

  const navigate = useNavigate();

  const classes = useStyles();

  const queryClient = useQueryClient();
  const mutation = useMutation(ChangeAdminPW, {
    onSuccess: (response) => {
      Swal.fire("성공", "비밀번호가 변경되었습니다", "success");
      queryClient.invalidateQueries("user");
      navigate("/");
    },
    onError: (error) => {
      Swal.fire("실패", error.response.data.message, "error");
    },
  });

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const changeAdminPW = {
      password,
      newPassword,
      checkPassword,
    };

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
            <HomeIcon
              fontSize="large"
              type="button"
              onClick={() => {
                navigate("/");
              }}
              style={{
                cursor: "pointer",
                position: "absolute",
                top: "25px",
                left: "40px",
              }}
            />
            <InputForm>
              <TextField
                margin="normal"
                label="현재 비밀번호"
                name="password"
                type={showPW ? "tel" : "password"}
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
                error={password.trim() !== "" && !/^([a-zA-Z0-9!@#$%^&*()_+={}|:;"'`<>,.?]){8,15}$/.test(password)}
                helperText={
                  password.trim() !== "" && !/^([a-zA-Z0-9!@#$%^&*()_+={}|:;"'`<>,.?]){8,15}$/.test(password)
                    ? "비밀번호는 8~15자리의 영대소문자, 숫자, 특수문자로만 입력 가능합니다"
                    : " "
                }
                FormHelperTextProps={{
                  sx: {
                    color: "red",
                  },
                }}
              />
              <StShowPW>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="allowExtraEmails"
                      color="primary"
                      onClick={() => {
                        setShowPW(!showPW);
                      }}
                    />
                  }
                  label="비밀번호 표시"
                />
              </StShowPW>
              <TextField
                margin="normal"
                label="새 비밀번호"
                type={showNewPW ? "tel" : "password"}
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
                  newPassword.trim() !== "" && !/^([a-zA-Z0-9!@#$%^&*()_+={}|:;"'`<>,.?]){8,15}$/.test(newPassword)
                }
                helperText={
                  newPassword.trim() !== "" && !/^([a-zA-Z0-9!@#$%^&*()_+={}|:;"'`<>,.?]){8,15}$/.test(newPassword)
                    ? "비밀번호는 8~15자리의 영대소문자, 숫자, 특수문자로만 입력 가능합니다"
                    : " "
                }
                FormHelperTextProps={{
                  sx: {
                    color: "red",
                  },
                }}
              />
              <StShowPW>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="allowExtraEmails"
                      color="primary"
                      onClick={() => {
                        setShowNewPW(!showNewPW);
                      }}
                    />
                  }
                  label="비밀번호 표시"
                />
              </StShowPW>
              <TextField
                margin="normal"
                label="새 비밀번호 확인"
                type={showCheckPW ? "tel" : "password"}
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
                error={checkPassword.trim() !== "" && newPassword !== checkPassword}
                helperText={
                  checkPassword.trim() !== "" && newPassword !== checkPassword ? "비밀번호가 일치하지 않습니다." : " "
                }
                FormHelperTextProps={{
                  sx: {
                    color: "red",
                  },
                }}
              />
              <StShowPW>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="allowExtraEmails"
                      color="primary"
                      onClick={() => {
                        setShowCheckPW(!showCheckPW);
                      }}
                    />
                  }
                  label="비밀번호 표시"
                />
              </StShowPW>
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
  top: 12%;
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

const InputForm = styled.div`
  min-width: 300px;
  width: 25vw;
  margin: 20px 20px;
  align-items: center;
`;

const DivLoginContainer = styled.div`
  min-width: 500px;
  position: fixed;
  width: 30%;
  height: 65%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 30px;
`;

const StCheckBtn = styled.button`
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
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding-top: -40px;
  gap: 10px;
  width: 100%;
`;

const StShowPW = styled.div`
  margin-top: -22px;
  margin-left: 10px;
`;
