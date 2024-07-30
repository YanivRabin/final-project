"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import InfoIcon from "@mui/icons-material/Info";
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

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem",
  },
  title: {
    marginTop: "4rem",
    marginBottom: "4rem",
    color: "#4e2a84",
    position: "relative",
  },
  gridContainer: {
    width: "60%",
  },
  headerPaper: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem",
    paddingLeft: "4rem",
    paddingRight: "3.3rem",
    backgroundColor: "#f5f5f5",
  },
  headerText: {
    width: "55%",
  },
  setsText: {
    width: "20%",
    textAlign: "center",
  },
  exercisePaper: (selected: boolean, current: boolean) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem",
    backgroundColor: selected ? "#d3d3d3" : current ? "#E6E6FA" : "#ffffff",
    borderColor: selected ? "#4e2a84" : "#000",
    borderStyle: "solid",
    borderWidth: "2px",
    width: "100%",
    cursor: current ? "pointer" : "default",
  }),
  exerciseName: (selected: boolean) => ({
    color: selected ? "#4e2a84" : "#000",
    marginLeft: "1rem",
    fontFamily: "'Inika', serif",
    fontSize: "1.5rem",
    width: "180px",
    marginRight: "100px",
    fontWeight: "bold",
  }),
  button: {
    marginTop: "2rem",
    backgroundColor: "#4e2a84",
    color: "#ffffff",
  },
  dialogContent: {
    padding: "1rem",
  },
  closeButton: {
    marginTop: "1rem",
    backgroundColor: "#4e2a84",
    color: "#ffffff",
  },
};

const WorkoutDetailPage: React.FC = () => {
  const searchParams = useSearchParams();
  const workout = searchParams.get("workout");

  const [workoutData, setWorkoutData] = useState<WorkoutExercise | null>(null);
  const [selectedExerciseIndex, setSelectedExerciseIndex] = useState<number>(0);
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

  const handleOpenDialog = (description: string) => {
    setDialogContent(description);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDialogContent("");
  };

  const handleNextExercise = () => {
    if (workoutData) {
      const nextIndex = selectedExerciseIndex + 1;
      if (nextIndex < workoutData.exercise.length + 1) {
        setSelectedExerciseIndex(nextIndex);
      } else {
        // Navigate to /home after completing all exercises
        window.location.href = "/home";
      }
    }
  };

  if (!workoutData) return <div>Loading...</div>;

  return (
    <Box sx={styles.container}>
      <Typography variant="h2" sx={styles.title}>
        ROUTINE
      </Typography>
      <Grid container spacing={2} sx={styles.gridContainer}>
        <Grid item xs={12}>
          <Paper sx={styles.headerPaper}>
            <Typography variant="h6" sx={styles.headerText}>
              EXERCISE
            </Typography>
            <Typography variant="h6" sx={styles.setsText}>
              SETS
            </Typography>
            <Typography variant="h6" sx={styles.setsText}>
              REPS
            </Typography>
          </Paper>
        </Grid>
        {workoutData.exercise.map((exercise, index) => (
          <Grid item xs={12} key={exercise.name}>
            <Paper
              sx={styles.exercisePaper(index < selectedExerciseIndex, index === selectedExerciseIndex)}
              onClick={() =>
                index === selectedExerciseIndex &&
                handleOpenDialog(exercise.description)
              }
            >
              <Box sx={{ display: "flex", alignItems: "center", width: "60%" }}>
                <IconButton>
                  {index < selectedExerciseIndex ? (
                    <CheckIcon sx={{ color: "#4e2a84" }} />
                  ) : (
                    <Box sx={{ width: 24 }} />
                  )}
                </IconButton>
                <Typography
                  variant="body1"
                  sx={styles.exerciseName(index === selectedExerciseIndex)}
                >
                  {exercise.name}
                </Typography>
              </Box>
              <Typography variant="body1" sx={styles.setsText}>
                {exercise.sets}
              </Typography>
              <Typography variant="body1" sx={styles.setsText}>
                {exercise.reps}
              </Typography>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenDialog(exercise.description);
                }}
              >
                <InfoIcon />
              </IconButton>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        sx={styles.button}
        onClick={handleNextExercise}
        disabled={selectedExerciseIndex > workoutData.exercise.length}
      >
        {selectedExerciseIndex < workoutData.exercise.length 
          ? "Next"
          : "Done"}
      </Button>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Exercise Description</DialogTitle>
        <DialogContent>
          <Typography>{dialogContent}</Typography>
          <Button
            variant="contained"
            sx={styles.closeButton}
            onClick={handleCloseDialog}
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default WorkoutDetailPage;
