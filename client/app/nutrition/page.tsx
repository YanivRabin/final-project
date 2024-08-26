"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  Container,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Avatar,
} from "@mui/material";
import { Meal } from "../services/interface";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import MealCard from "../components/MealCard";
import BreakfastIcon from "@mui/icons-material/FreeBreakfast";
import LunchIcon from "@mui/icons-material/LunchDining";
import DinnerIcon from "@mui/icons-material/DinnerDining";
import SnackIcon from "@mui/icons-material/Fastfood";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Nutrition: React.FC = () => {
  const [meals, setMeals] = useState<Record<string, Meal[]>>({});
  const [totalCalories, setTotalCalories] = useState(0);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [dialogContent, setDialogContent] = useState<Meal | null>(null);

  useEffect(() => {
    const workoutPlan = JSON.parse(localStorage.getItem("workoutPlan") || "{}");

    if (workoutPlan?.nutritionalInformation) {
      const mealData = workoutPlan.nutritionalInformation;
      setMeals(mealData);

      // Get total calories from specificCalories
      setTotalCalories(workoutPlan.specificCalories);
    }
  }, []);

  const handleOpenDialog = (meal: Meal) => {
    setDialogContent(meal);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDialogContent(null);
  };

  const calculateMealNutrition = (meal: Meal) => {
    let totalCarbs = 0;
    let totalFats = 0;
    let totalProteins = 0;

    meal.ingredients.forEach((ingredient) => {
      const carbs = parseFloat(ingredient.carbohydrates) || 0;
      const fats = parseFloat(ingredient.fats) || 0;
      const proteins = parseFloat(ingredient.proteins) || 0;

      totalCarbs += carbs;
      totalFats += fats;
      totalProteins += proteins;
    });

    return {
      carbs: Math.round(totalCarbs),
      fats: Math.round(totalFats),
      proteins: Math.round(totalProteins),
      calories: Math.round((totalCarbs + totalProteins) * 4 + totalFats * 9),
    };
  };

  const mealIcons: Record<string, JSX.Element> = {
    Breakfast: <BreakfastIcon sx={{ fontSize: 40, color: "#ff9800" }} />,
    Lunch: <LunchIcon sx={{ fontSize: 40, color: "#4caf50" }} />,
    Dinner: <DinnerIcon sx={{ fontSize: 40, color: "#f44336" }} />,
    Snack: <SnackIcon sx={{ fontSize: 40, color: "#3f51b5" }} />,
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 8 }}>
      <Box
        sx={{
          background: "linear-gradient(to right, #6a11cb, #2575fc)",
          borderRadius: "12px",
          padding: "2rem",
          boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
          marginBottom: "2rem",
          position: "relative",
        }}
      >
        <Typography
          variant="h2"
          align="center"
          sx={{
            fontFamily: "'Roboto', sans-serif",
            fontWeight: 700,
            color: "white",
            marginBottom: "1rem",
          }}
        >
          DAILY MENU
        </Typography>
        <Typography variant="h5" align="center" sx={{ color: "white" }}>
        Have a Nice Meal
        </Typography>
      </Box>

      <Grid container justifyContent="center" alignItems="center" spacing={4}>
        <Grid item xs={12} md={4}>
          <Typography variant="h5" align="center" sx={{ fontWeight: 600 }}>
            {totalCalories} Daily Calories Recommendation
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        {Object.keys(meals).map((mealType) => (
          <Grid item xs={12} md={3} key={mealType}>
            <Box
              sx={{
                boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
                borderRadius: "12px",
                textAlign: "center",
                padding: 2,
              }}
            >
             
              <MealCard
                mealType={mealType}
                meals={meals[mealType]}
                onClick={handleOpenDialog}
              />
              <Box sx={{ mt: 2 }}>
                {meals[mealType].map((meal, index) => {
                  const nutrition = calculateMealNutrition(meal);

                  const pieData = [
                    { name: "Carbs", value: nutrition.carbs * 4 },
                    { name: "Fats", value: nutrition.fats * 9 },
                    { name: "Proteins", value: nutrition.proteins * 4 },
                  ];

                  return (
                    <Box key={index} sx={{ mb: 4 }}>
                      <Typography variant="body1" align="center" sx={{ mb: 1 }}>
                        Option {index + 1}: {nutrition.calories} Calories
                      </Typography>
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            outerRadius={60}
                            innerRadius={40}
                            label={({ name, value }) => `${name}: ${value}`}
                            dataKey="value"
                            isAnimationActive={true}
                            animationDuration={800}
                          >
                            {pieData.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                                stroke="#ffffff"
                                strokeWidth={2}
                              />
                            ))}
                          </Pie>
                          <Tooltip />
                          {/* <Legend /> */}
                        </PieChart>
                      </ResponsiveContainer>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperProps={{
          sx: {
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>
          {dialogContent?.name}
        </DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Ingredient</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell align="right">Carbs (g)</TableCell>
                  <TableCell align="right">Fats (g)</TableCell>
                  <TableCell align="right">Proteins (g)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dialogContent?.ingredients.map((ingredient, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {ingredient.name}
                    </TableCell>
                    <TableCell align="right">{ingredient.amount}</TableCell>
                    <TableCell align="right">
                      {ingredient.carbohydrates}
                    </TableCell>
                    <TableCell align="right">{ingredient.fats}</TableCell>
                    <TableCell align="right">{ingredient.proteins}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: "#4e2a84",
              "&:hover": {
                backgroundColor: "#6a11cb",
              },
            }}
            onClick={handleCloseDialog}
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Nutrition;
