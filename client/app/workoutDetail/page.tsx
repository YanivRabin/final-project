"use client";

import React, { useState } from "react";
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
import { Exercise } from "../services/interface";
import mountainClimbersGif from "../images/workout/mountain-climbers.gif";

interface WorkoutExercise {
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
  const parsedWorkout = workout ? JSON.parse(workout) : null;
  const workoutData = parsedWorkout?.exercise ?? parsedWorkout;
  
  const [selectedExerciseIndex, setSelectedExerciseIndex] = useState<number>(0);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [dialogContent, setDialogContent] = useState<string>("");

  const handleOpenDialog = (description: string) => {
    setDialogContent(description);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDialogContent("");
  };

  const handleNextExercise = () => {
    const nextIndex = selectedExerciseIndex + 1;
    if (nextIndex < workoutData.length + 1) {
      setSelectedExerciseIndex(nextIndex);
    } else {
      window.location.href = "/home";
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
        {workoutData.map((exercise: Exercise, index: number) => (
          <Grid item xs={12} key={exercise.name}>
            <Paper
              sx={styles.exercisePaper(
                index < selectedExerciseIndex,
                index === selectedExerciseIndex
              )}
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
              {exercise.name === "mountain-climbers" && index === selectedExerciseIndex && (
                <img
                  src={mountainClimbersGif.src}
                  alt="Mountain Climbers"
                  style={{ width: '100px', marginLeft: '10px' }}
                />
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        sx={styles.button}
        onClick={handleNextExercise}
        disabled={selectedExerciseIndex >= workoutData.length}
      >
        {selectedExerciseIndex < workoutData.length ? "Next" : "Done"}
      </Button>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Exercise Description</DialogTitle>
        <DialogContent>
          {dialogContent === "Mountain Climbers Description" && (
            <img
              src={mountainClimbersGif.src}
              alt="Mountain Climbers"
              style={{ width: '100%', marginBottom: '10px' }}
            />
          )}
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
