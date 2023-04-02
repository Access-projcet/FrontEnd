import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useMutation, useQueryClient } from "react-query";
import { guestSignUp } from "../../apis/api";
import { useNavigate } from "react-router";
import styled, { keyframes } from "styled-components";
import { makeStyles } from "@mui/styles";
import arrow from "../../utils/img/arrow_icon.png";
import Modal from "../modal/Modal";
import SignUpCheckModal from "../modal/SignUpCheckModal";
import { Checkbox, FormControlLabel } from "@mui/material";

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

export default function SignUp() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  //validation 용
  const [name, setName] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordCheck, setPasswordCheck] = React.useState("");
  const [phoneNum, setPhoneNum] = React.useState("");

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const classes = useStyles();
  const mutation = useMutation(guestSignUp, {
    onSuccess: (response) => {
      queryClient.invalidateQueries("guest");
      setIsModalOpen(true);
    },
    onError: (response) => {
      alert(response.response.data.message);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newGuest = {
      userId: data.get("userId"),
      password: data.get("password"),
      name: data.get("name"),
      phoneNum: data.get("phoneNum"),
    };
    mutation.mutate(newGuest);
  };
  const gotoLogin = () => {
    navigate("/");
  };

  return (
    <>
      <DivLoginContainer>
        <StForm onSubmit={handleSubmit}>
          <TextField
            name="name"
            required
            fullWidth
            id="name"
            label="이름"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            helperText={name.trim() === "" ? "이름을 입력해주세요" : " "}
            FormHelperTextProps={{
              sx: {
                color: "red",
              },
            }}
          />
          <TextField
            required
            fullWidth
            id="userId"
            label="아이디"
            name="userId"
            className={classes.root}
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
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
            error={userId.trim() !== "" && !/^[a-zA-Z0-9]{4,10}$/.test(userId)}
            helperText={
              userId.trim() !== "" && !/^[a-zA-Z0-9]{4,10}$/.test(userId)
                ? "아이디는 4~10자의 영문 대소문자와 숫자로만 입력하세요"
                : " "
            }
            FormHelperTextProps={{
              sx: {
                color: "red",
              },
            }}
          />
          <TextField
            required
            fullWidth
            name="password"
            label="비밀번호"
            type="password"
            id="password"
            className={classes.root}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            error={
              password.trim() !== "" &&

              !/^([a-zA-Z0-9!@#$%^&*()_+={}|:;"'`<>,.?]){8,15}$/.test(password)
            }
            helperText={
              password.trim() !== "" &&
              !/^([a-zA-Z0-9!@#$%^&*()_+={}|:;"'`<>,.?]){8,15}$/.test(password)
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
            required
            fullWidth
            name="passwordCheck"
            label="비밀번호 확인"
            type="password"
            id="passwordCheck"
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
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
            error={passwordCheck.trim() !== "" && password !== passwordCheck}
            helperText={
              passwordCheck.trim() !== "" && password !== passwordCheck
                ? "비밀번호가 일치하지 않습니다."
                : " "
            }
            FormHelperTextProps={{
              sx: {
                color: "red",
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
            onChange={(e) => setPhoneNum(e.target.value)}
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
            error={
              phoneNum.trim() !== "" && !/^010-\d{4}-\d{4}$/.test(phoneNum)
            }
            helperText={
              phoneNum.trim() !== "" && !/^010-\d{4}-\d{4}$/.test(phoneNum)
                ? "전화번호는 010-xxxx-xxxx 형식의 숫자만 입력 가능합니다"
                : " "
            }
            FormHelperTextProps={{
              sx: {
                color: "red",
              },
            }}
          />
          <FormControlLabel
            control={
              <Checkbox value="allowExtraEmails" color="primary" required />
            }
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
                background: "#636FD7",
                borderRadius: 30,
                height: "60px",
                "&:hover": {
                  background: "#636FD7",
                },
              }}
              size="large"
            >
              회원가입 하기
            </Button>
            <StloginImg src={arrow} alt="로그인버튼" />
          </StLoginBtn>
        </StForm>
        <StAlready onClick={gotoLogin}>
          이미 회원이신가요? 로그인 하러 가기
        </StAlready>
      </DivLoginContainer>
      {isModalOpen && (
        <Modal
          onClose={() => {
            setIsModalOpen(false);
          }}
          children={<SignUpCheckModal />}
        />
      )}
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
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} 1s linear;
  justify-content: space-around;
`;
const StForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 500px;
`;
const StLoginBtn = styled.div`
  position: relative;
`;
const StloginImg = styled.img`
  position: absolute;
  top: 40%;
  right: 10%;
`;

// const StFindBtn = styled.div`
//   color: black;
//   margin-top: 30px;
// `;

const StAlready = styled.button`
  color: gray;
  font-size: 14px;
  font-weight: 700;
  background-color: transparent;
  border: 0;
  cursor: pointer;
`;
