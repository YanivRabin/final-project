"use client";

import React, { useState } from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import MealCard from '../components/MealCard';
import { useCreateWorkoutPlanMutation } from '../services/feedApi'; // Adjust the import path as necessary
import backgroundImage from '../images/back.png';

// Define types for the response data
interface MealOption {
  name: string;
  carbs: number;
  fats: number;
  proteins: number;
  amount: string;
}

interface DailyPlan {
  breakfast: MealOption[];
  lunch: MealOption[];
  dinner: MealOption[];
}

interface WeeklyPlan {
  [key: string]: DailyPlan;
}

interface WorkoutPlanResponse {
  weeklyPlan: WeeklyPlan;
}

interface UserProfile {
  age: number;
  height: number;
  weight: number;
  workoutGoal: string;
  allergies: string[];
  trainingFrequency: string;
  biologicalSex: string;
  workoutLocation: string;
  daysPerWeek: number;
  minutesPerWorkout: number;
  includeWarmup: boolean;
  includeStretching: boolean;
}

const MealFeed: React.FC = () => {
  const [createWorkoutPlan, { data, error, isLoading }] = useCreateWorkoutPlanMutation();
  const [userProfile, setUserProfile] = useState<UserProfile>({
    age: 30,
    height: 180,
    weight: 75.5,
    workoutGoal: 'muscle gain',
    allergies: ['none'],
    trainingFrequency: '3-4 times a week',
    biologicalSex: 'male',
    workoutLocation: 'gym',
    daysPerWeek: 4,
    minutesPerWorkout: 60,
    includeWarmup: true,
    includeStretching: true,
  });

  const handleCreateWorkoutPlan = async () => {
    try {
      await createWorkoutPlan(userProfile);
    } catch (err) {
      console.error('Failed to create workout plan:', err);
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage.src}), linear-gradient(white, lightgrey)`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <Button variant="contained" onClick={handleCreateWorkoutPlan} disabled={isLoading}>
        Create Workout Plan
      </Button>
      
      {isLoading && <Typography>Loading...</Typography>}
      {error && <Typography>Error: {error.toString()}</Typography>}
      {data && data.weeklyPlan && (
        <Box>
          {Object.keys(data.weeklyPlan).map((day, idx) => (
            <Box key={idx} sx={{ mb: 4 }}>
              <Typography variant="h4" sx={{ textAlign: 'center', color: '#3D2D69', fontWeight: 'bold', mb: 2 }}>
                {day}
              </Typography>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} md={6} lg={4}>
                  <MealCard mealType="Breakfast" options={data.weeklyPlan[day].breakfast} />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <MealCard mealType="Lunch" options={data.weeklyPlan[day].lunch} />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <MealCard mealType="Dinner" options={data.weeklyPlan[day].dinner} />
                </Grid>
              </Grid>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default MealFeed;
