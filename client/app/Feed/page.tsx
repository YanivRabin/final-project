"use client";

import React from 'react';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FeedItem from '../components/FeedItem';
import { useGetFeedQuery } from '../services/feedApi';

const theme = createTheme();

const Feed: React.FC = () => {
  const { data: feedItems, error, isLoading } = useGetFeedQuery({});

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading feed items</div>;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container spacing={3} sx={{ padding: 3 }}>
        {feedItems && feedItems.map((item: any) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <FeedItem title={item.title} description={item.description} date={item.date} />
          </Grid>
        ))}
      </Grid>
    </ThemeProvider>
  );
};

export default Feed;
