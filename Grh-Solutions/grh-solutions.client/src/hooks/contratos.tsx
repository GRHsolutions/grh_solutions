import React from "react";
import { ContratosContext } from "../contexts/contratos.provider";

// Hook personalizado para acceder al contexto
export const useContratos = () => {
    const context = React.useContext(ContratosContext);
    if (!context) {
      throw new Error("useContratos debe usarse dentro de un ContratosProvider");
    }
    return context;
  };
  