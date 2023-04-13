import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { SearchAdminPW } from "../../api/api";
import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";

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

function SearchAdminPw({ onClose }) {
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [email, setEmail] = useState("");

  const classes = useStyles();

  const queryClient = useQueryClient();
  const mutation = useMutation(SearchAdminPW, {
    onSuccess: (response) => {
      console.log(response.data.message);
      alert("이메일로 비밀번호를 발송했습니다.");
      queryClient.invalidateQueries("user");
      onClose();
    },
    onError: (error) => {
      alert(error.response.data.message);
    },
  });

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const searchAdminPW = {
      userId,
      name,
      phoneNum,
      email,
    };
    console.log({
      userId,
      name,
      phoneNum,
      email,
    });
    mutation.mutate(searchAdminPW);
  };

  return (
    <>
      <DivLoginContainer>
        <CloseIcon
          onClick={onClose}
          style={{
            fontSize: "xx-large",
            color: "#B1B1B1",
            cursor: "pointer",
            position: "absolute",
            top: "10px",
            right: "15px",
          }}
        ></CloseIcon>
        <StForm onSubmit={onSubmitHandler}>
          <h3>비밀번호 찾기</h3>
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
              error={
                userId.trim() !== "" && !/^[a-zA-Z0-9]{4,10}$/.test(userId)
              }
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
              margin="normal"
              label="이름"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              error={name.trim() === ""}
              helperText={name.trim() === "" ? "이름을 입력해주세요" : " "}
              FormHelperTextProps={{
                sx: {
                  color: "red",
                },
              }}
            />
            <TextField
              margin="normal"
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
            <TextField
              margin="normal"
              label="e-mail"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                email.trim() !== "" &&
                !/^[A-Za-z0-9_-]+@[A-Za-z0-9]+\.[A-Za-z0-9]+/.test(email)
              }
              helperText={
                email.trim() !== "" &&
                !/^[A-Za-z0-9_-]+@[A-Za-z0-9]+\.[A-Za-z0-9]+/.test(email)
                  ? "이메일형식이 올바르지 않습니다"
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
    </>
  );
}

export default SearchAdminPw;

const InputForm = styled.div`
  margin: 70px;
  align-items: center;
  margin-top: -20px;
  margin-bottom: 10px;
`;

const DivLoginContainer = styled.div`
  position: absolute;
  width: 547px;
  height: 500px;
  top: 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  z-index: 1000;
`;

const StCheckBtn = styled.button`
  background-color: #49cdb5;
  border-radius: 35px;
  width: 120px;
  height: 48px;
  color: white;
  font-size: 16px;
  font-weight: 700;
`;

const StForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding-top: -40px;
  gap: 10px;
`;
