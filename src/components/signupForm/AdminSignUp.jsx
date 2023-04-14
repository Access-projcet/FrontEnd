import React, { useState } from "react";
import { adminSignUpUser } from "../../api/api";
import { useMutation, useQueryClient } from "react-query";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import arrow from "../../utils/img/arrow_icon.png";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import Modal from "../modal/Modal";
import LoginCheckModal from "../modal/LoginCheckModal";
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

const AdminSignUp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  //validation 용
  const [userId, setUserId] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [businessNum, setBusinessNum] = useState("");
  const [companyToken, setCompanyToken] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [showPW, setShowPW] = useState(false);
  const [showCheckPW, setShowCheckPW] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const classes = useStyles();
  const mutation = useMutation(adminSignUpUser, {
    onSuccess: (response) => {
      queryClient.invalidateQueries("admin");
      setIsModalOpen(true);
    },
    onError: (response) => {
      alert(response.response.data.message);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newAdmin = {
      userId: data.get("userId"),
      password: data.get("password"),
      checkPassword: data.get("checkPassword"),
      name: data.get("name"),
      phoneNum: data.get("phoneNum"),
      businessNum: data.get("businessNum"),
      companyName: data.get("companyName"),
      companyToken: data.get("companyToken"),
    };
    mutation.mutate(newAdmin);
  };

  const gotoLogin = () => {
    navigate("/");
  };

  return (
    <>
      <DivLoginContainer>
        <StForm onSubmit={handleSubmit}>
          <TextField
            name="companyName"
            required
            fullWidth
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            label="회사 이름"
            autoFocus
            className={classes.root}
            sx={{
              marginTop: "-20px",
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
            error={companyName.trim() === ""}
            helperText={companyName.trim() === "" ? "회사이름을 입력해주세요" : " "}
            FormHelperTextProps={{
              sx: {
                color: "red",
                fontSize: "10px",
              },
            }}
          />

          <TextField
            required
            fullWidth
            id="businessNum"
            label="사업자 등록번호"
            name="businessNum"
            type="tel"
            value={businessNum}
            onChange={(e) => {
              let value = e.target.value.replace(/-/g, "");
              if (value.length === 10) {
                value = value.replace(/(\d{3})(\d{2})(\d{5})/, "$1-$2-$3");
              } else {
                value = value.slice(0, 10);
                value = value.replace(/(\d{3})(\d{2})(\d{5})/, "$1-$2-$3");
              }
              setBusinessNum(value);
            }}
            className={classes.root}
            sx={{
              marginTop: "-5px",
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
            error={businessNum.trim() !== "" && !/^\d{3}-\d{2}-\d{5}$/.test(businessNum)}
            helperText={
              businessNum.trim() !== "" && !/^\d{3}-\d{2}-\d{5}$/.test(businessNum)
                ? "사업자 등록번호는 XXX-XX-XXXXX 형식의 숫자만 입력 가능합니다"
                : " "
            }
            FormHelperTextProps={{
              sx: {
                color: "red",
                fontSize: "10px",
              },
            }}
          />

          <TextField
            required
            fullWidth
            id="companyToken"
            label="회사 코드"
            name="companyToken"
            value={companyToken}
            onChange={(e) => setCompanyToken(e.target.value)}
            className={classes.root}
            sx={{
              marginTop: "-5px",
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
            helperText={companyToken.trim() === "" ? "회사코드를 입력해주세요" : " "}
            FormHelperTextProps={{
              sx: {
                color: "red",
                fontSize: "10px",
              },
            }}
          />

          <TextField
            required
            fullWidth
            id="userId"
            label="아이디"
            name="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className={classes.root}
            sx={{
              marginTop: "-5px",
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
            error={userId.trim() !== "" && !/^[a-zA-Z0-9]{4,10}$/.test(userId)}
            helperText={
              userId.trim() !== "" && !/^[a-zA-Z0-9]{4,10}$/.test(userId)
                ? "아이디는 4~10자의 영문 대소문자와 숫자로만 입력하세요"
                : " "
            }
            FormHelperTextProps={{
              sx: {
                color: "red",
                fontSize: "10px",
              },
            }}
          />

          <TextField
            required
            fullWidth
            name="password"
            label="비밀번호"
            type={showPW ? "tel" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={classes.root}
            sx={{
              marginTop: "-5px",
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
                fontSize: "10px",
              },
            }}
          />
          {/* <StShowPW>
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
          </StShowPW> */}
          <TextField
            required
            fullWidth
            name="checkPassword"
            label="비밀번호 확인"
            type={showCheckPW ? "tel" : "password"}
            id="checkPassword"
            value={checkPassword}
            onChange={(e) => setCheckPassword(e.target.value)}
            className={classes.root}
            sx={{
              marginTop: "-5px",
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
            error={checkPassword.trim() !== "" && password !== checkPassword}
            helperText={
              checkPassword.trim() !== "" && password !== checkPassword ? "비밀번호가 일치하지 않습니다." : " "
            }
            FormHelperTextProps={{
              sx: {
                color: "red",
                fontSize: "10px",
              },
            }}
          />
          {/* <StShowCheckPW>
            <FormControlLabel
              control={
                <Checkbox
                  value="allowExtraEmails"
                  color="primary"
                  required
                  onClick={() => {
                    setShowCheckPW(!showCheckPW);
                  }}
                />
              }
              label="비밀번호 표시"
            />
          </StShowCheckPW> */}
          <TextField
            name="name"
            required
            fullWidth
            id="name"
            label="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={classes.root}
            sx={{
              marginTop: "-5px",
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
            helperText={name.trim() === "" ? "이름을 입력해주세요" : " "}
            FormHelperTextProps={{
              sx: {
                color: "red",
                fontSize: "10px",
              },
            }}
          />

          <TextField
            required
            fullWidth
            id="phoneNum"
            label="전화번호"
            name="phoneNum"
            value={phoneNum}
            onChange={(e) => {
              let value = e.target.value.replace(/-/g, "");
              if (value.length === 11) {
                value = value.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
              } else {
                value = value.slice(0, 11);
                value = value.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
              }
              setPhoneNum(value);
            }}
            className={classes.root}
            sx={{
              marginTop: "-5px",
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
            error={phoneNum.trim() !== "" && !/^010-\d{4}-\d{4}$/.test(phoneNum)}
            helperText={
              phoneNum.trim() !== "" && !/^010-\d{4}-\d{4}$/.test(phoneNum)
                ? "전화번호는 010-xxxx-xxxx 형식의 숫자만 입력 가능합니다"
                : " "
            }
            FormHelperTextProps={{
              sx: {
                color: "red",
                fontSize: "10px",
              },
            }}
          />
          <FormControlLabel
            control={<Checkbox value="allowExtraEmails" color="primary" required />}
            label="개인정보 제공에 동의합니다"
          />
          <StLoginBtn>
            <Button
              className={classes.button}
              type="submit"
              fullWidth
              variant="contained"
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
              Sign Up
            </Button>
            <StloginImg src={arrow} alt="로그인버튼" />
          </StLoginBtn>
        </StForm>
        <StAlready onClick={gotoLogin}>이미 회원이신가요? 로그인 하러 가기</StAlready>
      </DivLoginContainer>
      {isModalOpen && (
        <Modal
          onClose={() => {
            setIsModalOpen(false);
          }}
          children={<LoginCheckModal />}
        />
      )}
    </>
  );
};

export default AdminSignUp;

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
  padding: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} 1s linear;
  justify-content: space-around;
`;
const StForm = styled.form`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  gap: 8px;
  width: 400px;
`;
const StLoginBtn = styled.div`
  position: relative;
  margin-top: -10px;
`;
const StloginImg = styled.img`
  position: absolute;
  top: 40%;
  right: 10%;
`;

const StAlready = styled.button`
  color: gray;
  font-size: 14px;
  font-weight: 700;
  background-color: transparent;
  border: 0;
  cursor: pointer;
`;

const StShowPW = styled.div`
  margin-top: -25px;
  margin-left: 10px;
`;

const StShowCheckPW = styled.div`
  margin-top: -25px;
  margin-left: 10px;
`;
