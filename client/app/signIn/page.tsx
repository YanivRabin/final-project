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
import CustomTextField from "../components/CustomTextField";

const styles = {
  title: {
    fontFamily: "'Inria Sans', sans-serif",
    color: "#3d2d69",
    fontSize: "52px",
  },
  signInForm: {
    border: "3px solid #4e2a84",
    padding: "20px 0",
    borderRadius: "8px",
    width: "350px",
    height: "510px",
  },
  signInButton: {
    backgroundColor: "#4e2a84",
    color: "white",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    margin: "15px 0",
    "&:hover": {
      backgroundColor: "#7158b6",
    },
  },
  orDivider: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "10px 0",
  },
  orLine: {
    flex: 1,
    border: "none",
    borderTop: "1px solid #ccc",
  },
  orText: {
    margin: "0 10px",
    color: "#666",
    fontSize: "14px",
    fontWeight: "bold",
    textTransform: "uppercase" as "uppercase",
  },
  googleButton: {
    backgroundColor: "#4285f4",
    color: "white",
    borderRadius: "8px",
    fontSize: "16px",
    margin: "10px 0 20px 0",
  },
  signUpLink: {
    color: "#4e2a84",
    fontSize: "16px",
    fontWeight: "bold",
    textDecoration: "none",
  },
};

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
      // need to add the plan data to local storage (get from server)
      router.push("/home");
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
            md: "block",
          },
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
          sx={{
            ...styles.signInForm,
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography sx={styles.title}>Sign in</Typography>
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
              sx={styles.signInButton}
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : "Sign In"}
            </Button>
            <div style={styles.orDivider}>
              <hr style={styles.orLine} />
              <span style={styles.orText}>OR</span>
              <hr style={styles.orLine} />
            </div>
            <Button sx={styles.googleButton} fullWidth variant="contained">
              Sign in with Google
            </Button>
            <Typography>
              Don&apos;t have an account?
              <Link href="/signUp" style={styles.signUpLink}>
                {" Sign Up"}
              </Link>
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
