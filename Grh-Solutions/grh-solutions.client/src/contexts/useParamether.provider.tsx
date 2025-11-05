import React from "react";
import { localStorageUtil } from "../utils/localStorage";
import { useMediaQuery } from "@mui/material";

// Define el tipo para los parámetros del tema
interface Parametros {
  dark: boolean; // para usar el tema claro o oscuro, segun lo que escoge el usuario
  usePhoneScreen: boolean; // para manejar si el usuario está en móvil
}

// Define el tipo del contexto
interface ParametrosContextType {
  parametros: Parametros;
  toggleTheme: () => void;
}

// Crear el contexto
const ParametrosContext = React.createContext<ParametrosContextType | undefined>(undefined);

// Función para detectar si es un navegador móvil
const isMobileBrowser = () => {
  return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Provider del contexto
export const ParametrosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  
  const [parametros, setParametros] = React.useState<Parametros>({ 
    dark: false, 
    usePhoneScreen: isSmallScreen || isMobileBrowser(), // Detecta si es pantalla pequeña o un navegador móvil
  });

  React.useEffect(() => {
    const storedTheme = localStorageUtil.get("theme");
    if (storedTheme) {
      setParametros((prev) => ({ 
        ...prev,
        dark: storedTheme === "dark" 
      }));
    }
  }, []);

  const toggleTheme = () => {
    setParametros((prev) => {
      const newTheme = !prev.dark;
      localStorageUtil.set("theme", newTheme ? "dark" : "light");
      return { 
        ...prev,
        dark: newTheme 
      };
    });
  };

  return (
    <ParametrosContext.Provider value={{ parametros, toggleTheme }}>
      {children}
    </ParametrosContext.Provider>
  );
};

// Hook personalizado para acceder al contexto
export const useParametros = () => {
  const context = React.useContext(ParametrosContext);
  if (!context) {
    throw new Error("useParametros debe usarse dentro de un ParametrosProvider");
  }
  return context;
};
