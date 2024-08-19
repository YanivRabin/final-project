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
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import MealCard from "../components/MealCard";
import BreakfastIcon from '@mui/icons-material/FreeBreakfast';
import LunchIcon from '@mui/icons-material/LunchDining';
import DinnerIcon from '@mui/icons-material/DinnerDining';
import SnackIcon from '@mui/icons-material/Fastfood';

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Nutrition: React.FC = () => {
  const [meals, setMeals] = useState<Record<string, Meal[]>>({});
  const [calories, setCalories] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fats, setFats] = useState(0);
  const [proteins, setProteins] = useState(0);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [dialogContent, setDialogContent] = useState<Meal | null>(null);

  useEffect(() => {
    const workoutPlan = JSON.parse(localStorage.getItem("workoutPlan") || "{}");

    if (workoutPlan?.nutritionalInformation) {
      const mealData = workoutPlan.nutritionalInformation;
      setMeals(mealData);

      let totalCalories = 0;
      let totalCarbs = 0;
      let totalFats = 0;
      let totalProteins = 0;

      Object.keys(mealData).forEach((mealType) => {
        mealData[mealType].forEach((meal: Meal) => {
          meal.ingredients.forEach((ingredient) => {
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

      setCalories(Math.round(totalCalories));
      setCarbs(Math.round(totalCarbs));
      setFats(Math.round(totalFats));
      setProteins(Math.round(totalProteins));
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

  const pieData = [
    { name: "Carbs", value: carbs * 4 },
    { name: "Fats", value: fats * 9 },
    { name: "Proteins", value: proteins * 4 },
  ];

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
          position: 'relative'
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
        <Typography variant="body1" align="center" sx={{ color: "white" }}>
          For each meal you get two options to choose from
        </Typography>
      </Box>

      <Grid container justifyContent="center" alignItems="center" spacing={4}>
        <Grid item xs={12} md={4}>
          <Typography variant="h5" align="center" sx={{ fontWeight: 600 }}>
            {calories} Calories
          </Typography>
          <Box display="flex" justifyContent="center" sx={{ mb: 4 }}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={50}
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
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>
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
          padding: 2, // Add padding or other styles as needed
        }}
      >
        <MealCard
          mealType={mealType}
          meals={meals[mealType]}
          onClick={handleOpenDialog}
        />
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
        <DialogTitle sx={{ fontWeight: 700 }}>{dialogContent?.name}</DialogTitle>
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
                    <TableCell align="right">{ingredient.carbohydrates}</TableCell>
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
