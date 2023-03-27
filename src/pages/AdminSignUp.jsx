import React from "react";
import { adminSignUpUser } from "../apis/api";
import { useMutation, useQueryClient } from "react-query";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

const AdminSignUp = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(adminSignUpUser, {
    onSuccess: (response) => {
      console.log(response);
      queryClient.invalidateQueries("admin");
    },
    onError: (error) => {
      alert(error);
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            관리자 회원가입
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="companyName"
                  required
                  fullWidth
                  id="companyName"
                  label="회사 이름"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="businessNum"
                  label="사업자 등록번호"
                  name="businessNum"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="companyToken"
                  label="회사 코드"
                  name="companyToken"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="userId"
                  label="ID"
                  name="userId"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="이름"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="phoneNum"
                  label="전화번호"
                  name="phoneNum"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="allowExtraEmails"
                      color="primary"
                      required
                    />
                  }
                  label="개인정보 제공에 동의합니다"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  이미 계정이 있나요? 로그인 하기
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default AdminSignUp;
