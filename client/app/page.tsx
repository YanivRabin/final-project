"use client";

import { Box, Button, CssBaseline, Grid, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CSSProperties } from "react";

// Define styles with proper TypeScript types
const styles: { [key: string]: CSSProperties } = {
  videoContainer: {
    position: "relative" as "relative",
    width: "100%",
    height: "100vh",
    overflow: "hidden",
  },
  videoWrapper: {
    position: "absolute" as "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  video: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as "cover",
  },
  overlayText: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "white",
    textAlign: "center",
    fontSize: "2vw",
    fontFamily: "'Inria Sans', sans-serif",
  },
  title: {
    color: "#3d2d69",
    textAlign: "center",
    fontSize: "3vw",
    fontWeight: "bold",
  },
  text: {
    padding: "20px",
    textAlign: "center",
    fontSize: "1.2vw",
  },
  image: {
    width: "30vw",
    height: "auto",
    maxWidth: "600px",
    maxHeight: "600px",
  },
  button: {
    backgroundColor: "#3d2d69",
    color: "white",
    padding: "10px 20px",
    borderRadius: "30px",
    width: "fit-content",
    fontSize: "1.5vw",
    fontWeight: "bold",
  },
  horizontalLine: {
    border: "none",
    height: "1px",
    backgroundColor: "#ccc",
    margin: "1px 0",
  },
  footer: {
    margin: "30px",
  },
};

export default function Main() {
  return (
    <Box display="flex" flexDirection="column">
      <CssBaseline />
      {/* video */}
      <Grid sx={styles.videoContainer}>
        <div style={styles.videoWrapper}>
          <iframe
            src="https://player.vimeo.com/video/991923914?autoplay=1&muted=1&loop=1&controls=0&title=0&byline=0"
            width="2072"
            height="1108"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
            title="man_traning"
            style={styles.video}
          />
          <div style={styles.overlayText}>
            <h1>
              Welcome to the world
              <br />
              of AI fitness
            </h1>
          </div>
        </div>
      </Grid>
      {/* text 1 */}
      <Grid
        container
        sx={styles.margin}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <Typography sx={styles.title}>
            The new way for
            <br />
            workout & nutrition
          </Typography>
        </Grid>
        <Grid item>
          <Typography sx={styles.text}>
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
        sx={styles.margin}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <Image
            style={styles.image}
            src={require("./images/main/workout.png")}
            alt="workout"
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
              <Typography sx={styles.title}>
                No matter who
                <br />
                No matter what
                <br />
                No matter where
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={styles.text}>
                Whether you want to gain muscles,
                <br />
                lose fat or even just to stay in shape.
                <br />
                <br />
                With a few simple steps we build a workout
                <br />
                that suits you, all you need to do is enter
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
        sx={styles.margin}
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
              <Typography sx={styles.title}>
                Menu that is
                <br />
                specific for you
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={styles.text}>
                You have allergies?
                <br />
                You are vegetarian or vegan?
                <br />
                You have personal preferences to avoid certain food?
                <br />
                <br />
                No problems, we take care of you and build
                <br />
                a personal menu that will suit you.
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
            style={styles.image}
            src={require("./images/main/food.png")}
            alt="food"
          />
        </Grid>
      </Grid>
      {/* button */}
      <Grid
        container
        sx={styles.margin}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Link href="/signUp">
          <Button sx={styles.button}>Start now</Button>
        </Link>
      </Grid>
      {/* footer */}
      <div style={styles.footer}>
        <hr style={styles.horizontalLine} />
        <p>
          Copyright ©{" "}
          <a href="#">TRAINER</a> 2024.
        </p>
      </div>
    </Box>
  );
}
