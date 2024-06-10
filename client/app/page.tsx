"use client";

import * as React from "react";
import { useRouter } from 'next/navigation'; // Ensure to use 'next/navigation' for Next.js App Router
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
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { textFieldStyle } from "../styles/textField";
import { buttonStyle } from "@/styles/button";
import { useLoginMutation } from "@/app/services/authApi";

export default function SignIn() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter(); // Use useRouter hook

  const [loginUser, { isLoading, isError }] = useLoginMutation();
  const [error, setError] = React.useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const user = await loginUser({
        email,
        password,
      }).unwrap();
      console.log('User logged in:', user); // Debugging statement
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/profile"); // Navigate to profile page
    } catch (error) {
      console.error('Login error:', error);
      setError("Failed to log in. Please check your credentials and try again.");
    }
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
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                style: textFieldStyle.input,
                sx: textFieldStyle,
              }}
              InputLabelProps={{
                style: textFieldStyle["& .MuiInputLabel-root"],
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                style: textFieldStyle.input,
                sx: textFieldStyle,
              }}
              InputLabelProps={{
                style: textFieldStyle["& .MuiInputLabel-root"],
              }}
            />
            {isError && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, ...buttonStyle }}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : "Sign In"}
            </Button>
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
