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

const WorkoutCard: React.FC<WorkoutCardProps> = ({ day, exercises }) => {
  const backgroundImage = require(`../images/workout/next-workout.png`);

  return (
    <Card className="workoutCard">
      <Image
        src={backgroundImage}
        alt={day}
        layout="fill"
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
            {/* <Typography className="exercise-description" variant="h4">
              Mucsles Group
            </Typography>
            <Typography className="exercise-description" variant="h6">
              {exercises.muscleGroup}
            </Typography> */}
            <br />
            <Typography className="exercise-description" variant="h4">
              Duration
            </Typography>
            <Typography className="exercise-description" variant="h5">
              {exercises.duration} minutes
            </Typography>
            <br />
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
