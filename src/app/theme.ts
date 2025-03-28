"use client";

import { createTheme } from "@mui/material/styles";

const materialTheme = createTheme({
  palette: {
    primary: {
      main: "#ff9800",
    },
    secondary: {
      main: "#4caf50",
    },
    background: {
      default: "#ffffff",
    },
    text: {
      primary: "#171717",
    },
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
    h1: {
      fontSize: "2rem",
      fontWeight: 700,
    },
    body1: {
      fontSize: "1rem",
    },
  },
});

export default materialTheme;
