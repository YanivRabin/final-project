"use client"; // Add this at the top to indicate a client component

import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, CssBaseline } from "@mui/material";
import MealCard from "../components/MealCard";
import WorkoutCard from "../components/workoutCard";
import { Meal, WorkoutDetails } from "../services/interface";

// Function to get the current time zone
const getCurrentTimeZone = () => {
  const currentHour = new Date().getHours();
  if (currentHour >= 6 && currentHour < 11) {
    return "breakfast";
  } else if (currentHour >= 11 && currentHour < 15) {
    return "lunch";
  } else if (currentHour >= 15 && currentHour < 18) {
    return "snacks";
  } else {
    return "dinner";
  }
};

// Function to get the current day
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

const Home: React.FC = () => {
  const [meals, setMeals] = useState<{ [key: string]: Meal[] }>({});
  const [workoutData, setWorkoutData] = useState<WorkoutDetails | null>(null);

  useEffect(() => {
    const workoutPlan = JSON.parse(localStorage.getItem("workoutPlan") || "{}");

    if (workoutPlan?.weeklyWorkout) {
      const currentDay = getCurrentDay();
      const nutritionalInformation = workoutPlan.nutritionalInformation || {};
      console.log("Fetched nutritionalInformation:", nutritionalInformation);
      setMeals(nutritionalInformation);

      const exercises = workoutPlan.weeklyWorkout[currentDay] || [];
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const duration: string = user.minutesPerWorkout || "0";

      setWorkoutData({
        muscleGroup: "Full Body",
        duration: duration,
        exercise: exercises,
      });
    } else {
      console.error("workoutPlan or weeklyWorkout is undefined or empty.");
      setWorkoutData({
        muscleGroup: "Full Body",
        duration: "0",
        exercise: [],
      });
    }
  }, []);

  const currentMealType = getCurrentTimeZone();
  const currentMeals = meals[currentMealType] || [];

  if (!workoutData) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <CssBaseline />
      <Grid
        container
        alignItems="stretch"
        justifyContent="center"
        spacing={4}
        sx={{ width: "100%", maxWidth: 1200 }}
      >
        <Grid item xs={12} sm={6} md={5} display="flex" flexDirection="column">
          <Typography
            sx={{
              color: "#4e2a84",
              position: "relative",
            }}
            variant="h4"
            align="center"
          >
            Your Next Meal
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MealCard mealType={currentMealType} meals={currentMeals} />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={5} display="flex" flexDirection="column">
          <Typography
            sx={{
              color: "#4e2a84",
              position: "relative",
            }}
            variant="h4"
            align="center"
          >
            Your Next Day
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <WorkoutCard day={getCurrentDay()} exercises={workoutData} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
