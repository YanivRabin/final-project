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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Slider from "@mui/material/Slider";
import Input from "@mui/material/Input";
import { sliderStyle, inputStyle } from "@/styles/slider";
import Checkbox from "@mui/material/Checkbox";
import { checkboxStyle } from "@/styles/checkbox";

const steps = ["Sign Up", "Personal Info", "Dietary Restrictions"];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
    gender: "",
    age: 25,
    height: 175,
    weight: 70,
    workoutGoals: "",
    daysPerWeek: 0,
    minutesPerWorkout: 0,
    includeWarmup: false,
    includeStreching: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
  // get stepper content
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
                  value={formData.firstName}
                  onChange={handleInputChange}
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
                  value={formData.lastName}
                  onChange={handleInputChange}
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
                  value={formData.email}
                  onChange={handleInputChange}
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
                  value={formData.password}
                  onChange={handleInputChange}
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
                  value={formData.password2}
                  onChange={handleInputChange}
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
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
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
              {/* Age */}
              <Grid item xs={12}>
                <Box>
                  <Typography id="input-slider-age" gutterBottom>
                    Age
                  </Typography>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs>
                      <Slider
                        value={formData.age}
                        onChange={(e, value) => {
                          setFormData({ ...formData, age: value as number });
                        }}
                        aria-labelledby="input-slider-age"
                        name="age"
                        min={0}
                        max={100}
                        sx={sliderStyle}
                      />
                    </Grid>
                    <Grid item>
                      <Input
                        value={formData.age}
                        size="small"
                        onChange={handleInputChange}
                        name="age"
                        inputProps={{
                          step: 1,
                          min: 0,
                          max: 100,
                          type: "number",
                          "aria-labelledby": "input-slider-age",
                        }}
                        sx={inputStyle}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              {/* Height */}
              <Grid item xs={12}>
                <Box>
                  <Typography id="input-slider-height" gutterBottom>
                    Height in cm
                  </Typography>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs>
                      <Slider
                        value={formData.height}
                        onChange={(e, value) => {
                          setFormData({ ...formData, height: value as number });
                        }}
                        aria-labelledby="input-slider-height"
                        name="height"
                        min={0}
                        max={250}
                        sx={sliderStyle}
                      />
                    </Grid>
                    <Grid item>
                      <Input
                        value={formData.height}
                        size="small"
                        onChange={handleInputChange}
                        name="height"
                        inputProps={{
                          step: 1,
                          min: 0,
                          max: 250,
                          type: "number",
                          "aria-labelledby": "input-slider-height",
                        }}
                        sx={inputStyle}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              {/* Weight */}
              <Grid item xs={12}>
                <Box>
                  <Typography id="input-slider-weight" gutterBottom>
                    Weight in kg
                  </Typography>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs>
                      <Slider
                        value={formData.weight}
                        onChange={(e, value) => {
                          setFormData({ ...formData, weight: value as number });
                        }}
                        aria-labelledby="input-slider-weight"
                        name="weight"
                        min={0}
                        max={250}
                        sx={sliderStyle}
                      />
                    </Grid>
                    <Grid item>
                      <Input
                        value={formData.weight}
                        size="small"
                        onChange={handleInputChange}
                        name="weight"
                        inputProps={{
                          step: 1,
                          min: 0,
                          max: 250,
                          type: "number",
                          "aria-labelledby": "input-slider-weight",
                        }}
                        sx={inputStyle}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              {/* workout goals */}
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  sx={textFieldStyle["& .MuiFormControl-root"]}
                >
                  <InputLabel
                    id="WorkoutGoals"
                    style={textFieldStyle["& .MuiInputLabel-root"]}
                  >
                    Workout Goals
                  </InputLabel>
                  <Select
                    labelId="WorkoutGoals"
                    id="workoutGoals"
                    value={formData.workoutGoals}
                    name="workoutGoals"
                    label="Workout Goals"
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        workoutGoals: e.target.value as string,
                      });
                    }}
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
                    <MenuItem value={"Stay in Shape"}>Stay in Shape</MenuItem>
                    <MenuItem value={"Muscle Gain"}>Muscle Gain</MenuItem>
                    <MenuItem value={"Caloric Deficit"}>
                      Caloric Deficit
                    </MenuItem>
                    <MenuItem value={"Flexibility"}>Flexibility</MenuItem>
                    <MenuItem value={"Endurance"}>Endurance</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {/* days per week */}
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  sx={textFieldStyle["& .MuiFormControl-root"]}
                >
                  <InputLabel
                    id="daysPerWeek"
                    style={textFieldStyle["& .MuiInputLabel-root"]}
                  >
                    Days per Week
                  </InputLabel>
                  <Select
                    labelId="daysPerWeek"
                    id="daysPerWeek"
                    name="daysPerWeek"
                    value={formData.daysPerWeek}
                    label="Days per Week"
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        daysPerWeek: e.target.value as number,
                      });
                    }}
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
                    <MenuItem value={1}>One</MenuItem>
                    <MenuItem value={2}>Two</MenuItem>
                    <MenuItem value={3}>Three</MenuItem>
                    <MenuItem value={4}>Four</MenuItem>
                    <MenuItem value={5}>Five</MenuItem>
                    <MenuItem value={6}>Six</MenuItem>
                    <MenuItem value={7}>Seven</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {/* minutes per workout */}
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  sx={textFieldStyle["& .MuiFormControl-root"]}
                >
                  <InputLabel
                    id="MinutesPerWorkout"
                    style={textFieldStyle["& .MuiInputLabel-root"]}
                  >
                    Minutes per Workout
                  </InputLabel>
                  <Select
                    labelId="MinutesPerWorkout"
                    id="minutesPerWorkout"
                    name="minutesPerWorkout"
                    value={formData.minutesPerWorkout}
                    label="Minutes per Workout"
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        minutesPerWorkout: e.target.value as number,
                      });
                    }}
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
                    <MenuItem value={15}>15 minutes</MenuItem>
                    <MenuItem value={30}>30 minutes</MenuItem>
                    <MenuItem value={60}>1 hour</MenuItem>
                    <MenuItem value={90}>1 hour and 30 minutes</MenuItem>
                    <MenuItem value={120}>2 hours</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {/* include warmup */}
              <Grid item xs={12}>
                <FormControlLabel
                  value="includeWarmup"
                  control={
                    <Checkbox
                      checked={formData.includeWarmup}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          includeWarmup: e.target.checked,
                        });
                      }}
                      name="includeWarmup"
                      color="primary"
                      sx={checkboxStyle}
                    />
                  }
                  label="Include Warmup"
                  labelPlacement="start"
                />
              </Grid>
              {/* include streching */}
              <Grid item xs={12}>
                <FormControlLabel
                  value="includeStreching"
                  control={
                    <Checkbox
                      checked={formData.includeStreching}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          includeStreching: e.target.checked,
                        });
                      }}
                      name="includeStreching"
                      color="primary"
                      sx={checkboxStyle}
                    />
                  }
                  label="Include Streching"
                  labelPlacement="start"
                />
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
                  All steps completed - you&apos;re finished. <br />
                  Are you sure you want to submit?
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
