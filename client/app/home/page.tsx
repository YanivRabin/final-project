"use client";  
import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, CssBaseline } from "@mui/material";
import MealCard from "../components/MealCard";
import WorkoutCard from "../components/workoutCard";
import { Meal, WorkoutDetails } from "../services/interface";
import "../../styles/global.css";


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
    const nutritionalInformation = workoutPlan.nutritionalInformation || {};
    console.log("Fetched nutritionalInformation:", nutritionalInformation);  

    setMeals(nutritionalInformation);

    const currentDay = getCurrentDay();
    const exercises = workoutPlan.weeklyWorkout[currentDay] || [];
    const duration: string = workoutPlan.minutesPerWorkout || "0";

    setWorkoutData({
      muscleGroup: "Full Body",
      duration: duration,
      exercise: exercises,
    });
  }, []);

  const currentMealType = getCurrentTimeZone();
  const currentMeals = meals[currentMealType] || [];

  if (!workoutData) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <CssBaseline />
      <Grid 
        container 
        alignItems="center" 
        justifyContent="center" 
        spacing={2} 
        sx={{ width: '100%', maxWidth: 1200 }}
      >
        {/* Meal card */}
        <Grid item xs={12} sm={6} md={5}>
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
            </Grid>
            <Grid item>
              <MealCard mealType={currentMealType} meals={currentMeals} />
            </Grid>
          </Grid>
        </Grid>
        {/* Workout card */}
        <Grid item xs={12} sm={6} md={5}>
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
              <WorkoutCard day={getCurrentDay()} exercises={workoutData} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
