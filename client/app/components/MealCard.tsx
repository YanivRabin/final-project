import React from "react";
import { Card, CardContent, Grid, Typography, Box, Button } from "@mui/material";
import Image from "next/image";
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
  const backgroundImage = mealImages[mealType.toLowerCase()];

  return (
    <Card
      sx={{
        position: "relative",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        overflow: "hidden",
        width: "100%",
        maxWidth: "400px",
        height: "500px",
        margin: "20px auto",
      }}
    >
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt={mealType}
          fill
          style={{ objectFit: "cover", zIndex: 1 }}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      )}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          zIndex: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      />
      <CardContent
        sx={{
          position: "relative",
          zIndex: 3,
        }}
      >
        <Typography
          sx={{
            fontFamily: "'Inika', serif",
            color: "#ffffff",
            fontSize: "2rem",
            fontWeight: "bold",
            margin: "2px",
          }}
        >
          {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
        </Typography>
      </CardContent>
      <Grid
        container
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "50%",
          backgroundColor: "#000000",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          padding: "8px",
          zIndex: 3,
          opacity: 0.7,
        }}
      >
        {meals.map((meal, index) => (
          <Grid item key={index}>
            <Button
              sx={{
                backgroundColor: "rgba(255, 255, 255)",
                color: "#4e2a84",
                border: "3px solid #4e2a84",
                padding: "8px 16px",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "20px",
                fontWeight: "bold",
                width: "250px",
                "&:hover": {
                  backgroundColor: "#dddddd",
                },
              }}
            >
              {meal.name}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};

export default MealCard;
