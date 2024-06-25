"use client";

import { Box, Button, CssBaseline, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import Image from "next/image";
import "../styles/main.css"; // Import your CSS file
import { Copyright } from "@mui/icons-material";

export default function Main() {
  return (
    <Box display="flex" flexDirection="column">
      <CssBaseline />
      {/* video */}
      <Grid className="video-container" paddingBottom={"20px"}>
        {/* <video src={require("../public/homeBg.mp4")} autoPlay muted loop /> */}
        <div className="overlay-text">
          <h1>
            Welcome to the world
            <br />
            of AI fitness
          </h1>
        </div>
      </Grid>
      {/* text 1 */}
      <Grid
        container
        className="margin"
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <Typography className="title">
            The new way for
            <br />
            workout & nutrition
          </Typography>
        </Grid>
        <Grid item>
          <Typography className="content">
            Set out on a personalized fitness journey
            <br />
            with artificial intelligence that will build
            <br />
            workout plan and menu just for you.
          </Typography>
        </Grid>
      </Grid>
      {/* text 2 */}
      <Grid
        container
        className="margin"
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <Image
            className="image"
            src={require("./images/main/workout.png")}
            alt="workout"
            style={{ marginRight: "20px" }}
          />
        </Grid>
        <Grid item>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <Typography className="title">
                No matter who
                <br />
                No matter what
                <br />
                No matter where
              </Typography>
            </Grid>
            <Grid item>
              <Typography className="content">
                Whether you want to gain muscles,
                <br className="br" />
                lose fat or even just to stay in shape.
                <br />
                <br />
                With a few simple steps we build a workou
                <br />
                that suites for you, all you need to do is enter
                <br />
                your personal info and workout goals.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* text 3 */}
      <Grid
        container
        className="margin"
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <Typography className="title">
                Menu that is
                <br />
                specific for you
              </Typography>
            </Grid>
            <Grid item>
              <Typography className="content">
                You have allergies?
                <br />
                You are vegetarian or vegan?
                <br />
                You have personal preferences to avoid certain food?
                <br />
                <br />
                No problems, we take care of you and build
                <br />
                you a personal menu that will suit you.
                <br />
                <br />
                The menu is made up of all the nutrients you need
                <br />
                and broken down into calories, protein, fat and more.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Image
            className="image"
            src={require("./images/main/food.png")}
            alt="workout"
            style={{ marginLeft: "20px" }}
          />
        </Grid>
      </Grid>
      {/* button */}
      <Grid
        container
        className="margin"
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Button className="button margin">Start now</Button>
      </Grid>
      {/* footer */}
      <div className="footer" >
        <hr className="horizontal-line" />
        <p className="MuiTypography-root MuiTypography-body2 MuiTypography-alignCenter css-1jm6nq8">
          Copyright ©{" "}
          <a className="MuiTypography-root MuiTypography-inherit MuiLink-root MuiLink-underlineAlways css-1i1yl23">
            FITNESS
          </a>{" "}
          2024.
        </p>
      </div>
    </Box>
  );
}
