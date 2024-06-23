import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import MealCard from '../components/MealCard';
import { weeklyPlan } from '../MealData';
import backgroundImage from '../images/back.png'; 

const MealFeed: React.FC = () => {
  console.log(backgroundImage);

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
  
      
      {Object.keys(weeklyPlan).map((day, idx) => (
        <Box key={idx} sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ textAlign: 'center', color: '#3D2D69', fontWeight: 'bold', mb: 2 }}>
            {day}
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={6} lg={4}>
              <MealCard mealType="Breakfast" options={weeklyPlan[day as keyof typeof weeklyPlan].breakfast} />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MealCard mealType="Lunch" options={weeklyPlan[day as keyof typeof weeklyPlan].lunch} />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MealCard mealType="Dinner" options={weeklyPlan[day as keyof typeof weeklyPlan].dinner} />
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default MealFeed;
