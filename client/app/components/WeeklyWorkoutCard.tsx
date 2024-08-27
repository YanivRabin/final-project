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
    width: "50vh",
    height: "100%",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 1)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    marginTop: "20px",
    marginBottom: "20px",
  },
  workoutCardTitle: {
    fontFamily: "'Inika', serif",
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginRight: "10px",
  },
  duration: {
    fontSize: "1.2rem",
  },
  startButton: {
    color: "#4e2a84",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
  },
};

const formatMinutesStringToHHMM = (minutesString: string): string => {
  const totalMinutes = parseInt(minutesString, 10);

  if (isNaN(totalMinutes) || totalMinutes < 0) {
    return "Invalid input";
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const paddedHours = String(hours).padStart(2, "0");
  const paddedMinutes = String(minutes).padStart(2, "0");

  return `${paddedHours}:${paddedMinutes}`;
};

const WorkoutCard: React.FC<WorkoutCardProps> = ({ day, exercises }) => {
  const [duration, setDuration] = useState("0");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userDuration = user?.minutesPerWorkout || "0";
    setDuration(userDuration);
  }, []);

  const isRestDay = exercises?.[0]?.name === "Rest";

  return (
    <Card
      sx={[
        styles.workoutCard,
        isRestDay ? { background: "#e1e1e1" } : { background: "#E6E6FA" },
      ]}
    >
      <Box sx={styles.workoutCardOverlay} />
      <Grid container alignItems="center">
        <Grid
          item
          xs={12}
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography sx={styles.workoutCardTitle}>
            {day.charAt(0).toUpperCase() + day.slice(1)}
          </Typography>
          {isRestDay ? (
            <>
              <Typography>Rest Day</Typography>
            </>
          ) : (
            <>
              <Typography sx={styles.duration}>
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
