import { createTheme } from "@mui/material/styles";
// color library https://mui.com/material-ui/customization/color/?srsltid=AfmBOooqZ813wULE56RblhoaJoTpCyxEpEMxOoA_5KlJAPqhS5d0JAeN
import { orange, pink, grey, deepOrange, indigo, purple } from "@mui/material/colors";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    custom: {
      primary: {
        main: deepOrange[600],
        dark: orange[700],
        light: orange[300],
        contrastText: grey[50],
      },
      secondary: {
        main: pink[300],
      },
      background: {
        default: grey[50],
        paper: grey[900],
      },
      text: {
        primary: grey[900],
        secondary: grey[700],
      },
      navbar: {
        desktopBackground: grey[200],
        mobileBackground: deepOrange[400],
        desktopTextColor: grey[50],
        mobileTextColor: grey[50],
      },
      navbarDrawer: {
        background: orange[600]
      },
      orangePalette: {
        background: deepOrange[500],
        backgroundHover: orange[700],
      },
      progressBar: {
        background: grey[50],
        backgroundForeground: deepOrange[700],
      },
      base: {
        white: grey[50],
        black: grey[900],
      },
      splash: {
        background: '#1a1a2e',
        orb1: deepOrange[400],
        orb2: indigo[700],
        orb3: purple[700],
        binaryColor: deepOrange[300],
      },
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: grey[200],
          color: grey[900],
        },
      },
    },
  },
});
