import React from "react";
import { localStorageUtil } from "../utils/localStorage";
import { useMediaQuery } from "@mui/material";
// Define el tipo para los parámetros del tema
interface Parametros {
  dark: boolean; // para usar el tema claro o oscuro, segun lo que escoje el usuario
  usePhoneScreen: boolean; // para manejar el tamano de la pantalla del usuario
}

// Define el tipo del contexto
interface ParametrosContextType {
  parametros: Parametros;
  toggleTheme: () => void;
}

// Crear el contexto
const ParametrosContext = React.createContext<ParametrosContextType | undefined>(undefined);

// Provider del contexto
export const ParametrosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [parametros, setParametros] = React.useState<Parametros>({ 
    dark: false, 
    usePhoneScreen: useMediaQuery("(max-width: 600px)")
  });

  React.useEffect(() => {
    const storedTheme = localStorageUtil.get("theme");
    if (storedTheme) {
      setParametros({ 
        ...parametros,
        dark: storedTheme === "dark" 
      });
    }
  }, []);

  const toggleTheme = () => {
    setParametros((prev) => {
      const newTheme = !prev.dark;
      localStorageUtil.set("theme", newTheme ? "dark" : "light");
      return { 
        ...parametros,
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
