"use client";

import React, { useEffect, useState } from 'react';
import { Typography, Box, Grid, Container, Card, CardContent, Button } from '@mui/material';
import Image from 'next/image';
import { Meal } from '../services/interface';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'; // Import Recharts components

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

const COLORS = ['#0088FE', '#00C49F', '#FFBB28']; // Colors for the pie chart

const Nutrition: React.FC = () => {
  const [meals, setMeals] = useState<Meals>({});
  const [calories, setCalories] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fats, setFats] = useState(0);
  const [proteins, setProteins] = useState(0);

  useEffect(() => {
    const workoutPlan = JSON.parse(localStorage.getItem('workoutPlan') || '{}');
    
    if (workoutPlan?.nutritionalInformation) {
      const mealData = workoutPlan.nutritionalInformation;
      setMeals(mealData);
      
      let totalCalories = 0;
      let totalCarbs = 0;
      let totalFats = 0;
      let totalProteins = 0;

      Object.keys(mealData).forEach(mealType => {
        mealData[mealType].forEach((meal: Meal) => {
          meal.ingredients.forEach(ingredient => {
            const carbs = parseFloat(ingredient.carbohydrates) || 0;
            const fats = parseFloat(ingredient.fats) || 0;
            const proteins = parseFloat(ingredient.proteins) || 0;

            totalCarbs += carbs;
            totalFats += fats;
            totalProteins += proteins;

            // Calculate calories (4 calories per gram of carbs and proteins, 9 calories per gram of fat)
            totalCalories += (carbs + proteins) * 4 + fats * 9;
          });
        });
      });

      setCalories(totalCalories);
      setCarbs(totalCarbs);
      setFats(totalFats);
      setProteins(totalProteins);
    }
  }, []);

  const pieData = [
    { name: 'Carbs', value: carbs * 4 },
    { name: 'Fats', value: fats * 9 },
    { name: 'Proteins', value: proteins * 4 },
  ];

  return (
    <Container maxWidth="xl" sx={{ }}>
      <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', color: '#4e2a84', mb: 2 }}>
        DAILY MENU
      </Typography>


      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" align="center">
            Total : {calories} Calories
          </Typography>
          <Box display="flex" justifyContent="center" sx={{ mb: 4 }}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
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
