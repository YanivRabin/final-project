"use client";

import { Box, Button, CssBaseline, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CSSProperties } from "react";

// Define styles with proper TypeScript types
const styles: { [key: string]: CSSProperties } = {
  videoContainer: {
    position: "relative" as "relative",
    width: "100%",
    height: "30vh",
    overflow: "hidden",
  },
  videoWrapper: {
    position: "absolute" as "absolute",
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
    fontSize: "2.3vw",
    fontFamily: "'Inria Sans', sans-serif",
  },
  title: {
    color: "#3d2d69",
    textAlign: "center",
    fontSize: "5vw",
    fontWeight: "bold",
  },
  text: {
    textAlign: "center",
    fontSize: "3.5vw",
  },
  imageContainer: {
    position: "relative" as "relative",
    width: "80%",
    height: "auto",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "auto",
    display: "block",
    border: "none",
  },
  textOverlay: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "white",
    textAlign: "center",
    padding: "20px",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  button: {
    backgroundColor: "#3d2d69",
    color: "white",
    padding: "10px 20px",
    borderRadius: "30px",
    width: "fit-content",
    fontSize: "5vw",
    fontWeight: "bold",
    margin: "40px 0",
  },
  horizontalLine: {
    border: "none",
    height: "1px",
    backgroundColor: "#ccc",
  },
  footer: {
    margin: "0 10px",
  },
};

export default function Main() {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    // Check if running in the browser
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser);
    }
  }, []);

  return (
    <Box display="flex" flexDirection="column">
      <CssBaseline />
      {/* Video */}
      <Grid sx={styles.videoContainer}>
        <div style={styles.videoWrapper}>
          <iframe
            src="https://player.vimeo.com/video/991923914?autoplay=1&muted=1&loop=1&controls=0&title=0&byline=0"
            width="2072"
            height="1108"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
            title="man_training"
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
      {/* Text 1 */}
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ marginTop: 40 }}
      >
        <Grid item>
          <Typography sx={styles.title}>
            The new way for workout & nutrition
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
      {/* Text 2 on Blurred Image */}
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ marginTop: 40 }}
      >
        <Typography sx={styles.title}>No matter who, what or where</Typography>
        <Grid item sx={styles.imageContainer}>
          <Image
            style={styles.image}
            src={require("./images/main/workout.png")}
            alt="workout"
          />
          <div style={styles.textOverlay}>
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
          </div>
        </Grid>
      </Grid>
      {/* Text 3 on Blurred Image */}
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ marginTop: 40 }}
      >
        <Typography sx={styles.title}>Menu that is specific for you</Typography>
        <Grid item sx={styles.imageContainer}>
          <Image
            style={styles.image}
            src={require("./images/main/food.png")}
            alt="food"
          />
          <div style={styles.textOverlay}>
            <Typography sx={styles.text}>
              You have allergies?
              <br />
              You are vegetarian or vegan?
              <br />
              You have personal food preferences?
              <br />
              <br />
              No problems, we take care of you and build
              <br />
              a personal menu that will suit you.
              <br />
              <br />
              The menu is made up of all the nutrients you need and broken down
              into calories, protein, fat and more.
            </Typography>
          </div>
        </Grid>
      </Grid>
      {/* Button */}
      {/* If user is logged in, dont show button */}
      {!user && (
        <Grid container justifyContent="center" alignItems="center">
          <Link href="/signUp">
            <Button sx={styles.button}>Start now</Button>
          </Link>
        </Grid>
      )}
      {/* Footer */}
      <div style={styles.footer}>
        <hr style={styles.horizontalLine} />
        <p>
          Copyright © <a href="#">TRAINER</a> 2024.
        </p>
      </div>
    </Box>
  );
}
