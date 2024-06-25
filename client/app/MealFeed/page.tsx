"use client";

import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import MealCard from '../components/MealCard';
import { useCreateWorkoutPlanMutation } from '../services/feedApi'; 
import backgroundImage from '../images/back.png';

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

  useEffect(() => {
    if (data) {
      console.log('Received data:', data);
      if (data.nutritionalInformation) {
        console.log('Nutritional Information:', data.nutritionalInformation);
      } else {
        console.log('No nutritionalInformation in the response');
      }
    }
  }, [data]);

  const handleCreateWorkoutPlan = async () => {
    try {
      await createWorkoutPlan(userProfile).unwrap();
      console.log(data.nutritionalInformation.breakfast);
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
      {data && data.nutritionalInformation ? (
        <Box>
          <Typography variant="h4" sx={{ textAlign: 'center', color: '#3D2D69', fontWeight: 'bold', mb: 2 }}>
            Daily Menu
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={6} lg={4}>
              <MealCard mealType="Breakfast" options={data.nutritionalInformation.breakfast} />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MealCard mealType="Lunch" options={data.nutritionalInformation.lunch} />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MealCard mealType="Dinner" options={data.nutritionalInformation.dinner} />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MealCard mealType="Snacks" options={data.nutritionalInformation.snacks} />
            </Grid>
          </Grid>
        </Box>
      ) : (
        !isLoading && <Typography>No data available</Typography>
      )}
    </Box>
  );
};

export default MealFeed;
