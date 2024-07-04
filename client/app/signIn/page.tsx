"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Image from "next/image";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { useLoginMutation } from "@/app/services/authApi";
import Link from "next/link";
import "../../styles/signIn.css";
import CustomTextField from "../components/CustomTextField";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const [loginUser, { isLoading, isError }] = useLoginMutation();
  const [error, setError] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const user = await loginUser({
        email,
        password,
      }).unwrap();
      localStorage.setItem("user", JSON.stringify(user));
      window.location.href = "/feed";
    } catch (error) {
      setError(
        "Failed to log in. Please check your credentials and try again."
      );
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      {/* image */}
      <Grid
        item
        xs={false}
        sm={false}
        md={8}
        sx={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          display: {
            xs: "none",
            sm: "none",
            md: "block"
          }
        }}
      >
        <Image
          src={require("../images/signIn/signInBg.png")}
          alt="bg"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </Grid>
      {/* sign in form */}
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
        sx={{ height: "100vh", backgroundColor: "white" }}
      >
        <Box
          className="signInForm"
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography className="title">Sign in</Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            onSubmit={handleSubmit}
          >
            <CustomTextField
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <CustomTextField
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              type="password"
            />
            <Button
              className="signInButton"
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : "Sign In"}
            </Button>
            <div className="orDivider">
              <hr className="orLine" />
              <span className="orText">OR</span>
              <hr className="orLine" />
            </div>
            <Button className="googleButton" fullWidth variant="contained">
              Sign in with Google
            </Button>
            <Typography>
              Don&apos;t have an account?
              <Link className="signUpLink" href="/signUp">
                {" Sign Up"}
              </Link>
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
