import { createContext, useMemo, useState } from "react";
import { createTheme } from "@mui/material/styles";

export const tokens = {
  light_grey: {
    100: "#f5f5f5",
    200: "#ececec",
    300: "#e2e2e2",
    400: "#d9d9d9",
    500: "#cfcfcf",
    600: "#a6a6a6",
    700: "#7c7c7c",
    800: "#535353",
    900: "#292929",
  },
  black: {
    100: "#d8d8d8",
    200: "#b1b1b1",
    300: "#8b8b8b",
    400: "#646464",
    500: "#3d3d3d",
    600: "#313131",
    700: "#252525",
    800: "#181818",
    900: "#0c0c0c",
  },
  white: {
    100: "#fbfbfb",
    200: "#f8f8f8",
    300: "#f4f4f4",
    400: "#f1f1f1",
    500: "#ededed",
    600: "#bebebe",
    700: "#8e8e8e",
    800: "#5f5f5f",
    900: "#2f2f2f",
  },
};

export const themeSettings = () => {
    const colors = tokens; // Using the predefined light mode tokens
  
    return {
      palette: {
        mode: "light",
        primary: {
          main: colors.white[500],
        },
        secondary: {
          main: colors.black[500],
        },
        neutral: {
          dark: colors.light_grey[700],
          main: colors.light_grey[500],
          light: colors.light_grey[100],
        },
        background: {
          default: colors.light_grey[100],
          paper: colors.white[100],
        },
      },
    };
  };