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
            helperText="Please enter a valid input"
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
            helperText="Please enter a valid input"
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
            helperText="Please enter a valid input"
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
            helperText="Please enter a valid input"
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
        <StAlready onClick={gotoLogin}>이미 회원이신가요? 로그인 하러 가기</StAlready>
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

const StAlready = styled.button`
  color: gray;
  font-size: 14px;
  font-weight: 700;
  background-color: transparent;
  border: 0;
  cursor: pointer;
`;
