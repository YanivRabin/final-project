"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ProfileCard from "../components/ProfileCard";
import SettingsCard, { SettingsCardProps } from "../components/SettingsCard";
import { MainUser } from "../services/interface";
import { useUpdateWorkoutPlanMutation } from '../services/feedApi';

const theme = createTheme();

const Profile: React.FC = () => {
  const [mainUser, setMainUser] = useState<MainUser | null>(null);
  const [updateWorkoutPlan, { isLoading, isError, isSuccess }] = useUpdateWorkoutPlanMutation();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const parsedUser: MainUser = JSON.parse(user);
        setMainUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
      }
    }
  }, []);

  if (!mainUser) return <div>Loading...</div>;

  const fullName = `${mainUser.firstName} ${mainUser.lastName}`;

  const handleProfileSave = async (updatedUser: Partial<SettingsCardProps>) => {
    setMainUser((prevUser: MainUser | null) => {
      if (prevUser) {
        const newUser = {
          ...prevUser,
          ...updatedUser, // Apply the partial update
        };
        // Save the updated user in local storage
        localStorage.setItem('user', JSON.stringify(newUser));
        return newUser;
      }
      return prevUser;
    });

    // Call the updateWorkoutPlan mutation to save the updated workout plan
    try {
      await updateWorkoutPlan({
        email: mainUser?.email,
        PartialWorkoutPlan: {
          ...updatedUser, // Pass the partial update
        },
      }).unwrap();

      // Optionally, update the UI to reflect success
    } catch (error) {
      console.error("Failed to update workout plan:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Profile Page</title>
      </Head>
      <CssBaseline />
      <Grid container direction="column" sx={{ overflowX: "hidden", px: { xs: 0, md: 7 } }}>
        <Grid item>
          <ProfileCard
            name={fullName}
            email={mainUser.email}
            onSave={handleProfileSave}
          />
        </Grid>
        <Grid item sx={{ mt: 3 }}>
          <SettingsCard
            age={mainUser.age}
            height={mainUser.height}
            weight={mainUser.weight}
            workoutGoals={mainUser.workoutGoals}
            daysPerWeek={mainUser.daysPerWeek}
            minutesPerWorkout={mainUser.minutesPerWorkout}
            workoutLocation={mainUser.workoutLocation}
            includeWarmup={mainUser.includeWarmup}
            includeStretching={mainUser.includeStretching}
            dietary={mainUser.dietaryRestrictions}
            onSave={handleProfileSave} 
          />
        </Grid>
        {/* Show a loading state if the mutation is in progress */}
        {isLoading && <div>Updating workout plan...</div>}
        {/* Show an error message if the mutation fails */}
        {isError && <div>Failed to update workout plan. Please try again.</div>}
        {/* Show a success message if the mutation is successful */}
        {isSuccess && <div>Workout plan updated successfully!</div>}
      </Grid>
    </ThemeProvider>
  );
};

export default Profile;
