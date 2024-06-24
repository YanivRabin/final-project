import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface MealOption {
  name: string;
  carbs: number;
  fats: number;
  proteins: number;
  amount: string;
}

interface MealCardProps {
  mealType: string;
  options: MealOption[];
}

const MealCard: React.FC<MealCardProps> = ({ mealType, options }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{mealType}</Typography>
        {options.map((option, index) => (
          <Typography key={index}>
            {option.name}: Carbs {option.carbs}g, Fats {option.fats}g, Proteins {option.proteins}g, Amount: {option.amount}
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
};

export default MealCard;
