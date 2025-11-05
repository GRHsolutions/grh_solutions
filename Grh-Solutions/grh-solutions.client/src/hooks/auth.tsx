import React from "react";
import { AuthContext } from "../contexts/auth.provider";

// Hook personalizado para acceder al contexto
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};