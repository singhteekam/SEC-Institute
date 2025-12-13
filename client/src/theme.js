// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#595e60', // gunmetal gray
    },
    secondary: {
      main: '#b0b7c0', // misty blue
    },
    text: {
      primary: '#171710', // black
      secondary: '#707370', // gray
    },
    background: {
      default: '#ffffff',
      // paper: '#b0b7c0', // optional use
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#595e60', // gunmetal gray
          color: '#ffffff',
        },
      },
    },
  },
});

export default theme;
