import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

const theme = createTheme();

const MyButton = () => {
  return (
    <ThemeProvider theme={theme}>
      <Button variant="contained" color="primary">
        My Button
      </Button>
    </ThemeProvider>
  );
};

export default MyButton;
