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
import CustomInput from "./CustomInput";

export default function SettingsCard(props: any) {
  const [value, setValue] = useState("one");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const genderSelect = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

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
  });

  const changeField = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value });
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
    <Card variant="outlined" sx={{ height: "100%", width: "100%" }}>
      <br />
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
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
              columnSpacing={5}
              rowSpacing={3}
            >
              <Grid item xs={6}>
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
              <Grid item xs={6}>
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
              <Grid item xs={6}>
                <CustomInput
                  select
                  id="gender"
                  name="gender"
                  value={user.gender}
                  onChange={changeField}
                  title="Gender"
                  dis={edit.disabled}
                  req={edit.required}
                  content={genderSelect.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                />
              </Grid>
              <Grid item xs={6}>
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
                      <InputAdornment position="start">63+</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6}>
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
              <Grid item xs={6}>
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
                          {user.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid
                container
                justifyContent={{ xs: "center", md: "flex-end" }}
                item
                xs={6}
              >
                <Button
                  sx={{ p: "1rem 2rem", my: 2, height: "3rem" }}
                  component="button"
                  size="large"
                  variant="contained"
                  color="secondary"
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
              columnSpacing={5}
              rowSpacing={3}
            >
              <Grid item xs={6}>
                <CustomInput
                  id="workoutGoals"
                  name="workoutGoals"
                  value={user.workoutGoals}
                  onChange={changeField}
                  title="Workout Goals"
                  dis={edit.disabled}
                  req={edit.required}
                />
              </Grid>
              <Grid item xs={6}>
                <CustomInput
                  id="daysPerWeek"
                  name="daysPerWeek"
                  value={user.daysPerWeek}
                  onChange={changeField}
                  title="Days per Week"
                  dis={edit.disabled}
                  req={edit.required}
                />
              </Grid>
              <Grid item xs={6}>
                <CustomInput
                  id="minutesPerWorkout"
                  name="minutesPerWorkout"
                  value={user.minutesPerWorkout}
                  onChange={changeField}
                  title="Minutes per Workout"
                  dis={edit.disabled}
                  req={edit.required}
                />
              </Grid>
              <Grid item xs={6}>
                <CustomInput
                  id="workoutLocation"
                  name="workoutLocation"
                  value={user.workoutLocation}
                  onChange={changeField}
                  title="Workout Location"
                  dis={edit.disabled}
                  req={edit.required}
                />
              </Grid>
              <Grid item xs={6}>
                <CustomInput
                  id="includeWarmup"
                  name="includeWarmup"
                  value={user.includeWarmup}
                  onChange={toggleCheckbox}
                  title="Include Warmup"
                  dis={edit.disabled}
                  req={edit.required}
                  type="checkbox"
                />
              </Grid>
              <Grid item xs={6}>
                <CustomInput
                  id="includeStretching"
                  name="includeStretching"
                  value={user.includeStretching}
                  onChange={toggleCheckbox}
                  title="Include Stretching"
                  dis={edit.disabled}
                  req={edit.required}
                  type="checkbox"
                />
              </Grid>
              <Grid
                container
                justifyContent={{ xs: "center", md: "flex-end" }}
                item
                xs={6}
              >
                <Button
                  sx={{ p: "1rem 2rem", my: 2, height: "3rem" }}
                  component="button"
                  size="large"
                  variant="contained"
                  color="secondary"
                  onClick={changeButton}
                >
                  {edit.isEdit ? "EDIT" : "UPDATE"}
                </Button>
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
                columnSpacing={5}
                rowSpacing={3}
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
                    <CustomInput
                      id={restriction}
                      name={restriction}
                      value={props.dietary?.[restriction]}
                      onChange={toggleCheckbox}
                      title={
                        restriction.charAt(0).toUpperCase() + restriction.slice(1)
                      }
                      dis={edit.disabled}
                      req={edit.required}
                      type="checkbox"
                    />
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <CustomInput
                    id="other"
                    name="other"
                    value={props.dietary?.other}
                    onChange={changeField}
                    title="Other"
                    dis={edit.disabled}
                    req={edit.required}
                  />
                </Grid>
                <Grid
                  container
                  justifyContent={{ xs: "center", md: "flex-end" }}
                  item
                  xs={12}
                >
                  <Button
                    sx={{ p: "1rem 2rem", my: 2, height: "3rem" }}
                    component="button"
                    size="large"
                    variant="contained"
                    color="secondary"
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
