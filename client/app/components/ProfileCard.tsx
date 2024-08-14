import React, { useState } from 'react';
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
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import SmartToyIcon from '@mui/icons-material/SmartToy';

const styles = {
  label: {
    padding: '0.5rem 0',
    color: '#899499',
    textAlign: 'left',
  },
  value: {
    padding: '0.5rem 0',
    color: '#899499',
    textAlign: 'right',
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
  onSave: (updatedGeneral: { gender: string; age: number; height: number; weight: number }) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = (props) => {
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

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setGeneral({
      ...general,
      [name]: value,
    });
  };

  const handleSaveClick = () => {
    setEditMode(false);
    props.onSave(general);
  };

  return (
    <Card variant="outlined">
      <Grid container direction="column" justifyContent="center" alignItems="center">
        <Grid item sx={{ p: '1.5rem 0rem', textAlign: 'center' }}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            // badgeContent={
            //   <PhotoCameraIcon
            //     sx={{
            //       border: '5px solid white',
            //       backgroundColor: '#ff558f',
            //       borderRadius: '50%',
            //       padding: '.2rem',
            //       width: 35,
            //       height: 35,
            //     }}
            //   />
            // }
          >
            <Avatar
              sx={{ width: 100, height: 100, mb: 1.5 }}
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              />
 
          </Badge>
          <Typography variant="h6">{props.name}</Typography>
          <Typography color="text.secondary">{props.sub}</Typography>
        </Grid>

        <Grid container spacing={2} sx={{ width: '100%', padding: '0 1rem' }}>
          <Grid item xs={6}>
            <Typography sx={styles.label}>Gender</Typography>
          </Grid>
          <Grid item xs={6}>
            {editMode ? (
              <Select
                name="gender"
                value={general.gender}
                onChange={handleSelectChange}
                size="small"
                variant="outlined"
                fullWidth
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            ) : (
              <Typography sx={styles.value}>{general.gender}</Typography>
            )}
          </Grid>

          <Grid item xs={6}>
            <Typography sx={styles.label}>Age</Typography>
          </Grid>
          <Grid item xs={6}>
            {editMode ? (
              <TextField
                name="age"
                value={general.age}
                onChange={handleChange}
                size="small"
                variant="outlined"
                type="number"
                inputProps={{ min: 0 }}
                fullWidth
              />
            ) : (
              <Typography sx={styles.value}>{general.age}</Typography>
            )}
          </Grid>

          <Grid item xs={6}>
            <Typography sx={styles.label}>Height</Typography>
          </Grid>
          <Grid item xs={6}>
            {editMode ? (
              <TextField
                name="height"
                value={general.height}
                onChange={handleChange}
                size="small"
                variant="outlined"
                type="number"
                inputProps={{ min: 0 }}
                fullWidth
              />
            ) : (
              <Typography sx={styles.value}>{general.height}</Typography>
            )}
          </Grid>

          <Grid item xs={6}>
            <Typography sx={styles.label}>Weight</Typography>
          </Grid>
          <Grid item xs={6}>
            {editMode ? (
              <TextField
                name="weight"
                value={general.weight}
                onChange={handleChange}
                size="small"
                variant="outlined"
                type="number"
                inputProps={{ min: 0 }}
                fullWidth
              />
            ) : (
              <Typography sx={styles.value}>{general.weight}</Typography>
            )}
          </Grid>
        </Grid>

        <Box sx={{ width: '100%', p: '1rem', textAlign: 'center' }}>
          <Button
            variant="contained"
            color="secondary"
            sx={{ width: '50%', p: 1 }}
            onClick={editMode ? handleSaveClick : handleEditClick}
          >
            {editMode ? 'Save' : 'Edit'}
          </Button>
        </Box>
      </Grid>
    </Card>
  );
};

export default ProfileCard;
