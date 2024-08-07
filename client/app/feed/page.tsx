"use client";

import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import MealCard from '../components/MealCard';
import { useCreateWorkoutPlanMutation } from '../services/feedApi'; 
import backgroundImage from '../images/back.png';
import WorkoutCard from '../components/workoutCard';
interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  gender: string;
  age: number;
  height: number;
  weight: number;
  workoutGoals: string;
  daysPerWeek: number;
  minutesPerWorkout: number;
  workoutLocation: string;
  includeWarmup: boolean;
  includeStreching: boolean;
  dietaryRestrictions: {
    vegan: boolean;
    vegetarian: boolean;
    pescatarian: boolean;
    glutenFree: boolean;
    dairyFree: boolean;
    nutFree: boolean;
    soyFree: boolean;
    eggFree: boolean;
    shellfishFree: boolean;
    lactoseFree: boolean;
    kosher: boolean;
    halal: boolean;
    other: string;
  }
}

const MealFeed: React.FC = () => {
  const [createWorkoutPlan, { data, error, isLoading }] = useCreateWorkoutPlanMutation();
  const [userProfile, setUserProfile] = useState<UserProfile>();
  
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        setUserProfile(parsedUser);
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
      }
    }
  },[])

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
    console.log(userProfile)
    try {
      await createWorkoutPlan(userProfile).unwrap();
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
{/*       
      {isLoading && <Typography>Loading...</Typography>}
      {error && <Typography>Error: {error.toString()}</Typography>}
      {data && data.nutritionalInformation ? (
          <Box>
          <Typography variant="h4" sx={{ textAlign: 'center', color: '#3D2D69', fontWeight: 'bold', mb: 2 }}>
            Daily Menu
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={6} lg={4}>
              <MealCard mealType="Breakfast" meals={data.nutritionalInformation.breakfast} />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MealCard mealType="Lunch" meals={data.nutritionalInformation.lunch} />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MealCard mealType="Dinner" meals={data.nutritionalInformation.dinner} />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MealCard mealType="Snacks" meals={data.nutritionalInformation.snacks} />
            </Grid>
          </Grid>

          <Typography variant="h4" sx={{ textAlign: 'center', color: '#3D2D69', fontWeight: 'bold', mb: 2 }}>
            Your Weekly Workout Plan
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {Object.keys(data.weeklyWorkout).map((day, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <WorkoutCard day={day} plan={data.weeklyWorkout[day]} />
              </Grid>
            ))}
          </Grid>
        </Box>
        
      ) : (
        !isLoading && <Typography>No data available</Typography>
      )} */}
    </Box>
  );
};

export default MealFeed;
