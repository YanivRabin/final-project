import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

interface MealOption {
  name: string;
  ingredients: {
    name: string;
    carbohydrates: string;
    fats: string;
    proteins: string;
    amount: string;
  }[];
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
          <div key={index}>
            <Typography variant="h6">{option.name}</Typography>
            {option.ingredients.map((ingredient, index2) => (
              <Typography key={index2}>
                {ingredient.name}: Carbs {ingredient.carbohydrates}g, Fats {ingredient.fats}g, Proteins {ingredient.proteins}g, Amount: {ingredient.amount}
              </Typography>
            ))}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default MealCard;
