import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { SearchAdminID } from "../../api/api";
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

function SearchAdminId({ onClose }) {
  const [name, setName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [email, setEmail] = useState("");

  const classes = useStyles();

  const queryClient = useQueryClient();
  const mutation = useMutation(SearchAdminID, {
    onSuccess: (response) => {
      console.log(response.data.message);
      alert("이메일로 아이디를 발송했습니다.");
      queryClient.invalidateQueries("user");
      onClose();
    },
    onError: (error) => {
      alert(error.response.data.message);
    },
  });

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const searchAdminID = {
      name,
      phoneNum,
      email,
    };
    console.log({
      name,
      phoneNum,
      email,
    });

    mutation.mutate(searchAdminID);
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
          <h3>아이디 찾기</h3>
          <InputForm>
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
            />
            <TextField
              margin="normal"
              label="전화번호"
              name="phoneNum"
              value={phoneNum}
              onChange={(e) => setPhoneNum(e.target.value)}
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
            />
          </InputForm>
          <StCheckBtn>확인</StCheckBtn>
        </StForm>
      </DivLoginContainer>
    </>
  );
}

export default SearchAdminId;

const InputForm = styled.div`
  margin: 70px;
  align-items: center;
  margin-top: 10px;
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
