import { styled } from '@mui/material/styles';
import StepLabel from '@mui/material/StepLabel';
import StepIcon from '@mui/material/StepIcon';

export const CustomStepIcon = styled(StepIcon)(({ theme }) => ({
  color: "#4E2A84",
  "& .MuiStepIcon-text": {
    fill: "white", // Change the number inside the circle to white
    fontSize: "0.75rem",
  },
  "&.Mui-completed": {
    color: "#4E2A84",
  },
  "&.Mui-active": {
    color: "#645394",
  },
}));

export const CustomStepLabel = styled(StepLabel)(({ theme }) => ({
  "& .MuiStepLabel-label": {
    color: "white", // Change the label text color to white
    "&.Mui-active": {
      color: "white",
    },
    "&.Mui-completed": {
      color: "white",
    },
  },
}));
