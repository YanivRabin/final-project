"use client"; 

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ProfileCard from '../components/ProfileCard';
import SettingsCard from '../components/SettingsCard';

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
  dietaryRestrictions: UserDietaryRestrictions;
}

const theme = createTheme();

const Profile: React.FC = () => {
  const [mainUser, setMainUser] = useState<MainUser | null>(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        setMainUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
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
        <Grid container direction="column" sx={{ overflowX: 'hidden' }}>
          <Grid item xs={12} md={6}>
            <img
              alt="avatar"
              style={{
                width: '100vw',
                objectFit: 'cover',
                objectPosition: '50% 50%',
                position: 'relative',
              }}
              src="https://247fitness.co/public/images/select-gym-bg.jpg"
            />
          </Grid>

          <Grid
            container
            direction={{ xs: 'column', md: 'row' }}
            spacing={3}
            sx={{
              position: 'absolute',
              top: '20vh',
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
              />
            </Grid>
            <Grid item md={9}>
              <SettingsCard
                firstName={mainUser.firstName}
                lastName={mainUser.lastName}
                gender={mainUser.gender}
                phone=""
                email={mainUser.email}
                pass={mainUser.password || ''}
                workoutGoals={mainUser.workoutGoals}
                daysPerWeek={mainUser.daysPerWeek}
                minutesPerWorkout={mainUser.minutesPerWorkout}
                workoutLocation={mainUser.workoutLocation}
                includeWarmup={mainUser.includeWarmup}
                includeStretching={mainUser.includeStreching}
                dietary={mainUser.dietaryRestrictions}
              />
            </Grid>
          </Grid>
        </Grid>
      </CssBaseline>
    </ThemeProvider>
  );
};

export default Profile;
