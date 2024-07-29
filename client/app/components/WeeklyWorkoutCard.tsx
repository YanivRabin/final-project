import React from "react";
import { Card, Grid, Typography, Box, Button } from "@mui/material";
import Link from "next/link";

const styles = {
  workoutCardOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  workoutCard: {
    position: "relative",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 1)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "20px",
    margin: "20px",
  },
  workoutCardTitle: {
    fontFamily: "'Inika', serif",
    fontSize: "2rem",
    width: "180px",
    marginRight: "100px",
    fontWeight: "bold",
  },
  muscleGroup: {
    fontSize: "1.2rem",
    width: "100px",
    marginRight: "100px",
    textAlign: "center",
  },
  duration: {
    fontSize: "1.5rem",
    width: "80px",
    marginRight: "100px",
  },
  startButton: {
    color: "#4e2a84",
    textDecoration: "underline",
    cursor: "pointer",
    fontSize: "1rem",
  },
};

interface Exercise {
  name: string;
  description: string;
  reps: string;
  sets: string;
}

interface WorkoutExercise {
  muscleGroup: string;
  duration: string;
  exercise: Exercise[];
}

interface WorkoutCardProps {
  day: string;
  exercises: WorkoutExercise;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ day, exercises }) => {
  return (
    <Card sx={styles.workoutCard}>
      <Box sx={styles.workoutCardOverlay} />
      <Grid container>
        <Grid
          item
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h5" sx={styles.workoutCardTitle}>
            {day}
          </Typography>
          <Typography sx={styles.muscleGroup} variant="h6">
            {exercises.muscleGroup}
          </Typography>
          <br />
          <Typography sx={styles.duration} variant="h5">
            {exercises.duration}
          </Typography>
          <Link
            href={{
              pathname: "/workoutDetail",
              query: { workout: JSON.stringify(exercises) },
            }}
            passHref
          >
            <Button sx={styles.startButton}>Start</Button>
          </Link>
        </Grid>
      </Grid>
    </Card>
  );
};

export default WorkoutCard;
