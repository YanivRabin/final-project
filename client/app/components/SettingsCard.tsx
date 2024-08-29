import React, { useState } from "react";
import {
  Card,
  Divider,
  Grid,
  FormControl,
  Button,
  Tabs,
  Tab,
  Select,
  InputLabel,
  FormControlLabel,
  Checkbox,
  Box,
  CardContent,
  MenuItem,
  SelectChangeEvent,
  CircularProgress,
  Typography,
} from "@mui/material";
import { DietaryRestrictions, User } from "../services/interface";
import CustomInput from "./CustomInput";
import { textFieldStyle } from "../../styles/textField";
import {
  useUpdateUserMutation,
  useCreateWorkoutPlanMutation,
} from "../services/feedApi";

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

export default function SettingsCard(props: User) {
  const [value, setValue] = useState("one");
  const [updateUser] = useUpdateUserMutation();
  const [createWorkoutPlan] = useCreateWorkoutPlanMutation();
  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const [user, setUser] = useState<User>({
    ...props,
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

  const changeButton = async (event: React.MouseEvent) => {
    event.preventDefault();
    update((prev) => ({
      ...prev,
      disabled: !prev.disabled,
      isEdit: !prev.isEdit,
    }));

    if (!edit.isEdit) {
      setLoading(true); // Start loading
      localStorage.setItem("loading", JSON.stringify(loading));
      try {
        // Update user details
        const response = await updateUser(user).unwrap();
        console.log("User updated successfully!", response);

        // Save the updated user data in local storage
        localStorage.setItem("user", JSON.stringify(response));

        // Create workout plan with the updated user data
        let workoutPlan;
        while (!workoutPlan) {
          workoutPlan = await createWorkoutPlan(response).unwrap();
        }
        // const workoutPlan = await createWorkoutPlan(response).unwrap();
        localStorage.setItem("workoutPlan", JSON.stringify(workoutPlan));
      } catch (error) {
        console.error("Error updating user or creating workout plan:", error);
        if (error instanceof SyntaxError) {
          alert(
            "Failed to update user: Server returned an unexpected response."
          );
        } else if (error === 404) {
          alert("Failed to update user: User not found.");
        } else if (error === 409) {
          alert("Failed to update user: Email already in use.");
        } else if (error === 400) {
          alert("Failed to update user: Validation failed.");
        } else {
          alert("Failed to update user or create workout plan.");
        }
      } finally {
        setLoading(false); // Stop loading
        localStorage.removeItem("loading");
        window.location.reload(); // Reload the page
      }
    }
  };

  const handleDietaryChange = (
    restriction: keyof DietaryRestrictions,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUser((prevState) => ({
      ...prevState,
      dietaryRestrictions: {
        ...prevState.dietaryRestrictions,
        [restriction]: e.target.checked,
      },
    }));
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center", // Center vertically
          alignItems: "center", // Center horizontally
          height: "100%", // Full viewport height
          width: "100%", // Full width
          textAlign: "center", // Center text if necessary
        }}
      >
        <CircularProgress size={50} />
        <Typography sx={{ mt: 2, color: "black" }}>
          Updating workout plan and Nutrition menu...
        </Typography>
      </Box>
    );
  }

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
        <Tab value="one" label="Personal Info" />
        <Tab value="two" label="Workout Info" />
        <Tab value="three" label="Dietary Restrictions" />
      </Tabs>
      <Divider />
      <CardContent
        sx={{
          p: 3,
          textAlign: { xs: "center", md: "start" },
        }}
      >
        {value === "one" && (
          <FormControl fullWidth>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <CustomInput
                  id="age"
                  name="age"
                  value={user.age}
                  onChange={changeField}
                  title="Age"
                  dis={edit.disabled}
                  req={edit.required}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomInput
                  id="height"
                  name="height"
                  value={user.height}
                  onChange={changeField}
                  title="Height"
                  dis={edit.disabled}
                  req={edit.required}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <CustomInput
                  id="weight"
                  name="weight"
                  value={user.weight}
                  onChange={changeField}
                  title="Weight"
                  dis={edit.disabled}
                  req={edit.required}
                />
              </Grid>
            </Grid>
            <Box textAlign="right" mt={3}>
              <Button
                sx={{
                  p: "1rem 2rem",
                  height: "3rem",
                  backgroundColor: "#ff4081",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#ff79b0",
                  },
                }}
                size="large"
                variant="contained"
                onClick={changeButton}
                disabled={loading} // Disable button when loading
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : edit.isEdit ? (
                  "EDIT"
                ) : (
                  "UPDATE"
                )}
              </Button>
            </Box>
          </FormControl>
        )}
        {value === "two" && (
          <FormControl fullWidth>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel
                    id="workoutGoals-label"
                    style={textFieldStyle["& .MuiInputLabel-root"]}
                  >
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
                  <InputLabel
                    id="daysPerWeek-label"
                    style={textFieldStyle["& .MuiInputLabel-root"]}
                  >
                    Days per Week
                  </InputLabel>
                  <Select
                    labelId="daysPerWeek-label"
                    id="daysPerWeek"
                    name="daysPerWeek"
                    value={String(user.daysPerWeek)} // Convert to string
                    onChange={changeSelectField}
                    label="Days per Week"
                    disabled={edit.disabled}
                    required={edit.required}
                    sx={textFieldStyle}
                  >
                    {daysPerWeekOptions.map((option) => (
                      <MenuItem key={option.value} value={String(option.value)}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel
                    id="minutesPerWorkout-label"
                    style={textFieldStyle["& .MuiInputLabel-root"]}
                  >
                    Minutes per Workout
                  </InputLabel>
                  <Select
                    labelId="minutesPerWorkout-label"
                    id="minutesPerWorkout"
                    name="minutesPerWorkout"
                    value={String(user.minutesPerWorkout)} // Convert to string
                    onChange={changeSelectField}
                    label="Minutes per Workout"
                    disabled={edit.disabled}
                    required={edit.required}
                    sx={textFieldStyle}
                  >
                    {minutesPerWorkoutOptions.map((option) => (
                      <MenuItem key={option.value} value={String(option.value)}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel
                    id="workoutLocation-label"
                    style={textFieldStyle["& .MuiInputLabel-root"]}
                  >
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
            <Box textAlign="right" mt={3}>
              <Button
                sx={{
                  p: "1rem 2rem",
                  height: "3rem",
                  backgroundColor: "#ff4081",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#ff79b0",
                  },
                }}
                size="large"
                variant="contained"
                onClick={changeButton}
                disabled={loading} // Disable button when loading
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : edit.isEdit ? (
                  "EDIT"
                ) : (
                  "UPDATE"
                )}
              </Button>
            </Box>
          </FormControl>
        )}
        {value === "three" && (
          <Box sx={{ maxHeight: "50vh", overflow: "auto" }}>
            <FormControl fullWidth>
              <Grid container direction="column" spacing={2}>
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
                  <Grid item key={restriction}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            !!user.dietaryRestrictions[
                              restriction as keyof DietaryRestrictions
                            ]
                          } // Convert to boolean
                          onChange={(e) =>
                            handleDietaryChange(
                              restriction as keyof DietaryRestrictions,
                              e
                            )
                          }
                          name={restriction}
                          color="primary"
                        />
                      }
                      label={
                        restriction.charAt(0).toUpperCase() +
                        restriction.slice(1)
                      }
                      disabled={edit.disabled}
                    />
                  </Grid>
                ))}
                <Grid container justifyContent="flex-end" item xs={12}>
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
                    size="large"
                    variant="contained"
                    onClick={changeButton}
                    disabled={loading} // Disable button when loading
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : edit.isEdit ? (
                      "EDIT"
                    ) : (
                      "UPDATE"
                    )}
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
