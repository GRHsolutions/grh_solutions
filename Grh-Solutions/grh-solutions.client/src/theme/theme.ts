import { createTheme } from "@mui/material/styles";

// 1️⃣ Extender los tipos de Palette y PaletteOptions
declare module "@mui/material/styles" {
  interface Palette {
    gray: {
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
  }

  interface PaletteOptions {
    gray?: {
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
  }
}

// 2️⃣ Definir los temas con la nueva propiedad gray
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#007BFF",
    },
    secondary: {
      main: "#6EC6FF",
    },
    background: {
      default: "#F8F9FA",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#343A40",
      secondary: "#6C757D",
    },
    success: {
      main: "#28A745",
    },
    warning: {
      main: "#FD7E14",
    },
    gray: {
      100: "#F8F9FA",
      200: "#E9ECEF",
      300: "#DEE2E6",
      400: "#CED4DA",
      500: "#ADB5BD",
      600: "#6C757D",
      700: "#495057",
      800: "#343A40",
      900: "#212529",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90CAF9",
    },
    secondary: {
      main: "#F48FB1",
    },
    background: {
      default: "#121212",
      paper: "#1E1E1E",
    },
    text: {
      primary: "#E0E0E0",
      secondary: "#B0B0B0",
    },
    success: {
      main: "#66BB6A",
    },
    warning: {
      main: "#FFB74D",
    },
    gray: {
      100: "#E0E0E0",
      200: "#B0B0B0",
      300: "#909090",
      400: "#707070",
      500: "#505050",
      600: "#404040",
      700: "#303030",
      800: "#202020",
      900: "#101010",
    },
  },
});

export { lightTheme, darkTheme };
