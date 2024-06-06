"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { textFieldStyle } from "../styles/textField";
import { buttonStyle } from "@/styles/button";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { authApi, useLoginMutation } from "@/app/services/authApi";
import { Provider } from "react-redux";
import { store } from "@/app/store";

export default function SignIn() {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={false}
        md={8}
        sx={{
          backgroundImage: "url(/signInBg.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid
        item
        xs={12}
        sm={12}
        md={4}
        component={Paper}
        elevation={6}
        square
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100vh", backgroundColor: "#222021" }}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" style={{ color: "white" }}>
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            onSubmit={handleSubmit}
          >
            {/* email */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
              InputProps={{
                style: textFieldStyle.input,
                sx: textFieldStyle,
              }}
              InputLabelProps={{
                style: textFieldStyle["& .MuiInputLabel-root"],
              }}
            />
            {/* password */}
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
              InputProps={{
                style: textFieldStyle.input,
                sx: textFieldStyle,
              }}
              InputLabelProps={{
                style: textFieldStyle["& .MuiInputLabel-root"],
              }}
            />
            {/* submit button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                ...buttonStyle,
              }}
            >
              Sign In
            </Button>
            {/* go to sign up page */}
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/signUp" variant="body2" sx={{ color: "white" }}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
