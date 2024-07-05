"use client";

import React from "react";
import { Box, Grid, Typography, CssBaseline } from "@mui/material";
import MealCard from "../components/MealCard";
import WorkoutCard from "../components/WorkoutCard";
import "../../styles/home.css";

const Home: React.FC = () => {
  const workoutData = {
    sunday: {
      muscleGroup: "Legs",
      duration: "30 minutes",
      name: "Squats",
      description:
        "Stand with feet hip-width apart, holding a dumbbell in each hand. Keeping your chest up and core braced, push your hips back, bend your knees, and lower your body until your thighs are at least parallel to the floor. Push yourself back to the starting position.",
      reps: "12",
      sets: "3",
    }
  };

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
                mealType="Breakfast"
                meals={[
                  "Oatmeal with Berries and Nuts",
                  "Scrambled Eggs with Avocado",
                ]}
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
              <WorkoutCard day="Sunday" exercie={workoutData["sunday"]} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
