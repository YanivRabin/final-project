import React from "react";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import "../../styles/CustomTextField.css";

interface CustomTextFieldProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  autoComplete?: string;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  label,
  value,
  onChange,
  type = "text",
  autoComplete = "off",
}) => {
  return (
    <div className="textFieldContainer">
      <TextField
        margin="normal"
        fullWidth
        label={label}
        value={value}
        onChange={onChange}
        type={type}
        autoComplete={autoComplete}
        className="customTextField"
      />
      {/* {isError && (
        <Alert severity="error" sx={{ mt: 2 }} className="errorAlert">
          {errorText}
        </Alert>
      )}
      {isLoading && (
        <CircularProgress size={24} className="loadingIndicator" />
      )} */}
    </div>
  );
};

export default CustomTextField;
