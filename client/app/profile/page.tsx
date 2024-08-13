"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ProfileCard from "../components/ProfileCard";
import SettingsCard from "../components/SettingsCard";
import { MainUser } from "../services/interface"; // Correct import

const theme = createTheme();

const Profile: React.FC = () => {
  const [mainUser, setMainUser] = useState<MainUser | null>(null);

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

  const handleProfileSave = (updatedGeneral: {
    gender: string;
    age: number;
    height: number;
    weight: number;
  }) => {
    setMainUser((prevUser: MainUser | null) => {
      if (prevUser) {
        return {
          ...prevUser,
          ...updatedGeneral,
        };
      }
      return prevUser;
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Profile Page</title>
      </Head>
      <CssBaseline />
      <Grid container direction="column" sx={{ overflowX: "hidden" }}>
        <Grid
          container
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          sx={{
            position: "absolute",
            top: "20vh",
            px: { xs: 0, md: 7 },
          }}
        >
          <Grid item md={3}>
            <ProfileCard
              name={fullName}
              sub="User Profile"
              general={{
                gender: mainUser.gender,
                age: mainUser.age,
                height: mainUser.height,
                weight: mainUser.weight,
              }}
              onSave={handleProfileSave}
            />
          </Grid>
          <Grid item md={9}>
            <SettingsCard
              firstName={mainUser.firstName}
              lastName={mainUser.lastName}
              gender={mainUser.gender}
              phone=""
              email={mainUser.email}
              pass={mainUser.password || ""}
              workoutGoals={mainUser.workoutGoals}
              daysPerWeek={mainUser.daysPerWeek}
              minutesPerWorkout={mainUser.minutesPerWorkout}
              workoutLocation={mainUser.workoutLocation}
              includeWarmup={mainUser.includeWarmup}
              includeStretching={mainUser.includeStretching}
              dietary={mainUser.dietaryRestrictions}
            />
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Profile;
