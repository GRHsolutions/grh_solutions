import { createTheme } from "@mui/material/styles";

// 1️⃣ Extender los tipos de Palette y PaletteOptions
declare module "@mui/material/styles" {
  interface PaletteColor {
    hover?: string;
  }

  interface SimplePaletteColorOptions {
    hover?: string;
  }

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
      1000: string;
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
      1000: string;
    };
  }

  interface TypeText {
    dark: string
  }
}

// 🎨 Definir temas mejorados con colores más accesibles y contrastados
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0066CC", // Azul más vibrante
      contrastText: "#FFFFFF",
      dark: "#004C99",
      light: "#3388FF",
      hover: "#004C99",
    },
    secondary: {
      main: "#FF6B6B", // Rojo coral más distintivo
      contrastText: "#FFFFFF",
      dark: "#CC5555",
      light: "#FF8C8C",
      hover: "#CC5555",
    },
    background: {
      default: "#F4F5F7", // Suave para mejor lectura
      paper: "#FFFFFF",
    },
    text: {
      primary: "#202124", // Negro suave
      secondary: "#5F6368", // Gris mejor contrastado
      dark: "#FFFFFF"
    },
    success: {
      main: "#2DCE89", // Verde más limpio
      contrastText: "#FFFFFF",
      hover: "#249C6B",
    },
    error: {
      main: "#F56565", // Rojo más llamativo
      contrastText: "#FFFFFF",
      hover: "#C53030",
    },
    warning: {
      main: "#FF9F43", // Naranja más equilibrado
      contrastText: "#FFFFFF",
      hover: "#D67C2C",
    },
    info: {
      main: "#17A2B8",
      contrastText: "#FFFFFF",
      hover: "#117A8B",
    },
    divider: "#DADCE0",
    gray: {
      100: "#F8F9FA",
      200: "#EDEDED",
      300: "#DDDDDD",
      400: "#CCCCCC",
      500: "#999999",
      600: "#777777",
      700: "#555555",
      800: "#333333",
      900: "#1A1A1A",
      1000: '#000000'
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#64A8E3", // Azul más moderno y vibrante
      contrastText: "#FFFFFF",
      dark: "#3F7BB5",
      light: "#8FC5F7",
      hover: "#3F7BB5",
    },
    secondary: {
      main: "#FF7E67", // Coral más armonioso
      contrastText: "#FFFFFF",
      dark: "#D65D4F",
      light: "#FFA490",
      hover: "#D65D4F",
    },
    background: {
      default: "#121212",
      paper: "#1E1E1E",
    },
    text: {
      primary: "#E3E3E3", // Blanco más suave para no ser tan brillante
      secondary: "#B8B8B8",
      dark: '#000000'
    },
    success: {
      main: "#22C55E", // Verde más vibrante
      contrastText: "#000000",
      hover: "#179A46",
    },
    error: {
      main: "#EF4444", // Rojo más definido
      contrastText: "#FFFFFF",
      hover: "#B91C1C",
    },
    warning: {
      main: "#FACC15", // Amarillo mejor adaptado
      contrastText: "#000000",
      hover: "#EAB308",
    },
    info: {
      main: "#38BDF8",
      contrastText: "#000000",
      hover: "#0284C7",
    },
    divider: "#303030",
    gray: {
      100: "#D4D4D4",
      200: "#A3A3A3",
      300: "#8B8B8B",
      400: "#6E6E6E",
      500: "#525252",
      600: "#404040",
      700: "#303030",
      800: "#202020",
      900: "#101010",
      1000: '#000000'
    },
  },
});

export { lightTheme, darkTheme };
