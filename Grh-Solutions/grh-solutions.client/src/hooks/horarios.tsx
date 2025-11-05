import React from "react";
import { HorariosContext } from "../contexts/horarios.provider";

// Hook personalizado para acceder al contexto
export const useHorarios = () => {
    const context = React.useContext(HorariosContext);
    if (!context) {
      throw new Error("useHorarios debe usarse dentro de un HorariosProvider");
    }
    return context;
  };
  