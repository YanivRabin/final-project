import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

interface WorkoutExercise {
  name: string;
  description: string;
  reps: string;
  sets: string;
}

interface WorkoutCardProps {
  day: string;
  exercises: WorkoutExercise[];
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ day, exercises }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{day}</Typography>
        {exercises.map((exercise, index) => (
          <div key={index}>
            <Typography variant="h6">{exercise.name}</Typography>
            <Typography>
              Sets: {exercise.sets}, Reps: {exercise.reps}, Description: {exercise.description}
            </Typography>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default WorkoutCard;
