"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ProfileCard from "../components/ProfileCard";
import SettingsCard from "../components/SettingsCard";

// Type Definitions
interface UserDietaryRestrictions {
  vegan: boolean;
  vegetarian: boolean;
  pescatarian: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  nutFree: boolean;
  soyFree: boolean;
  eggFree: boolean;
  shellfishFree: boolean;
  lactoseFree: boolean;
  kosher: boolean;
  halal: boolean;
  other: string;
}

interface MainUser {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  gender: string;
  age: number;
  height: number;
  weight: number;
  workoutGoals: string;
  daysPerWeek: number;
  minutesPerWorkout: number;
  workoutLocation: string;
  includeWarmup: boolean;
  includeStreching: boolean;
  dairyRestrictions: UserDietaryRestrictions;
}

// STYLE & THEME
const theme = createTheme();

export default function Profile() {
  const [mainUser, setMainUser] = useState<MainUser | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        console.log('Parsed user:', parsedUser); // Debugging statement
        setMainUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
      }
    }
  }, []);

  if (!mainUser) return <div>Loading...</div>;

  const fullName = `${mainUser.firstName} ${mainUser.lastName}`;

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Profile Page</title>
      </Head>
      <CssBaseline>
        {/* BACKGROUND */}
        <Grid container direction="column" sx={{ overflowX: "hidden" }}>
          <Grid item xs={12} md={6}>
            <img
              alt="avatar"
              style={{
                width: "100vw",
                objectFit: "cover",
                objectPosition: "50% 50%",
                position: "relative",
              }}
              src="https://247fitness.co/public/images/select-gym-bg.jpg"
            />
          </Grid>

          {/* COMPONENTS */}
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
            {/* PROFILE CARD */}
            <Grid item md={3}>
              <ProfileCard
                name={fullName}
                sub="User Profile"
                general={{
                  gender: mainUser.gender,
                  age: mainUser.age,
                  height: mainUser.height,
                  weight: mainUser.weight
                }}
              />
            </Grid>

            {/* SETTINGS CARD */}
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
                includeStretching={mainUser.includeStreching}
                dietary={mainUser.dairyRestrictions}
              />
            </Grid>
          </Grid>
        </Grid>
      </CssBaseline>
    </ThemeProvider>
  );
}
