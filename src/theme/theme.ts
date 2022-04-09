import { createTheme } from "@mui/material/styles";
import { grey, orange } from "@mui/material/colors";
import { ThemeMode } from "../redux/theme/themeSlice";

const lightTheme = createTheme({
  palette: {
    primary: {
      main: orange.A700,
    },
    secondary: {
      main: "#000000",
    },
    background: {
      default: grey[50],
    },
  },
});

const darkTheme = createTheme({
  palette: {
    primary: {
      main: orange.A700,
    },
    secondary: {
      main: "#000000",
    },
    background: {
      default: grey[800],
      paper: grey[900],
    },
    text: {
      primary: grey[50],
    },
  },
});

export const getDesignTokens = (mode: ThemeMode) => {
  return mode === ThemeMode.dark ? darkTheme : lightTheme;
};
