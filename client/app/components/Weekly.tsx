import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import MealCard from './MealCard';
import { weeklyPlan } from '../MealData';

const Weekly: React.FC = () => {
  return (
    <Box>
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

export default Weekly;
