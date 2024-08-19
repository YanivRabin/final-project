import React, { useState } from "react";
import {
  Card,
  Grid,
  Typography,
  TextField,
  Button,
  Avatar,
  Badge,
  MenuItem,
  Select,
  SelectChangeEvent,
  Box,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import SmartToyIcon from "@mui/icons-material/SmartToy";

const styles = {
  label: {
    padding: "0.5rem 0",
    color: "#899499",
    textAlign: "left",
  },
  value: {
    padding: "0.5rem 0",
    color: "#899499",
    textAlign: "right",
  },
};

interface ProfileCardProps {
  name: string;
  email: string;
  
  onSave: (updatedGeneral: {
    gender: string;
    age: number;
    height: number;
    weight: number;
  }) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = (props) => {
  const [editMode, setEditMode] = useState(false);

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
          >
            <Avatar
              sx={{ width: 100, height: 100, mb: 1.5 }}
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            />
          </Badge>
          <Typography variant="h6">{props.name}</Typography>
          <Typography color="text.secondary">{props.email}</Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ProfileCard;
