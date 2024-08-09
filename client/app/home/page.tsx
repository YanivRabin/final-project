"use client";

import React from "react";
import { Box, Grid, Typography, CssBaseline } from "@mui/material";
import MealCard from "../components/MealCard";
import WorkoutCard from "../components/WorkoutCard";
import { Exercise, WorkoutDetails } from "../services/interface";
import "../../styles/home.css";

// meal
const getCurrentTimeZone = () => {
  const currentHour = new Date().getHours();
  if (currentHour >= 6 && currentHour < 11) {
    return "Breakfast";
  } else if (currentHour >= 11 && currentHour < 15) {
    return "Lunch";
  } else if (currentHour >= 15 && currentHour < 18) {
    return "Snacks";
  } else {
    return "Dinner";
  }
};
const meals = {
  Breakfast: ["Oatmeal with Berries and Nuts", "Scrambled Eggs with Avocado"],
  Lunch: ["Grilled Chicken Salad", "Quinoa and Black Bean Bowl"],
  Snacks: ["Yogurt with Honey and Nuts", "Apple Slices with Peanut Butter"],
  Dinner: ["Salmon with Quinoa and Vegetables", "Pasta with Tomato Sauce"],
};
// workout
const getCurrentDay = () => {
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const currentDayIndex = new Date().getDay();
  return days[currentDayIndex];
};

const currentDay = getCurrentDay();
const workoutPlan = JSON.parse(localStorage.getItem("workoutPlan") || "{}");
const exercises: Exercise[] = workoutPlan.weeklyWorkout[currentDay];
const user = JSON.parse(localStorage.getItem("user") || "{}");
const duration: string = user.user.minutesPerWorkout;
const workoutData: WorkoutDetails = {
  muscleGroup: "Full Body",
  duration: duration,
  exercise: exercises,
};

console.log("workoutData", workoutData);


const Home: React.FC = () => {
  const currentMealType = getCurrentTimeZone();
  const currentMeals = meals[currentMealType];
  const currentWorkout = workoutData;

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CssBaseline />
      <Grid container alignItems="center" justifyContent="center">
        {/* Meal card */}
        <Grid item>
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="space-between"
            height="100%"
          >
            <Grid item>
              <Typography variant="h2" className="title">
                Your Next Meal
              </Typography>
              <Typography className="subtitle">
                There are two options to choose from
              </Typography>
            </Grid>
            <Grid item>
              <MealCard mealType={currentMealType} meals={currentMeals} />
            </Grid>
          </Grid>
        </Grid>
        {/* Vertical line */}
        <Grid item>
          <hr className="vertical-line" />
        </Grid>
        {/* Workout card */}
        <Grid item>
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="space-between"
            height="100%"
          >
            <Grid item>
              <Typography variant="h2" className="title">
                Your Next Workout
              </Typography>
            </Grid>
            <Grid item>
              <WorkoutCard day={currentDay} exercises={currentWorkout} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
