"use client";

import React, { useEffect, useState } from 'react';
import { Typography, Box, Grid, Container, Card, CardContent, Button } from '@mui/material';
import Image from 'next/image';
import { Meal, MealCardProps } from '../services/interface'; // Adjust the import path as needed

// Image imports
import breakfastImage from '../images/food/Breakfast.png';
import lunchImage from '../images/food/Lunch.png';
import dinnerImage from '../images/food/Dinner.png';
import snacksImage from '../images/food/Snacks.png';

const mealImages: Record<string, any> = {
    breakfast: breakfastImage,
    lunch: lunchImage,
    snacks: snacksImage,
    dinner: dinnerImage,
  };

interface Meals {
  [key: string]: Meal[];
}

const Nutrition: React.FC = () => {
  const [meals, setMeals] = useState<Meals>({});
  const [calories, setCalories] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fats, setFats] = useState(0);
  const [proteins, setProteins] = useState(0);

  useEffect(() => {
    const workoutPlan = JSON.parse(localStorage.getItem('workoutPlan') || '{}');
    
    if (workoutPlan?.nutritionalInformation) {
      setMeals(workoutPlan.nutritionalInformation);
      setCalories(workoutPlan.totalCalories || 0);
      setCarbs(workoutPlan.totalCarbs || 0);
      setFats(workoutPlan.totalFats || 0);
      setProteins(workoutPlan.totalProteins || 0);
    }
  }, []);

  return (
    <Container maxWidth="xl" sx={{ }}>
      <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', color: '#4e2a84', mb: 2 }}>
        DAILY MENU
      </Typography>
      <Typography variant="body1" align="center" sx={{ mb: 4 }}>
        For each meal you get two options to choose from
      </Typography>

      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" align="center">
            {calories} Calories
          </Typography>
          <Box display="flex" justifyContent="space-around" sx={{ mb: 4 }}>
            <Box>
              <Typography variant="body2" color="textSecondary">{Math.round((carbs / (carbs + fats + proteins)) * 100)}%</Typography>
              <Typography variant="body2">{carbs} g Carbs</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="textSecondary">{Math.round((fats / (carbs + fats + proteins)) * 100)}%</Typography>
              <Typography variant="body2">{fats} g Fats</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="textSecondary">{Math.round((proteins / (carbs + fats + proteins)) * 100)}%</Typography>
              <Typography variant="body2">{proteins} g Proteins</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        {Object.keys(meals).map((mealType) => (
          <Grid item xs={12} md={3} key={mealType}>
            <Card sx={{ position: 'relative', height: 400 }}>
              <Image
                src={mealImages[mealType.toLowerCase()]}
                alt={mealType}
                fill
                objectFit="cover"
                className="mealCardImage"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ filter: 'brightness(0.7)' }}
              />
              <CardContent sx={{ position: 'absolute', bottom: 0, color: 'white' }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
                </Typography>
                {meals[mealType].map((option, index) => (
                  <Button key={index} variant="contained" sx={{ mt: 1, backgroundColor: '#4e2a84', width: '100%' }}>
                    {option.name}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Nutrition;
