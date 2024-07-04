"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import StepConnector from "@mui/material/StepConnector";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Slider from "@mui/material/Slider";
import Input from "@mui/material/Input";
import Checkbox from "@mui/material/Checkbox";
import { useSignUpMutation } from "../services/authApi";
import CustomTextField from "../components/CustomTextField";
import Image from "next/image";
import StepLabel from "@mui/material/StepLabel";
import "../../styles/signUp.css";

const steps = ["Sign Up", "Personal Info", "Dietary Restrictions"];

export default function SignUp() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [password2, setPassword2] = React.useState("");
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    age: 25,
    height: 175,
    weight: 70,
    workoutGoals: " ",
    daysPerWeek: 0,
    minutesPerWorkout: 0,
    workoutLocation: " ",
    includeWarmup: false,
    includeStreching: false,
    dietaryRestrictions: {
      vegan: false,
      vegetarian: false,
      pescatarian: false,
      glutenFree: false,
      dairyFree: false,
      nutFree: false,
      soyFree: false,
      eggFree: false,
      shellfishFree: false,
      lactoseFree: false,
      kosher: false,
      halal: false,
      other: "",
    },
  });
  const [signUpUser, { isLoading, isError }] = useSignUpMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = async () => {
    if (activeStep === 0 && formData.password !== password2) {
      alert("Passwords do not match");
      return;
    }
    if (
      activeStep === 0 &&
      (formData.firstName === "" ||
        formData.lastName === "" ||
        formData.email === "" ||
        formData.password === "")
    ) {
      alert("Please fill in all fields");
      return;
    }
    if (
      activeStep === 1 &&
      (formData.gender === "" ||
        formData.workoutGoals === " " ||
        formData.workoutLocation === " " ||
        formData.daysPerWeek === 0 ||
        formData.minutesPerWorkout === 0)
    ) {
      alert("Please fill in all fields");
      return;
    }
    if (activeStep === steps.length) {
      // submit form
      try {
        const { res } = await signUpUser(formData).unwrap();
        localStorage.setItem("user", JSON.stringify(res));
        window.location.href = "/feed";
      } catch (error) {
        console.error("Login error:", error);
        setActiveStep(0);
        return;
      }
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep === 0) {
      window.location.href = "/signIn";
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // get stepper content
  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {/* first name */}
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  label="First Name"
                  value={formData.firstName}
                  onChange={(e) => {
                    setFormData({ ...formData, firstName: e.target.value });
                  }}
                />
              </Grid>
              {/* last name */}
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  label="Last Name"
                  value={formData.lastName}
                  onChange={(e) => {
                    setFormData({ ...formData, lastName: e.target.value });
                  }}
                />
              </Grid>
              {/* email */}
              <Grid item xs={12}>
                <CustomTextField
                  label="Email Address"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                  }}
                />
              </Grid>
              {/* password */}
              <Grid item xs={12}>
                <CustomTextField
                  label="Password"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                  }}
                />
              </Grid>
              {/* password 2 */}
              <Grid item xs={12}>
                <CustomTextField
                  label="Password Confirmation"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 1:
        return (
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {/* gender */}
              <Grid item xs={12}>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="gender"
                    value={formData.gender}
                    id="gender"
                    onChange={handleInputChange}
                  >
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
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
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              {/* workout goals */}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="WorkoutGoals">Workout Goals</InputLabel>
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
                <FormControl fullWidth>
                  <InputLabel id="daysPerWeek">Days per Week</InputLabel>
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
                <FormControl fullWidth>
                  <InputLabel id="MinutesPerWorkout">
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
                  >
                    <MenuItem value={15}>15 minutes</MenuItem>
                    <MenuItem value={30}>30 minutes</MenuItem>
                    <MenuItem value={60}>1 hour</MenuItem>
                    <MenuItem value={90}>1 hour and 30 minutes</MenuItem>
                    <MenuItem value={120}>2 hours</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {/* workout location */}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="workoutLocation">Workout Location</InputLabel>
                  <Select
                    labelId="workoutLocation"
                    id="workoutLocation"
                    name="workoutLocation"
                    value={formData.workoutLocation}
                    label="Workout Location"
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        workoutLocation: e.target.value as string,
                      });
                    }}
                  >
                    <MenuItem value={"gym"}>GYM</MenuItem>
                    <MenuItem value={"home"}>Home</MenuItem>
                    <MenuItem value={"outdoor"}>Outdoor</MenuItem>
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
                    />
                  }
                  label="Include Warmup"
                  labelPlacement="end"
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
                    />
                  }
                  label="Include Streching"
                  labelPlacement="end"
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 2:
        return (
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {/* Vegan */}
              <Grid item xs={6}>
                <FormControlLabel
                  value="vegan"
                  control={
                    <Checkbox
                      checked={formData.dietaryRestrictions.vegan}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          dietaryRestrictions: {
                            ...formData.dietaryRestrictions,
                            vegan: e.target.checked,
                          },
                        });
                      }}
                      name="vegan"
                      color="primary"
                    />
                  }
                  label="Vegan"
                  labelPlacement="end"
                />
              </Grid>
              {/* Vegetarian */}
              <Grid item xs={6}>
                <FormControlLabel
                  value="vegetarian"
                  control={
                    <Checkbox
                      checked={formData.dietaryRestrictions.vegetarian}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          dietaryRestrictions: {
                            ...formData.dietaryRestrictions,
                            vegetarian: e.target.checked,
                          },
                        });
                      }}
                      name="vegetarian"
                      color="primary"
                    />
                  }
                  label="Vegetarian"
                  labelPlacement="end"
                />
              </Grid>
              {/* Pescatarian */}
              <Grid item xs={6}>
                <FormControlLabel
                  value="pescatarian"
                  control={
                    <Checkbox
                      checked={formData.dietaryRestrictions.pescatarian}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          dietaryRestrictions: {
                            ...formData.dietaryRestrictions,
                            pescatarian: e.target.checked,
                          },
                        });
                      }}
                      name="pescatarian"
                      color="primary"
                    />
                  }
                  label="Pescatarian"
                  labelPlacement="end"
                />
              </Grid>
              {/* Gluten Free */}
              <Grid item xs={6}>
                <FormControlLabel
                  value="glutenFree"
                  control={
                    <Checkbox
                      checked={formData.dietaryRestrictions.glutenFree}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          dietaryRestrictions: {
                            ...formData.dietaryRestrictions,
                            glutenFree: e.target.checked,
                          },
                        });
                      }}
                      name="glutenFree"
                      color="primary"
                    />
                  }
                  label="Gluten Free"
                  labelPlacement="end"
                />
              </Grid>
              {/* Dairy Free */}
              <Grid item xs={6}>
                <FormControlLabel
                  value="dairyFree"
                  control={
                    <Checkbox
                      checked={formData.dietaryRestrictions.dairyFree}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          dietaryRestrictions: {
                            ...formData.dietaryRestrictions,
                            dairyFree: e.target.checked,
                          },
                        });
                      }}
                      name="dairyFree"
                      color="primary"
                    />
                  }
                  label="Dairy Free"
                  labelPlacement="end"
                />
              </Grid>
              {/* Nut Free */}
              <Grid item xs={6}>
                <FormControlLabel
                  value="nutFree"
                  control={
                    <Checkbox
                      checked={formData.dietaryRestrictions.nutFree}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          dietaryRestrictions: {
                            ...formData.dietaryRestrictions,
                            nutFree: e.target.checked,
                          },
                        });
                      }}
                      name="nutFree"
                      color="primary"
                    />
                  }
                  label="Nut Free"
                  labelPlacement="end"
                />
              </Grid>
              {/* Soy Free */}
              <Grid item xs={6}>
                <FormControlLabel
                  value="soyFree"
                  control={
                    <Checkbox
                      checked={formData.dietaryRestrictions.soyFree}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          dietaryRestrictions: {
                            ...formData.dietaryRestrictions,
                            soyFree: e.target.checked,
                          },
                        });
                      }}
                      name="soyFree"
                      color="primary"
                    />
                  }
                  label="Soy Free"
                  labelPlacement="end"
                />
              </Grid>
              {/* Egg Free */}
              <Grid item xs={6}>
                <FormControlLabel
                  value="eggFree"
                  control={
                    <Checkbox
                      checked={formData.dietaryRestrictions.eggFree}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          dietaryRestrictions: {
                            ...formData.dietaryRestrictions,
                            eggFree: e.target.checked,
                          },
                        });
                      }}
                      name="eggFree"
                      color="primary"
                    />
                  }
                  label="Egg Free"
                  labelPlacement="end"
                />
              </Grid>
              {/* Shellfish Free */}
              <Grid item xs={6}>
                <FormControlLabel
                  value="shellfishFree"
                  control={
                    <Checkbox
                      checked={formData.dietaryRestrictions.shellfishFree}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          dietaryRestrictions: {
                            ...formData.dietaryRestrictions,
                            shellfishFree: e.target.checked,
                          },
                        });
                      }}
                      name="shellfishFree"
                      color="primary"
                    />
                  }
                  label="Shellfish Free"
                  labelPlacement="end"
                />
              </Grid>
              {/* Lactose Free */}
              <Grid item xs={6}>
                <FormControlLabel
                  value="lactoseFree"
                  control={
                    <Checkbox
                      checked={formData.dietaryRestrictions.lactoseFree}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          dietaryRestrictions: {
                            ...formData.dietaryRestrictions,
                            lactoseFree: e.target.checked,
                          },
                        });
                      }}
                      name="lactoseFree"
                      color="primary"
                    />
                  }
                  label="Lactose Free"
                  labelPlacement="end"
                />
              </Grid>
              {/* Kosher */}
              <Grid item xs={6}>
                <FormControlLabel
                  value="kosher"
                  control={
                    <Checkbox
                      checked={formData.dietaryRestrictions.kosher}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          dietaryRestrictions: {
                            ...formData.dietaryRestrictions,
                            kosher: e.target.checked,
                          },
                        });
                      }}
                      name="kosher"
                      color="primary"
                    />
                  }
                  label="Kosher"
                  labelPlacement="end"
                />
              </Grid>
              {/* Halal */}
              <Grid item xs={6}>
                <FormControlLabel
                  value="halal"
                  control={
                    <Checkbox
                      checked={formData.dietaryRestrictions.halal}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          dietaryRestrictions: {
                            ...formData.dietaryRestrictions,
                            halal: e.target.checked,
                          },
                        });
                      }}
                      name="halal"
                      color="primary"
                    />
                  }
                  label="Halal"
                  labelPlacement="end"
                />
              </Grid>
              {/* other */}
              <Grid item xs={12}>
                <CustomTextField
                  label="Other"
                  value={formData.dietaryRestrictions.other}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      dietaryRestrictions: {
                        ...formData.dietaryRestrictions,
                        other: e.target.value,
                      },
                    });
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 3:
        return (
          <Typography sx={{ mt: 2, mb: 1, color: "black" }}>
            All steps completed - you&apos;re finished. <br />
            Are you sure you want to submit?
          </Typography>
        );
      case 4:
        return (
          <Typography sx={{ mt: 2, mb: 1, color: "black" }}>
            {isLoading ? "Loading..." : isError ? "Error" : ""}
          </Typography>
        );
    }
  };

  return (
    <Box className="mainContainer">
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Box className="outerBox">
          <Typography className="title">Sign Up</Typography>
          <Stepper
            className="stepper"
            activeStep={activeStep}
            connector={<StepConnector />}
          >
            {steps.map((label, index) => (
              <Step key={label} className="step">
                <StepLabel className="stepLabel">{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box mt={3}>
            <Box mt={2} mb={1}>
              {getStepContent(activeStep)}
            </Box>
            <Box display="flex" flexDirection="row" pt={2}>
              <Button className="buttonBack" onClick={handleBack}>
                Back
              </Button>
              <Box flex="1 1 auto" />
              <Button className="buttonNext" onClick={handleNext}>
                {activeStep === steps.length - 1
                  ? "Finish"
                  : activeStep === steps.length
                  ? "Submit"
                  : "Next"}
              </Button>
            </Box>
          </Box>
        </Box>
        {/* Image component for background */}
        <Box className="bgImage">
          <Image
            src={require("../images/signUp/signUpBg.png")}
            alt="Background"
            layout="fill"
            objectFit="cover"
          />
        </Box>
      </Container>
    </Box>
  );
}
