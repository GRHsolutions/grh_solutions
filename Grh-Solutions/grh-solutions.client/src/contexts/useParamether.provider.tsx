import React from "react";
import { localStorageUtil } from "../utils/localStorage";
// Define el tipo para los parámetros del tema
interface Parametros {
  dark: boolean;
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
  const [parametros, setParametros] = React.useState<Parametros>({ dark: false });

  React.useEffect(() => {
    const storedTheme = localStorageUtil.get("theme");
    if (storedTheme) {
      setParametros({ dark: storedTheme === "dark" });
    }
  }, []);

  const toggleTheme = () => {
    setParametros((prev) => {
      const newTheme = !prev.dark;
      localStorageUtil.set("theme", newTheme ? "dark" : "light");
      return { dark: newTheme };
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
