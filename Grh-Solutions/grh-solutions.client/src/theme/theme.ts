import { createTheme } from "@mui/material/styles";

// 1️⃣ Extender los tipos de Palette y PaletteOptions
declare module "@mui/material/styles" {
  interface PaletteColor {
    hover?: string;
    divider?: string;
  }

  interface SimplePaletteColorOptions {
    hover?: string;
    divider?: string;
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

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#fff", // Azul más vibrante y accesible
      contrastText: "#0f0f0f",
      dark: "#0056b3",
      light: "#66B2FF",
      hover: "#0056b3",
      divider: "rgba(0, 0, 0, 0.1)",
    },
    secondary: {
      main: "rgba(0, 0, 0, 0.25)", // Rojo más llamativo y definido
      contrastText: "#FFFFFF",
      dark: "#CC0000",
      light: "#FF8080",
      hover: "#CC0000",
      divider: "rgba(255, 255, 255, 0.3)",
    },
    background: {
      default: "#FFFFFF", // Fondo principal blanco
      paper: "#FAFAFA", // Ligeramente gris para diferenciar secciones
    },
    text: {
      primary: "#212121", // Negro suave
      secondary: "#5F6368", // Gris oscuro
      dark: "#FFFFFF",
    },
    success: {
      main: "#28A745", // Verde accesible
      contrastText: "#FFFFFF",
      hover: "#1E7E34",
    },
    error: {
      main: "#DC3545", // Rojo definido
      contrastText: "#FFFFFF",
      hover: "#B02A37",
    },
    warning: {
      main: "#FFC107", // Amarillo equilibrado
      contrastText: "#000000",
      hover: "#D39E00",
    },
    info: {
      main: "#17A2B8",
      contrastText: "#FFFFFF",
      hover: "#117A8B",
    },
    divider: "#E0E0E0",
    gray: {
      100: "#F9F9F9",
      200: "#F2F2F2",
      300: "#EAEAEA",
      400: "#DDDDDD",
      500: "#BDBDBD",
      600: "#9E9E9E",
      700: "#757575",
      800: "#616161",
      900: "#424242",
      1000: "#212121",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#0f0f0f", // Oscuro fuerte
      contrastText: "#f1f1f1", // color del contraste, osea el blanco
      dark: "#004C99",
      light: "#3388FF",
      hover: "#282828", // un oscuro que funciona para el hover
      divider: "rgba(255, 255, 255, 0.2)"
    },
    secondary: {
      main: "#212121", // Oscuro mas tenue
      contrastText: "#f1f1f1", // color del contraste , osea el blanco
      dark: "#CC5555",
      light: "#FF8C8C",
      hover: "#CC5555",
      divider: "rgba(255, 255, 255, 0.2)"
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
