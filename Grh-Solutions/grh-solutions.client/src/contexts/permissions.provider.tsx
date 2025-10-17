import React from "react";
import { Ident } from "../domain/models/permission/permission.entities";

// Define el tipo del contexto
interface PermissionContextType {
  checkThisPermission: (checkThis: Ident) => void;
  getMyPermissions: () => void;
}

const verifyThisPermissions = [
  {
    method: "GET",
    originalUrl: ""
  }
] as Ident[];

// Crear el contexto
const PermissionContext = React.createContext<PermissionContextType | undefined>(undefined);

// Provider del contexto
export const PermissionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {



  return (
    <PermissionContext.Provider value={{ 

    }}>
      {children}
    </PermissionContext.Provider>
  );
};

// Hook personalizado para acceder al contexto
export const usePermission = () => {
  const context = React.useContext(PermissionContext);
  if (!context) {
    throw new Error("usePermission debe usarse dentro de un PermissionProvider");
  }
  return context;
};
