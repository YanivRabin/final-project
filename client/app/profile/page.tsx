// IMPORTS
"use client"
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
    // DEFAULT VALUES
    title: "title",
    dt1: 32,
    dt2: 40,
    dt3: 50,
    firstName: "Name",
    lastName: "Last Name",
    gender: "female",
    phone: "932-555-4247",
    email: "example@gmail.com",
    pass: "password123"
  };

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
                // height: "35vh",
                objectFit: "cover",
                objectPosition: "50% 50%",
                position: "relative"
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
              px: { xs: 0, md: 7 }
            }}
          >
            {/* PROFILE CARD */}
            <Grid item md={3}>
              <ProfileCard
                name={fullName}
                sub={mainUser.title}
                dt1={mainUser.dt1}
                dt2={mainUser.dt2}
                dt3={mainUser.dt3}
              ></ProfileCard>
            </Grid>

            {/* SETTINGS CARD */}
            <Grid item md={9}>
              <SettingsCard
                expose={(v: string) => setText(v)}
                firstName={mainUser.firstName}
                lastName={mainUser.lastName}
                phone={mainUser.phone}
                email={mainUser.email}
                pass={mainUser.pass}
                gender={mainUser.gender}
              ></SettingsCard>
            </Grid>
          </Grid>
        </Grid>
      </CssBaseline>
    </ThemeProvider>
  );
}
