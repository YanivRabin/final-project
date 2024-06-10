"use client";
import React, { useState } from "react";
import Head from "next/head";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ProfileCard from "../components/ProfileCard";
import SettingsCard from "../components/SettingsCard";

// STYLE & THEME
const theme = createTheme();

// APP
export default function Profile() {
  const [text, setText] = useState("");

  const mainUser = {
    title: "User Profile",
    general: {
      gender: "female",
      age: 25,
      height: 175,
      weight: 70,
    },
    info: {
      firstName: "Name",
      lastName: "Last Name",
      email: "example@gmail.com",
      password: "password123",
    },
    workout: {
      workoutGoals: "Stay in Shape",
      daysPerWeek: 3,
      minutesPerWorkout: 60,
      workoutLocation: "gym",
      includeWarmup: true,
      includeStretching: true,
    },
    dietary: {
      vegan: false,
      vegetarian: false,
      pescatarian: false,
      glutenFree: false,
      dairyFree: false,
      nutFree: false,
      soyFree: false,
      eggFree: false,
      shellfishFree: false,
      lactoseFree: false,
      kosher: false,
      halal: false,
      other: "",
    },
  };

  const fullName = `${mainUser.info.firstName} ${mainUser.info.lastName}`;

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
                sub={mainUser.title}
                general={mainUser.general}
              />
            </Grid>

            {/* SETTINGS CARD */}
            <Grid item md={9}>
              <SettingsCard
                firstName={mainUser.info.firstName}
                lastName={mainUser.info.lastName}
                gender={mainUser.general.gender}
                phone=""
                email={mainUser.info.email}
                pass={mainUser.info.password}
                workoutGoals={mainUser.workout.workoutGoals}
                daysPerWeek={mainUser.workout.daysPerWeek}
                minutesPerWorkout={mainUser.workout.minutesPerWorkout}
                workoutLocation={mainUser.workout.workoutLocation}
                includeWarmup={mainUser.workout.includeWarmup}
                includeStretching={mainUser.workout.includeStretching}
                dietary={mainUser.dietary}
              />
            </Grid>
          </Grid>
        </Grid>
      </CssBaseline>
    </ThemeProvider>
  );
}
