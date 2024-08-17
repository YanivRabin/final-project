"use client";

import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, CssBaseline } from "@mui/material";
import WeeklyWotkoutCard from "../components/WeeklyWorkoutCard";
import { Exercise } from "../services/interface";

interface WorkoutDetails {
  exercise: Exercise[];
  [key: string]: any;
}

const Workout: React.FC = () => {
  const [workoutData, setWorkoutData] = useState<WorkoutDetails | null>(null);

  useEffect(() => {
    const workoutPlan = JSON.parse(localStorage.getItem("workoutPlan") || "{}");
    setWorkoutData(workoutPlan.weeklyWorkout);
  }, []);

  if (!workoutData) {
    return null; // or a loading indicator
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
      <Typography
        variant="h4"
        sx={{
          marginTop: "2rem",
          marginBottom: "2rem",
          color: "#4e2a84",
          alignItems: "center",
        }}
      >
        WEEKLY PLAN
      </Typography>
      <Grid container alignItems="center" justifyContent="center">
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
                <WeeklyWotkoutCard day={day} exercises={workoutData[day]} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Workout;
