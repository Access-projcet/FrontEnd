import React, { useState } from "react";
import { adminSignUpUser } from "../../apis/api";
import { useMutation, useQueryClient } from "react-query";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import arrow from "../../utils/img/arrow_icon.png";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
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
      name: data.get("name"),
      phoneNum: data.get("phoneNum"),
      businessNum: data.get("businessNum"),
      companyName: data.get("companyName"),
      companyToken: data.get("companyToken"),
    };
    console.log({
      userId: data.get("userId"),
      password: data.get("password"),
      name: data.get("name"),
      phoneNum: data.get("phoneNum"),
      businessNum: data.get("businessNum"),
      companyName: data.get("companyName"),
      companyToken: data.get("companyToken"),
    });
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
            label="회사 이름"
            autoFocus
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
            required
            fullWidth
            id="businessNum"
            label="사업자 등록번호"
            name="businessNum"
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
            required
            fullWidth
            id="companyToken"
            label="회사 코드"
            name="companyToken"
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
            required
            fullWidth
            id="userId"
            label="ID"
            name="userId"
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
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
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
            name="name"
            required
            fullWidth
            id="name"
            label="이름"
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
            required
            fullWidth
            id="phoneNum"
            label="전화번호"
            name="phoneNum"
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
                height: "60px",
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
          children={<SignUpCheckModal />}
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
