"use client";

import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Paper, IconButton, Dialog, DialogTitle, DialogContent } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import InfoIcon from '@mui/icons-material/Info';
import { useSearchParams } from "next/navigation";

interface Exercise {
  name: string;
  muscleGroup: string;
  duration: string;
  description: string;
  reps: string;
  sets: string;
}

interface WorkoutExercise {
  muscleGroup: string;
  duration: string;
  exercise: Exercise[];
}

const WorkoutDetailPage: React.FC = () => {
  const searchParams = useSearchParams();
  const workout = searchParams.get("workout");

  const [workoutData, setWorkoutData] = useState<WorkoutExercise | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [dialogContent, setDialogContent] = useState<string>("");

  useEffect(() => {
    if (workout) {
      try {
        const parsedWorkout = JSON.parse(workout as string) as WorkoutExercise;
        setWorkoutData(parsedWorkout);
      } catch (error) {
        console.error("Failed to parse workout data:", error);
      }
    }
  }, [workout]);

  const handleExerciseClick = (exerciseName: string) => {
    setSelectedExercise(exerciseName);
  };

  const isExerciseCompleted = (exerciseName: string) => {
    return selectedExercise === exerciseName;
  };

  const handleOpenDialog = (description: string) => {
    setDialogContent(description);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDialogContent("");
  };

  if (!workoutData) return <div>Loading...</div>;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <Typography variant="h2" sx={{ marginBottom: "2rem", color: "#4e2a84" }}>
        Workout Routine
      </Typography>
      <Typography variant="h4" sx={{ marginBottom: "2rem", color: "#4e2a84" }}>
        Muscle Group: {workoutData.muscleGroup}
      </Typography>
      <Typography variant="h5" sx={{ marginBottom: "2rem", color: "#4e2a84" }}>
        Duration: {workoutData.duration}
      </Typography>
      <Grid container spacing={2} sx={{ width: "100%" }}>
        <Grid item xs={12}>
          <Paper
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "1rem",
              backgroundColor: "#f5f5f5",
            }}
          >
            <Typography variant="h6">EXERCISE</Typography>
            <Typography variant="h6">SETS</Typography>
            <Typography variant="h6">REPS</Typography>
            <Box sx={{ width: "80px", textAlign: "center" }}></Box>
          </Paper>
        </Grid>
        {workoutData.exercise.map((exercise) => (
          <Grid item xs={12} key={exercise.name}>
            <Paper
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem",
                backgroundColor: isExerciseCompleted(exercise.name)
                  ? "#d3d3d3"
                  : "#ffffff",
                borderColor: selectedExercise === exercise.name ? "#4e2a84" : "#000",
                borderStyle: "solid",
                borderWidth: "2px",
                cursor: "pointer",
              }}
              onClick={() => handleExerciseClick(exercise.name)}
            >
              <IconButton>
                {isExerciseCompleted(exercise.name) ? <CheckIcon sx={{ color: "#4e2a84" }} /> : <Box sx={{ width: 24 }} />}
              </IconButton>
              <Typography
                variant="body1"
                sx={{ color: selectedExercise === exercise.name ? "#4e2a84" : "#000", flexGrow: 1 }}
              >
                {exercise.name}
              </Typography>
              <Typography variant="body1">{exercise.sets}</Typography>
              <Typography variant="body1">{exercise.reps}</Typography>
              <IconButton onClick={(e) => { e.stopPropagation(); handleOpenDialog(exercise.description); }}>
                <InfoIcon />
              </IconButton>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Exercise Description</DialogTitle>
        <DialogContent>
          <Typography>{dialogContent}</Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default WorkoutDetailPage;
