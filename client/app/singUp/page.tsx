"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { textFieldStyle } from "@/styles/textField"; // Adjust import path as necessary
import { buttonStyle } from "@/styles/button"; // Adjust import path as necessary
import StepConnector from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";
import StepIcon from "@mui/material/StepIcon";

const steps = ["Personal Info", "Workout", "Medical and Nutrition"]; // Adjust steps as needed

const CustomStepIcon = styled(StepIcon)(({ theme }) => ({
  color: "#4E2A84",
  "& .MuiStepIcon-text": {
    fill: "white", // Change the number inside the circle to white
    fontSize: "0.75rem"
  },
  "&.Mui-completed": {
    color: "#4E2A84",
  },
  "&.Mui-active": {
    color: "#4E2A84",
  },
}));

const CustomStepLabel = styled(StepLabel)(({ theme }) => ({
  "& .MuiStepLabel-label": {
    color: "white", // Change the label text color to white
    "&.Mui-active": {
      color: "white",
    },
    "&.Mui-completed": {
      color: "white",
    },
  },
}));

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  InputProps={{
                    style: textFieldStyle.input,
                    sx: textFieldStyle,
                  }}
                  InputLabelProps={{
                    style: textFieldStyle["& .MuiInputLabel-root"],
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  InputProps={{
                    style: textFieldStyle.input,
                    sx: textFieldStyle,
                  }}
                  InputLabelProps={{
                    style: textFieldStyle["& .MuiInputLabel-root"],
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  InputProps={{
                    style: textFieldStyle.input,
                    sx: textFieldStyle,
                  }}
                  InputLabelProps={{
                    style: textFieldStyle["& .MuiInputLabel-root"],
                  }}
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
                  InputProps={{
                    style: textFieldStyle.input,
                    sx: textFieldStyle,
                  }}
                  InputLabelProps={{
                    style: textFieldStyle["& .MuiInputLabel-root"],
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password2"
                  label="Password Confirmation"
                  type="password"
                  id="password2"
                  autoComplete="new-password"
                  InputProps={{
                    style: textFieldStyle.input,
                    sx: textFieldStyle,
                  }}
                  InputLabelProps={{
                    style: textFieldStyle["& .MuiInputLabel-root"],
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 1:
        return "Select campaign settings"; // Placeholder for second step content
      case 2:
        return "Create an ad group"; // Placeholder for third step content
      default:
        return "Unknown step";
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh", // Ensure the page covers the full viewport height
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url('/singUpBg.jpg')", // path to background image
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{ width: "100%", backgroundColor: "#222021", padding: "20px" }}
        >
          <Stepper activeStep={activeStep} connector={<StepConnector />}>
            {steps.map((label, index) => (
              <Step key={label}>
                <CustomStepLabel StepIconComponent={CustomStepIcon}>
                  {label}
                </CustomStepLabel>
              </Step>
            ))}
          </Stepper>
          <Box sx={{ mt: 3 }}>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1, color: "white" }}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={handleReset} variant="contained" color="primary">
                    Reset
                  </Button>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1, color: "white" }}>
                  {getStepContent(activeStep)}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ 
                      mt: 3,
                      mb: 2,
                      backgroundColor: "#d9dddc",
                      color: "black",
                      "&:hover": {
                        backgroundColor: "#c0c4c3",
                      }
                    }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button
                    onClick={handleNext}
                    sx={{
                      mt: 3,
                      mb: 2,
                      ...buttonStyle,
                    }}
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
