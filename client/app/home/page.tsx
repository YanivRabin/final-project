"use client";

import React from "react";
import { Box, Grid, Typography, CssBaseline } from "@mui/material";
import MealCard from "../components/MealCard";
import WorkoutCard from "../components/WorkoutCard";
import "../../styles/home.css";

type DayOfWeek = "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";
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
  const days: DayOfWeek[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDayIndex = new Date().getDay();
  return days[currentDayIndex];
};
const workoutData = {
  Sunday: {
    muscleGroup: "Legs",
    duration: "00:30",
    exercise: [
      {
        name: "Squats",
        description:
          "Stand with feet shoulder-width apart, lower your body down by bending your knees, then push back up to the starting position.",
        reps: "10",
        sets: "3",
      },
      {
        name: "Lunges",
        description:
          "Step forward with one leg, lowering your hips until both knees are bent at a 90-degree angle, then push back up to the starting position.",
        reps: "12",
        sets: "3",
      },
    ],
  },
  Monday: {
    muscleGroup: "Chest",
    duration: "00:30",
    exercise: [
      {
        name: "Push-ups",
        description:
          "Get into a plank position with hands shoulder-width apart, lower your body down by bending your arms, then push back up to the starting position.",
        reps: "15",
        sets: "3",
      },
      {
        name: "Bench Press",
        description:
          "Lie on a bench with a barbell above your chest, lower the bar down to your chest, then push it back up to the starting position.",
        reps: "10",
        sets: "3",
      },
    ],
  },
  Tuesday: {
    muscleGroup: "Back",
    duration: "00:30",
    exercise: [
      {
        name: "Deadlifts",
        description:
          "Stand with feet hip-width apart, bend at the hips and knees to lower the weights, then stand back up.",
        reps: "8",
        sets: "3",
      },
      {
        name: "Pull-ups",
        description:
          "Hang from a bar with hands shoulder-width apart, pull your body up until your chin is above the bar, then lower back down.",
        reps: "5",
        sets: "3",
      },
      {
        name: "Rows",
        description:
          "Hold a dumbbell in each hand, hinge at the hips, then pull the weights up to your sides, keeping your elbows close to your body.",
        reps: "12",
        sets: "3",
      },
      {
        name: "Reverse Flys",
        description: "Bend forward at the hips, then raise the weights out to the sides, squeezing your shoulder blades together.",
        reps: "15",
        sets: "3",
      }
    ],
  },
  Wednesday: {
    muscleGroup: "Shoulders",
    duration: "00:30",
    exercise: [
      {
        name: "Shoulder Press",
        description:
          "Stand with feet shoulder-width apart, hold a dumbbell in each hand at shoulder height, then push the weights up overhead.",
        reps: "12",
        sets: "3",
      },
    ],
  },
  Thursday: {
    muscleGroup: "Arms",
    duration: "00:30",
    exercise: [
      {
        name: "Bicep Curls",
        description:
          "Stand with feet shoulder-width apart, holding a dumbbell in each hand with palms facing forward. Curl the weights up to shoulder height, then lower them back to the starting position.",
        reps: "15",
        sets: "3",
      },
    ],
  },
  Friday: {
    muscleGroup: "Core",
    duration: "00:30",
    exercise: [
      {
        name: "Plank",
        description:
          "Get into a plank position with your forearms on the ground and your body in a straight line. Hold this position for the duration of the set.",
        reps: "1",
        sets: "3",
      },
    ],
  },
  Saturday: {
    muscleGroup: "Full Body",
    duration: "00:30 ",
    exercise: [
      {
        name: "Burpees",
        description:
          "Start in a standing position, drop into a squat, kick your feet back into a plank, perform a push-up, return to the squat position, and jump up with arms extended overhead.",
        reps: "10",
        sets: "3",
      },
    ],
  },
};

const Home: React.FC = () => {
  const currentMealType = getCurrentTimeZone();
  const currentMeals = meals[currentMealType];
  const currentDay = getCurrentDay();
  const currentWorkout = workoutData[currentDay];

  console.log(JSON.parse(localStorage.getItem("workoutPlan") || "{}"));
  
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
              <WorkoutCard day={currentDay} exercises={currentWorkout}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};



export default Home;
