import React from "react";
import { Card, CardContent, Grid, Typography, Box, Button } from "@mui/material";
import Image from "next/image";
import "../../styles/mealCard.css";

interface MealCardProps {
  mealType: string;
  meals: string[];
}

const MealCard: React.FC<MealCardProps> = ({ mealType, meals }) => {
  const backgroundImage = require(`../images/food/${mealType}.png`);

  return (
    <Card className="mealCard">
      <Image
        src={backgroundImage}
        alt={mealType}
        layout="fill"
        className="mealCardImage"
      />
      <Box className="mealCardOverlay" />
      <CardContent className="mealCardContent">
        <Typography variant="h5" className="mealCardTitle">
          {mealType}
        </Typography>
      </CardContent>
      <Grid container className="mealCardFooter">
        {meals.map((meal, index) => (
          <Grid item key={index}>
            <Button>{meal}</Button>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};

export default MealCard;
