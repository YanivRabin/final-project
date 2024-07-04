"use client";

import React, { useState } from "react";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { textFieldStyle } from "../../styles/textField";
import CustomInput from "./CustomInput";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

const workoutGoalsOptions = [
  { value: "Stay in Shape", label: "Stay in Shape" },
  { value: "Muscle Gain", label: "Muscle Gain" },
  { value: "Caloric Deficit", label: "Caloric Deficit" },
  { value: "Flexibility", label: "Flexibility" },
  { value: "Endurance", label: "Endurance" },
];

const daysPerWeekOptions = [
  { value: 1, label: "One" },
  { value: 2, label: "Two" },
  { value: 3, label: "Three" },
  { value: 4, label: "Four" },
  { value: 5, label: "Five" },
  { value: 6, label: "Six" },
  { value: 7, label: "Seven" },
];

const minutesPerWorkoutOptions = [
  { value: 15, label: "15 minutes" },
  { value: 30, label: "30 minutes" },
  { value: 60, label: "1 hour" },
  { value: 90, label: "1 hour and 30 minutes" },
  { value: 120, label: "2 hours" },
];

const workoutLocationOptions = [
  { value: "gym", label: "GYM" },
  { value: "home", label: "Home" },
  { value: "outdoor", label: "Outdoor" },
];

