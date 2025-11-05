import React from "react";
import { NewsContext } from "../contexts/news.provider";

// Hook personalizado para acceder al contexto
export const useNews = () => {
    const context = React.useContext(NewsContext);
    if (!context) {
      throw new Error("useNews debe usarse dentro de un NewsProvider");
    }
    return context;
  };
  