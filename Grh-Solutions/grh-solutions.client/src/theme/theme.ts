import { createTheme } from "@mui/material/styles";
import { deepmerge } from "@mui/utils";

// 1️⃣ Extender tipos de la paleta
declare module "@mui/material/styles" {
  interface PaletteColor {
    hover?: string;
    divider?: string;
    father?: string;
    link?: string;
    boxShadow?: string;
  }

  interface SimplePaletteColorOptions {
    hover?: string;
    divider?: string;
    father?: string;
    link?: string;
    boxShadow?: string;
  }

  interface Palette {
    gray: Record<
      100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 1000,
      string
    >;
  }

  interface PaletteOptions {
    gray?: Record<
      100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 1000,
      string
    >;
  }

  interface TypeText {
    dark: string;
  }
}

// 2️⃣ Definición de escala de grises
const grayScale = {
  light: {
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
  dark: {
    100: "#D4D4D4",
    200: "#A3A3A3",
    300: "#8B8B8B",
    400: "#6E6E6E",
    500: "#525252",
    600: "#404040",
    700: "#303030",
    800: "#202020",
    900: "#101010",
    1000: "#000000",
  },
};

// 3️⃣ Tema base (colores comunes)
const baseTheme = {
  palette: {
    success: {
      main: "#28A745",
      hover: "#1E7E34",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#DC3545",
      hover: "#B02A37",
      contrastText: "#FFFFFF",
    },
    warning: {
      main: "#FFC107",
      hover: "#D39E00",
      contrastText: "#000000",
    },
    info: {
      main: "#17A2B8",
      hover: "#117A8B",
      contrastText: "#FFFFFF",
    },
  },
};

// 4️⃣ Tema claro
const lightTheme = createTheme(
  deepmerge(baseTheme, {
    palette: {
      mode: "light",
      primary: {
        main: "#FFFFFF",
        contrastText: "#0f0f0f",
        dark: "#CCCCCC",
        light: "#F5F5F5",
        hover: "#E0E0E0",
        divider: "rgba(0, 0, 0, 0.1)",
        father: "#FFFFFF",
        link: "#1976d2",
        boxShadow: "0 1px 2px rgba(0,0,0,0.13), 0 0px 2px rgba(0,0,0,0.13)",
      },
      secondary: {
        main: "#1976d2",
        contrastText: "#fff",
        dark: "#004ba0",
        light: "#63a4ff",
        hover: "#1565c0",
        divider: "rgba(255, 255, 255, 0.3)",
        link: "#1976d2",
        boxShadow: "0 1px 2px rgba(0,0,0,0.13), 0 0px 2px rgba(0,0,0,0.13)",
      },
      background: {
        default: "#FFFFFF",
        paper: "#FAFAFA",
      },
      text: {
        primary: "#212121",
        secondary: "#5F6368",
        dark: "#FFFFFF",
      },
      divider: "#E0E0E0",
      gray: grayScale.light,
    },
  })
);

// 5️⃣ Tema oscuro
const darkTheme = createTheme(
  deepmerge(baseTheme, {
    palette: {
      mode: "dark",
      primary: {
        main: "#0e0e10",
        contrastText: "#f1f1f1",
        dark: "#000000",
        light: "#1f1f23",
        hover: "#282828",
        divider: "rgba(255, 255, 255, 0.2)",
        father: "#18181b",
        link: "#1976d2",
        boxShadow: "0 1px 2px rgba(0,0,0,0.9), 0 0px 2px rgba(0,0,0,0.9)",
      },
      secondary: {
        main: "#0d47a1", // Más oscuro que #1976d2
        contrastText: "#e0e0e0", // Un gris claro pero menos brillante que #f1f1f1
        dark: "#002171", // Más profundo que #004ba0
        light: "#121212", // Más oscuro que #1f1f23
        hover: "#0c3991", // Más oscuro que #1565c0
        divider: "rgba(255, 255, 255, 0.12)", // Menos visible en fondo oscuro
        link: "#0d47a1", // Igual que main para coherencia
        boxShadow: "0 1px 2px rgba(0,0,0,0.95), 0 0px 2px rgba(0,0,0,0.95)", // Sombras más intensas
      },
      background: {
        default: "#121212",
        paper: "#1E1E1E",
      },
      text: {
        primary: "#E3E3E3",
        secondary: "#B8B8B8",
        dark: "#000000",
      },
      divider: "#303030",
      gray: grayScale.dark,
    },
  })
);

export { lightTheme, darkTheme };
