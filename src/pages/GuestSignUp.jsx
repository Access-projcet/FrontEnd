import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { MuiTelInput } from "mui-tel-input";
import { FormControl, FormHelperText } from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import { guestSignUp } from "../apis/api";
import { useNavigate } from "react-router";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const [name, setName] = React.useState("");
  const [guestId, setGuestId] = React.useState("");
  const [guestPw, setGuestPw] = React.useState("");
  const [guestPwCheck, setGuestPwCheck] = React.useState("");
  const [phoneNum, setPhoneNum] = React.useState("");
  const [phone, setPhone] = React.useState("+82");

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation(guestSignUp, {
    onSuccess: (response) => {
      queryClient.invalidateQueries("guest");
      console.log(response.data.username);
      navigate("/");
      alert("회원가입 되셨습니다!!");
    },
    onError: (response) => {
      alert(response.response.data.message);
    },
  });

  const handleChange = (newPhone) => {
    setPhone(newPhone);
  };

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

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField name="name" required fullWidth id="name" label="이름" autoFocus />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth id="userId" label="아이디" name="userId" />
                {/* <TextField

                  error
                  required
                  fullWidth
                  id="userId"
                  label="아이디"
                  name="userId"
                  helperText="양식에 맞지 않습니다."
                /> */}
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth name="password" label="비밀번호" type="password" id="password" />
                <TextField
                  error
                  fullWidth
                  name="password"
                  label="비밀번호"
                  type="password"
                  id="password"
                  helperText="양식에 맞지 않습니다."
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="passwordCheck"
                  label="비밀번호 확인"
                  type="password"
                  id="passwordCheck"
                />
                <TextField
                  error
                  fullWidth
                  name="passwordCheck"
                  label="비밀번호 확인"
                  type="password"
                  id="passwordCheck"
                  helperText="비밀번호가 일치하지 않습니다."
                />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth id="phoneNum" label="전화번호" name="phoneNum" />
              </Grid>
              <Grid item xs={12}>
                <FormControl size="sm" sx={{ width: 400 }}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="약관에 동의합니다"
                  />
                  <FormHelperText>
                    <Typography>
                      <Link href="#link">약관 읽기</Link>.
                    </Typography>
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              회원가입 하기
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  이미 회원가입이 되어있습니까?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
