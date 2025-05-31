import { createTheme } from '@mui/material/styles';
// color library https://mui.com/material-ui/customization/color/?srsltid=AfmBOooqZ813wULE56RblhoaJoTpCyxEpEMxOoA_5KlJAPqhS5d0JAeN
import { orange, pink, grey, deepOrange, blueGrey } from '@mui/material/colors';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    custom: {
    primary: {
      main: deepOrange[600],
    },
    secondary: {
      main: pink[300],
    },
    background: {
      default: grey[900],
      paper: grey[800],
    },
    text: {
      primary: grey[50],
    },
    navbar: {
      desktopBackground: blueGrey['A700'],
      mobileBackground: deepOrange[600],
      desktopTextColor: grey[50],
      mobileTextColor: grey[50],
    },
    navbarDrawer: {
      background: orange[600]
    },
    scrollToTopButton: {  
      background: deepOrange[500],
      backgroundHover: orange[700],
    },
    progressBar: {  
      background: blueGrey['A700'],
      backgroundForeground: deepOrange[700],
    },
    base: {
      white: grey[50],
      black: grey[900],
    }
  }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: grey[800],
          color: grey[50],
        },
      },
    },
  },
});