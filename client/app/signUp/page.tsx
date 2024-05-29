"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { textFieldStyle } from "@/styles/textField";
import { buttonStyle } from "@/styles/button";
import StepConnector from "@mui/material/StepConnector";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { formControlStyle, radioStyle } from "@/styles/radioButton";
import { CustomStepIcon, CustomStepLabel } from "@/styles/stepper";
import InputAdornment from "@mui/material/InputAdornment";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

const steps = ["Sign Up", "Personal Info", "Dietary Restrictions"];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [workout, setWorkout] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setWorkout(event.target.value as string);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep === 0) {
      window.location.href = "/";
      return;
    }
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
              {/* first name */}
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
              {/* last name */}
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
              {/* email */}
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
              {/* password */}
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
              {/* password 2 */}
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
        return (
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {/* gender */}
              <Grid item xs={12}>
                <FormControl sx={formControlStyle}>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="male"
                      control={<Radio sx={radioStyle} />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="female"
                      control={<Radio sx={radioStyle} />}
                      label="Female"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              {/* age */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="age"
                  label="Age"
                  name="age"
                  autoComplete="age"
                  InputProps={{
                    style: textFieldStyle.input,
                    sx: textFieldStyle,
                    endAdornment: (
                      <InputAdornment position="end">years</InputAdornment>
                    ),
                  }}
                  InputLabelProps={{
                    style: textFieldStyle["& .MuiInputLabel-root"],
                  }}
                />
              </Grid>
              {/* height */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="height"
                  label="Height"
                  name="height"
                  autoComplete="height"
                  InputProps={{
                    style: textFieldStyle.input,
                    sx: textFieldStyle,
                    endAdornment: (
                      <InputAdornment position="end">cm</InputAdornment>
                    ),
                  }}
                  InputLabelProps={{
                    style: textFieldStyle["& .MuiInputLabel-root"],
                  }}
                />
              </Grid>
              {/* weight */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="weight"
                  label="Weight"
                  name="weight"
                  autoComplete="weight"
                  InputProps={{
                    style: textFieldStyle.input,
                    sx: textFieldStyle,
                    endAdornment: (
                      <InputAdornment position="end">kg</InputAdornment>
                    ),
                  }}
                  InputLabelProps={{
                    style: textFieldStyle["& .MuiInputLabel-root"],
                  }}
                />
              </Grid>
              {/* workout goals */}
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  sx={textFieldStyle["& .MuiFormControl-root"]}
                >
                  <InputLabel
                    id="demo-simple-select-label"
                    style={textFieldStyle["& .MuiInputLabel-root"]}
                  >
                    Workout Goals
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={workout}
                    label="Workout Goals"
                    onChange={handleChange}
                    sx={{
                      "& .MuiSelect-root": textFieldStyle["& .MuiSelect-root"],
                      "& .MuiOutlinedInput-notchedOutline":
                        textFieldStyle["& .MuiOutlinedInput-notchedOutline"],
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                        textFieldStyle[
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline"
                        ],
                      "&:hover .MuiOutlinedInput-notchedOutline":
                        textFieldStyle[
                          "&:hover .MuiOutlinedInput-notchedOutline"
                        ],
                      "& .MuiSelect-icon": textFieldStyle["& .MuiSelect-icon"],
                      "& .MuiMenuItem-root":
                        textFieldStyle["& .MuiMenuItem-root"],
                      "& .Mui-selected": textFieldStyle["& .Mui-selected"],
                    }}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        );
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
        backgroundImage: "url('/signUpBg.jpg')", // path to background image
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
                  <Button
                    onClick={handleReset}
                    variant="contained"
                    color="primary"
                  >
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
                    onClick={handleBack}
                    sx={{
                      mt: 3,
                      mb: 2,
                      backgroundColor: "#d9dddc",
                      color: "black",
                      "&:hover": {
                        backgroundColor: "#c0c4c3",
                      },
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
