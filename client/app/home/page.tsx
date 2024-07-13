"use client";

import React from "react";
import { Box, Grid, Typography, CssBaseline } from "@mui/material";
import MealCard from "../components/MealCard";
import WorkoutCard from "../components/WorkoutCard";
import "../../styles/home.css";

type DayOfWeek = "sunday" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday";
// meal 
const getCurrentTimeZone = () => {
  const currentHour = new Date().getHours();
  if (currentHour >= 6 && currentHour < 11) {
    return "Breakfast";
  } else if (currentHour >= 11 && currentHour < 15) {
    return "Lunch";
  } else if (currentHour >= 15 && currentHour < 18) {
    return "Snack";
  } else {
    return "Dinner";
  }
};
const meals = {
  Breakfast: ["Oatmeal with Berries and Nuts", "Scrambled Eggs with Avocado"],
  Lunch: ["Grilled Chicken Salad", "Quinoa and Black Bean Bowl"],
  Snack: ["Yogurt with Honey and Nuts", "Apple Slices with Peanut Butter"],
  Dinner: ["Salmon with Quinoa and Vegetables", "Pasta with Tomato Sauce"],
};
// workout
const getCurrentDay = () => {
  const days: DayOfWeek[] = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  const currentDayIndex = new Date().getDay();
  return days[currentDayIndex];
};
const workoutData = {
  sunday: {
    muscleGroup: "Legs",
    duration: "30 minutes",
    name: "Squats",
    description:
      "Stand with feet hip-width apart, holding a dumbbell in each hand. Keeping your chest up and core braced, push your hips back, bend your knees, and lower your body until your thighs are at least parallel to the floor. Push yourself back to the starting position.",
    reps: "12",
    sets: "3",
  },
  monday: {
    muscleGroup: "Chest",
    duration: "30 minutes",
    name: "Push-ups",
    description:
      "Get into a plank position with your hands slightly wider than shoulder-width apart. Keeping your body in a straight line, lower yourself until your chest is just above the floor, then push yourself back up.",
    reps: "15",
    sets: "3",
  },
  tuesday: {
    muscleGroup: "Back",
    duration: "30 minutes",
    name: "Pull-ups",
    description:
      "Grab a pull-up bar with your hands slightly wider than shoulder-width apart. Pull your body up until your chin is above the bar, then lower yourself back down.",
    reps: "10",
    sets: "3",
  },
  wednesday: {
    muscleGroup: "Shoulders",
    duration: "30 minutes",
    name: "Shoulder Press",
    description:
      "Stand with feet shoulder-width apart, holding a dumbbell in each hand at shoulder height. Press the weights overhead until your arms are fully extended, then lower them back to the starting position.",
    reps: "12",
    sets: "3",
  },
  thursday: {
    muscleGroup: "Arms",
    duration: "30 minutes",
    name: "Bicep Curls",
    description:
      "Stand with feet shoulder-width apart, holding a dumbbell in each hand with palms facing forward. Curl the weights up to shoulder height, then lower them back to the starting position.",
    reps: "15",
    sets: "3",
  },
  friday: {
    muscleGroup: "Core",
    duration: "30 minutes",
    name: "Plank",
    description:
      "Get into a plank position with your forearms on the ground and your body in a straight line. Hold this position for the duration of the set.",
    reps: "1",
    sets: "3",
  },
  saturday: {
    muscleGroup: "Full Body",
    duration: "30 minutes",
    name: "Burpees",
    description:
      "Start in a standing position, drop into a squat, kick your feet back into a plank, perform a push-up, return to the squat position, and jump up with arms extended overhead.",
    reps: "10",
    sets: "3",
  },
};

const Home: React.FC = () => {
  const currentMealType = getCurrentTimeZone();
  const currentMeals = meals[currentMealType];
  const currentDay = getCurrentDay();
  const currentWorkout = workoutData[currentDay];

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
              <MealCard
                mealType={currentMealType}
                meals={currentMeals}
              />
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
              <WorkoutCard day={currentDay} exercise={currentWorkout}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
