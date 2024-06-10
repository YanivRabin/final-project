import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

interface CustomInputProps {
  id: string;
  name: string;
  value: string | number | boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
  dis?: boolean;
  req?: boolean;
  type?: string;
  InputProps?: any;
  select?: boolean;
  content?: React.ReactNode;
}

const CustomInput: React.FC<CustomInputProps> = (props) => {
  return (
    <Box>
      <label style={{ fontWeight: 'bold' }} htmlFor={props.id}>
        {props.title}
      </label>
      <TextField
        fullWidth
        margin="dense"
        size="small"
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        disabled={props.dis}
        required={props.req}
        type={props.type}
        InputProps={props.InputProps}
        select={props.select}
      >
        {props.content}
      </TextField>
    </Box>
  );
};

export default CustomInput;
