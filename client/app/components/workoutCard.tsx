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
import "../../styles/workoutCard.css"; // Assuming you have a separate CSS file for WorkoutCard styling

interface Exercise {
  name: string;
  description: string;
  reps: string;
  sets: string;
}

interface WorkoutDetails {
  muscleGroup: string;
  duration: string;
  exercise: Exercise[];
}

interface WorkoutCardProps {
  day: string;
  exercises: WorkoutDetails;
}

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
          {day}
        </Typography>
      </CardContent>
      <Grid container className="workoutCardFooter">
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
            {exercises.muscleGroup}
          </Typography>
          <br />
          <Typography className="exercise-description" variant="h5">
            {exercises.duration}
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
      </Grid>
    </Card>
  );
};

export default WorkoutCard;
