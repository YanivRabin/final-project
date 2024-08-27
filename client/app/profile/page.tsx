"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import {
  Card,
  Grid,
  Typography,
  Avatar,
  Badge,
  CssBaseline,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SettingsCard from "../components/SettingsCard";
import { MainUser } from "../services/interface";

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

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Profile Page</title>
      </Head>
      <CssBaseline />
      <Grid
        container
        direction="column"
        sx={{ overflowX: "hidden", px: { xs: 0, md: 7 } }}
      >
        <Grid item>
          <Card variant="outlined">
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item sx={{ p: "1.5rem 0rem", textAlign: "center" }}>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                >
                  <Avatar
                    sx={{ width: 100, height: 100, mb: 1.5 }}
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  />
                </Badge>
                <Typography variant="h6">{fullName}</Typography>
                <Typography color="text.secondary">{mainUser.email}</Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item sx={{ mt: 3 }}>
          <SettingsCard
            firstName={mainUser.firstName}
            lastName={mainUser.lastName}
            email={mainUser.email}
            gender={mainUser.gender}
            age={mainUser.age}
            height={mainUser.height}
            weight={mainUser.weight}
            workoutGoals={mainUser.workoutGoals}
            daysPerWeek={mainUser.daysPerWeek}
            minutesPerWorkout={mainUser.minutesPerWorkout}
            workoutLocation={mainUser.workoutLocation}
            includeWarmup={mainUser.includeWarmup}
            includeStretching={mainUser.includeStretching}
            dietaryRestrictions={mainUser.dietaryRestrictions}
          />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Profile;
