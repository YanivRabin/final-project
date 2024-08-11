export interface Exercise {
  name: string;
  description: string;
  reps: string;
  sets: string;
}

export interface WorkoutDetails {
  muscleGroup: string;
  duration: string;
  exercise: Exercise[];
}

export interface WorkoutCardProps {
  day: string;
  exercises: WorkoutDetails;
}
