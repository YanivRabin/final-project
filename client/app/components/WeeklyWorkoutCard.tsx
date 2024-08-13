import React, { useEffect, useState } from "react";
import { Card, Grid, Typography, Box, Button } from "@mui/material";
import Link from "next/link";
import { Exercise } from "../services/interface";

interface WorkoutCardProps {
  day: string;
  exercises: Exercise[];
}

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

const formatMinutesStringToHHMM = (minutesString: string): string => {
  const totalMinutes = parseInt(minutesString, 10);

  if (isNaN(totalMinutes) || totalMinutes < 0) {
    return "Invalid input";
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const paddedHours = String(hours).padStart(2, '0');
  const paddedMinutes = String(minutes).padStart(2, '0');

  return `${paddedHours}:${paddedMinutes}`;
};

const WorkoutCard: React.FC<WorkoutCardProps> = ({ day, exercises }) => {
  const [duration, setDuration] = useState("0");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userDuration = user?.minutesPerWorkout || "0";
    setDuration(userDuration);
  }, []);

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
            {day.charAt(0).toUpperCase() + day.slice(1)}
          </Typography>
          {exercises[0].name === "Rest" ? (
            <>
              <Typography sx={styles.muscleGroup} variant="h6">
                Rest Day
              </Typography>
              <br />
              <Typography sx={styles.duration} variant="h5">
                00:00
              </Typography>
              <Button disabled></Button>
            </>
          ) : (
            <>
              <Typography sx={styles.muscleGroup} variant="h6">
                Full Body
              </Typography>
              <br />
              <Typography sx={styles.duration} variant="h5">
                {formatMinutesStringToHHMM(duration)}
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
            </>
          )}
        </Grid>
      </Grid>
    </Card>
  );
};

export default WorkoutCard;
