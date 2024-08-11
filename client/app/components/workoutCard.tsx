import React from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  Button,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { WorkoutCardProps } from "../services/interface";
import "../../styles/workoutCard.css";

const formatMinutesStringToHHMM = (minutesString: string): string => {
  // Parse the string into an integer
  const totalMinutes = parseInt(minutesString, 10);
  
  // Handle invalid input
  if (isNaN(totalMinutes) || totalMinutes < 0) {
    return "Invalid input";
  }

  // Calculate hours and minutes
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  // Pad hours and minutes with leading zeros if necessary
  const paddedHours = String(hours).padStart(2, '0');
  const paddedMinutes = String(minutes).padStart(2, '0');

  // Return the formatted time
  return `${paddedHours}:${paddedMinutes}`;
};

const WorkoutCard: React.FC<WorkoutCardProps> = ({ day, exercises }) => {
  const backgroundImage = require(`../images/workout/next-workout.png`);
  console.log("exercises", exercises);
  

  return (
    <Card className="workoutCard">
      <Image
        src={backgroundImage}
        alt={day}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Add sizes prop for better performance

        className="workoutCardImage"
       

      />
      <Box className="workoutCardOverlay" />
      <CardContent className="workoutCardContent">
        <Typography variant="h5" className="workoutCardTitle">
          {day.charAt(0).toUpperCase() + day.slice(1)}
        </Typography>
      </CardContent>
      <Grid container className="workoutCardFooter">
        {exercises.exercise[0].name === "Rest" ? (
          <Typography className="exercise-description" variant="h3">
            Rest Day
          </Typography>
        ) : (
          <Grid
            item
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Typography className="exercise-description" variant="h4">
              Mucsles Group
            </Typography>
            <Typography className="exercise-description" variant="h6">
              Full Body
            </Typography>
            <br />
            <Typography className="exercise-description" variant="h4">
              Duration
            </Typography>
            <Typography className="exercise-description" variant="h5">
              {formatMinutesStringToHHMM(exercises.duration)}
            </Typography>
            <Link
              href={{
                pathname: "/workoutDetail",
                query: { workout: JSON.stringify(exercises) },
              }}
              passHref
            >
              <Button>Start</Button>
            </Link>
          </Grid>
        )}
      </Grid>
    </Card>
  );
};

export default WorkoutCard;
