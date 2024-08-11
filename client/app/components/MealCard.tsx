
import React from "react";
import { Card, CardContent, Grid, Typography, Box, Button } from "@mui/material";
import Image from "next/image";
import "../../styles/mealCard.css";
import { MealCardProps } from "../services/interface";

// Import all possible images statically
import breakfastImage from "../images/food/Breakfast.png";
import lunchImage from "../images/food/Lunch.png";
import snacksImage from "../images/food/Snacks.png";
import dinnerImage from "../images/food/Dinner.png";

const mealImages: Record<string, any> = {
  breakfast: breakfastImage,
  lunch: lunchImage,
  snacks: snacksImage,
  dinner: dinnerImage,
};

const MealCard: React.FC<MealCardProps> = ({ mealType, meals }) => {
  console.log("MealCard - meals:", meals);  // Check the meals data

  const backgroundImage = mealImages[mealType.toLowerCase()];

  return (
    <Card className="mealCard">
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt={mealType}
          layout="fill"
          className="mealCardImage"
        />
      )}
      <Box className="mealCardOverlay" />
      <CardContent className="mealCardContent">
        <Typography variant="h5" className="mealCardTitle">
          {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
        </Typography>
        {/* <Grid container direction="column" spacing={2}>
          {meals.map((meal, index) => (
            <Grid item key={index}>
              <Typography variant="h6">{meal.name}</Typography>
              <Typography variant="body2">Ingredients:</Typography>
              <ul>
                {meal.ingredients.map((ingredient, idx) => (
                  <li key={idx}>
                    {ingredient.name}: {ingredient.amount}, Carbs: {ingredient.carbohydrates}g, Fats: {ingredient.fats}g, Proteins: {ingredient.proteins}g
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid> */}
      </CardContent>
      <Grid container className="mealCardFooter">
        {meals.map((meal, index) => (
          <Grid item key={index}>
            <Button>{meal.name}</Button>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};

export default MealCard;