export default function SettingsCard(props: any) {
  const [value, setValue] = useState("one");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const [user, setUser] = useState({
    firstName: props.firstName,
    lastName: props.lastName,
    gender: props.gender,
    phone: props.phone,
    email: props.email,
    pass: props.pass,
    workoutGoals: props.workoutGoals,
    daysPerWeek: props.daysPerWeek,
    minutesPerWorkout: props.minutesPerWorkout,
    workoutLocation: props.workoutLocation,
    includeWarmup: props.includeWarmup,
    includeStretching: props.includeStretching,
    showPassword: false,
    dietary: props.dietary,
  });

  const changeField = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const changeSelectField = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof user;
    setUser({ ...user, [name]: event.target.value });
  };

  const toggleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.checked });
  };

  const [edit, update] = useState({
    required: true,
    disabled: true,
    isEdit: true,
  });

  const changeButton = (event: any) => {
    event.preventDefault();
    setUser({ ...user, showPassword: false });
    update((prev) => ({
      ...prev,
      disabled: !prev.disabled,
      isEdit: !prev.isEdit,
    }));
    console.log("user: ", user);
  };

  const handlePassword = () => {
    setUser((prev) => ({ ...prev, showPassword: !prev.showPassword }));
  };

  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        width: "100%",
        padding: "20px",
        boxShadow: "0 3px 5px rgba(0,0,0,0.2)",
        borderRadius: "10px",
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Tab value="one" label="Account" />
        <Tab value="two" label="Workout Info" />
        <Tab value="three" label="Dietary Restrictions" />
      </Tabs>
      <Divider />
      <CardContent
        sx={{
          p: 3,
          maxHeight: { md: "40vh" },
          textAlign: { xs: "center", md: "start" },
        }}
      >
        {value === "one" && (
          <FormControl fullWidth>
            <Grid
              container
              direction={{ xs: "column", md: "row" }}
              columnSpacing={3}
              rowSpacing={2}
            >
              <Grid item xs={12} md={6}>
                <CustomInput
                  id="firstName"
                  name="firstName"
                  value={user.firstName}
                  onChange={changeField}
                  title="First Name"
                  dis={edit.disabled}
                  req={edit.required}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomInput
                  id="lastName"
                  name="lastName"
                  value={user.lastName}
                  onChange={changeField}
                  title="Last Name"
                  dis={edit.disabled}
                  req={edit.required}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="gender-label" style={textFieldStyle["& .MuiInputLabel-root"]}>
                    Gender
                  </InputLabel>
                  <Select
                    labelId="gender-label"
                    id="gender"
                    name="gender"
                    value={user.gender}
                    onChange={changeSelectField}
                    label="Gender"
                    disabled={edit.disabled}
                    required={edit.required}
                    sx={textFieldStyle}
                  >
                    {genderOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomInput
                  id="phone"
                  name="phone"
                  value={user.phone}
                  onChange={changeField}
                  title="Phone Number"
                  dis={edit.disabled}
                  req={edit.required}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">972+</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomInput
                  type="email"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={changeField}
                  title="Email Address"
                  dis={edit.disabled}
                  req={edit.required}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomInput
                  id="pass"
                  name="pass"
                  value={user.pass}
                  onChange={changeField}
                  title="Password"
                  dis={edit.disabled}
                  req={edit.required}
                  type={user.showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handlePassword}
                          edge="end"
                          disabled={edit.disabled}
                        >
                          {user.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid container justifyContent="flex-end" item xs={12} md={6}>
                <Button
                  sx={{
                    p: "1rem 2rem",
                    my: 2,
                    height: "3rem",
                    backgroundColor: "#ff4081",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#ff79b0",
                    },
                  }}
                  component="button"
                  size="large"
                  variant="contained"
                  onClick={changeButton}
                >
                  {edit.isEdit ? "EDIT" : "UPDATE"}
                </Button>
              </Grid>
            </Grid>
          </FormControl>
        )}
        {value === "two" && (
          <FormControl fullWidth>
            <Grid
              container
              direction={{ xs: "column", md: "row" }}
              columnSpacing={3}
              rowSpacing={2}
            >
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="workoutGoals-label" style={textFieldStyle["& .MuiInputLabel-root"]}>
                    Workout Goals
                  </InputLabel>
                  <Select
                    labelId="workoutGoals-label"
                    id="workoutGoals"
                    name="workoutGoals"
                    value={user.workoutGoals}
                    onChange={changeSelectField}
                    label="Workout Goals"
                    disabled={edit.disabled}
                    required={edit.required}
                    sx={textFieldStyle}
                  >
                    {workoutGoalsOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="daysPerWeek-label" style={textFieldStyle["& .MuiInputLabel-root"]}>
                    Days per Week
                  </InputLabel>
                  <Select
                    labelId="daysPerWeek-label"
                    id="daysPerWeek"
                    name="daysPerWeek"
                    value={user.daysPerWeek}
                    onChange={changeSelectField}
                    label="Days per Week"
                    disabled={edit.disabled}
                    required={edit.required}
                    sx={textFieldStyle}
                  >
                    {daysPerWeekOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="minutesPerWorkout-label" style={textFieldStyle["& .MuiInputLabel-root"]}>
                    Minutes per Workout
                  </InputLabel>
                  <Select
                    labelId="minutesPerWorkout-label"
                    id="minutesPerWorkout"
                    name="minutesPerWorkout"
                    value={user.minutesPerWorkout}
                    onChange={changeSelectField}
                    label="Minutes per Workout"
                    disabled={edit.disabled}
                    required={edit.required}
                    sx={textFieldStyle}
                  >
                    {minutesPerWorkoutOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="workoutLocation-label" style={textFieldStyle["& .MuiInputLabel-root"]}>
                    Workout Location
                  </InputLabel>
                  <Select
                    labelId="workoutLocation-label"
                    id="workoutLocation"
                    name="workoutLocation"
                    value={user.workoutLocation}
                    onChange={changeSelectField}
                    label="Workout Location"
                    disabled={edit.disabled}
                    required={edit.required}
                    sx={textFieldStyle}
                  >
                    {workoutLocationOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={user.includeWarmup}
                      onChange={toggleCheckbox}
                      name="includeWarmup"
                      color="primary"
                    />
                  }
                  label="Include Warmup"
                  disabled={edit.disabled}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={user.includeStretching}
                      onChange={toggleCheckbox}
                      name="includeStretching"
                      color="primary"
                    />
                  }
                  label="Include Stretching"
                  disabled={edit.disabled}
                />
              </Grid>
            </Grid>
          </FormControl>
        )}
        {value === "three" && (
          <Box sx={{ maxHeight: "50vh", overflow: "auto" }}>
            <FormControl fullWidth>
              <Grid
                container
                direction="column"
                columnSpacing={3}
                rowSpacing={2}
              >
                {[
                  "vegan",
                  "vegetarian",
                  "pescatarian",
                  "glutenFree",
                  "dairyFree",
                  "nutFree",
                  "soyFree",
                  "eggFree",
                  "shellfishFree",
                  "lactoseFree",
                  "kosher",
                  "halal",
                ].map((restriction) => (
                  <Grid item xs={12} key={restriction}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={user.dietary[restriction]}
                          onChange={(e) => {
                            setUser({
                              ...user,
                              dietary: {
                                ...user.dietary,
                                [restriction]: e.target.checked,
                              },
                            });
                          }}
                          name={restriction}
                          color="primary"
                        />
                      }
                      label={restriction.charAt(0).toUpperCase() + restriction.slice(1)}
                      disabled={edit.disabled}
                    />
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <CustomInput
                    id="other"
                    name="other"
                    value={user.dietary.other}
                    onChange={changeField}
                    title="Other"
                    dis={edit.disabled}
                    req={edit.required}
                  />
                </Grid>
                <Grid
                  container
                  justifyContent="flex-end"
                  item
                  xs={12}
                >
                  <Button
                    sx={{
                      p: "1rem 2rem",
                      my: 2,
                      height: "3rem",
                      backgroundColor: "#ff4081",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#ff79b0",
                      },
                    }}
                    component="button"
                    size="large"
                    variant="contained"
                    onClick={changeButton}
                  >
                    {edit.isEdit ? "EDIT" : "UPDATE"}
                  </Button>
                </Grid>
              </Grid>
            </FormControl>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
