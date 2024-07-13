"use client";

import React from "react";
import { Box, Grid, Typography, CssBaseline } from "@mui/material";
import WeeklyWotkoutCard from "../components/WeeklyWorkoutCard";
import "../../styles/home.css";

interface WorkoutDetails {
  muscleGroup: string;
  duration: string;
  name: string;
  description: string;
  reps: string;
  sets: string;
}

type DaysOfWeek = "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";


const workoutData: Record<DaysOfWeek, WorkoutDetails> = {
  Sunday: {
    muscleGroup: "Legs",
    duration: "00:30",
    name: "Squats",
    description:
      "Stand with feet hip-width apart, holding a dumbbell in each hand. Keeping your chest up and core braced, push your hips back, bend your knees, and lower your body until your thighs are at least parallel to the floor. Push yourself back to the starting position.",
    reps: "12",
    sets: "3",
  },
  Monday: {
    muscleGroup: "Chest",
    duration: "00:30",
    name: "Push-ups",
    description:
      "Get into a plank position with your hands slightly wider than shoulder-width apart. Keeping your body in a straight line, lower yourself until your chest is just above the floor, then push yourself back up.",
    reps: "15",
    sets: "3",
  },
  Tuesday: {
    muscleGroup: "Back",
    duration: "00:30",
    name: "Pull-ups",
    description:
      "Grab a pull-up bar with your hands slightly wider than shoulder-width apart. Pull your body up until your chin is above the bar, then lower yourself back down.",
    reps: "10",
    sets: "3",
  },
  Wednesday: {
    muscleGroup: "Shoulders",
    duration: "00:30",
    name: "Shoulder Press",
    description:
      "Stand with feet shoulder-width apart, holding a dumbbell in each hand at shoulder height. Press the weights overhead until your arms are fully extended, then lower them back to the starting position.",
    reps: "12",
    sets: "3",
  },
  Thursday: {
    muscleGroup: "Arms",
    duration: "00:30",
    name: "Bicep Curls",
    description:
      "Stand with feet shoulder-width apart, holding a dumbbell in each hand with palms facing forward. Curl the weights up to shoulder height, then lower them back to the starting position.",
    reps: "15",
    sets: "3",
  },
  Friday: {
    muscleGroup: "Core",
    duration: "00:30",
    name: "Plank",
    description:
      "Get into a plank position with your forearms on the ground and your body in a straight line. Hold this position for the duration of the set.",
    reps: "1",
    sets: "3",
  },
  Saturday: {
    muscleGroup: "Full Body",
    duration: "00:30 ",
    name: "Burpees",
    description:
      "Start in a standing position, drop into a squat, kick your feet back into a plank, perform a push-up, return to the squat position, and jump up with arms extended overhead.",
    reps: "10",
    sets: "3",
  },
};

const Workout: React.FC = () => {
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
        {/* Workout card */}
        <Grid item>
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="space-between"
            height="100%"
          >
            {Object.keys(workoutData).map((day) => (
              <Grid item key={day}>
                <WeeklyWotkoutCard day={day} exercise={workoutData[day as DaysOfWeek]} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Workout;
