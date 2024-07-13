import React from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  Button,
} from "@mui/material";
import "../../styles/weeklyWorkoutCard.css";
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
  return (
    <Card className="workoutCard">
      <Box className="workoutCardOverlay" />
      <Grid container className="workoutCardFooter">
        <Grid
          item
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h5" className="workoutCardTitle">
            {day}
          </Typography>
          <Typography className="muscleGroup" variant="h6">
            {exercise.muscleGroup}
          </Typography>
          <br />
          <Typography className="duration" variant="h5">
            {exercise.duration}
          </Typography>
          <Button className="startButton">Start</Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default WorkoutCard;
