import React from "react";
import { Card, CardContent, Grid, Typography, Box, Button } from "@mui/material";
import Image from "next/image";
import "../../styles/workoutCard.css"; // Assuming you have a separate CSS file for WorkoutCard styling

interface WorkoutExercise {
  muscleGroup: string;
  duration: string;
  name: string;
  description: string;
  reps: string;
  sets: string;
}

interface WorkoutCardProps {
  day: string;
  exercise: WorkoutExercise;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ day, exercise }) => {
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
        <Grid item display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <Typography className="exercise-description" variant="h4">
            Mucsles Group
          </Typography>
          <Typography className="exercise-description" variant="h6">
            {exercise.muscleGroup}
          </Typography>
          <br />
          <Typography className="exercise-description" variant="h5">
            {exercise.duration}
          </Typography>
          <Button>Start</Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default WorkoutCard;
