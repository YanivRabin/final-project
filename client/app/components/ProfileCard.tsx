import React, { useState } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Grid, TextField, Button, Avatar, Badge } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

// STYLES
const styles = {
  details: {
    padding: "1rem",
    borderTop: "1px solid #e1e1e1",
  },
  value: {
    padding: "1rem 2rem",
    borderTop: "1px solid #e1e1e1",
    color: "#899499",
  },
};

interface ProfileCardProps {
  name: string;
  sub: string;
  general: {
    gender: string;
    age: number;
    height: number;
    weight: number;
  };
}

export default function ProfileCard(props: ProfileCardProps) {
  const [editMode, setEditMode] = useState(false);
  const [general, setGeneral] = useState(props.general);

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setGeneral({
      ...general,
      [name]: value,
    });
  };

  const handleSaveClick = () => {
    setEditMode(false);
    // Save the updated data
    console.log("Saved data:", general);
  };

  return (
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
            badgeContent={
              <PhotoCameraIcon
                sx={{
                  border: "5px solid white",
                  backgroundColor: "#ff558f",
                  borderRadius: "50%",
                  padding: ".2rem",
                  width: 35,
                  height: 35,
                }}
              />
            }
          >
            <Avatar
              sx={{ width: 100, height: 100, mb: 1.5 }}
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            />
          </Badge>
          <Typography variant="h6">{props.name}</Typography>
          <Typography color="text.secondary">{props.sub}</Typography>
        </Grid>

        <Grid container>
          <Grid item xs={6}>
            <Typography style={styles.details}>Gender</Typography>
            <Typography style={styles.details}>Age</Typography>
            <Typography style={styles.details}>Height</Typography>
            <Typography style={styles.details}>Weight</Typography>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: "end" }}>
            {editMode ? (
              <>
                <TextField
                  name="gender"
                  value={general.gender}
                  onChange={handleChange}
                  size="small"
                  variant="outlined"
                  style={styles.value}
                />
                <TextField
                  name="age"
                  value={general.age}
                  onChange={handleChange}
                  size="small"
                  variant="outlined"
                  style={styles.value}
                />
                <TextField
                  name="height"
                  value={general.height}
                  onChange={handleChange}
                  size="small"
                  variant="outlined"
                  style={styles.value}
                />
                <TextField
                  name="weight"
                  value={general.weight}
                  onChange={handleChange}
                  size="small"
                  variant="outlined"
                  style={styles.value}
                />
              </>
            ) : (
              <>
                <Typography style={styles.value}>{general.gender}</Typography>
                <Typography style={styles.value}>{general.age}</Typography>
                <Typography style={styles.value}>{general.height}</Typography>
                <Typography style={styles.value}>{general.weight}</Typography>
              </>
            )}
          </Grid>
        </Grid>

        <Grid item style={styles.details} sx={{ width: "100%" }}>
          <Button
            variant="contained"
            color="secondary"
            sx={{ width: "99%", p: 1, my: 2 }}
            onClick={editMode ? handleSaveClick : handleEditClick}
          >
            {editMode ? "Save" : "Edit"}
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}
