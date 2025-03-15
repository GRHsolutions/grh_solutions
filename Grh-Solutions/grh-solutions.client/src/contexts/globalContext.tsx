import { createContext, ReactNode, useContext } from "react";
import { ParametrosProvider, useParametros } from "./useParamether.provider";
import { AuthProvider } from "./auth.provider";
import { ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "../theme/theme";

// Create Global Context
const GlobalContext = createContext({});

// A component that uses `useParametros` hook to get the theme
const ThemeWrapper = ({ children }: { children: ReactNode }) => {
  const { parametros } = useParametros(); // This is where we use the hook
  const theme = parametros.dark ? darkTheme : lightTheme; // Set theme based on parameters

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

// GlobalProvider with wrapped theme logic
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ParametrosProvider>
      <AuthProvider>
        <GlobalContext.Provider value={{}}>
          <ThemeWrapper>{children}</ThemeWrapper>
        </GlobalContext.Provider>
      </AuthProvider>
    </ParametrosProvider>
  );
};

// Custom hook for accessing the global context
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
