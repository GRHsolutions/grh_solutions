import React from "react";
import { NewsProvider } from "../../contexts/news.provider";
import { Box } from "@mui/material";
import Screen from "./components/list/screen";
import { NewsSecureProvider, useNewsSecurity } from "../../contexts/news.security.provider";
import { FadeLoading } from "../../routes/FadeLoading";

// Componente que usa el hook dentro del provider
const ComunicadosContent: React.FC = () => {
  const { 
    isAuthorized 
  } = useNewsSecurity();

  return (
    <>
      {!isAuthorized ? ( // Mientras se verifica, mostrar loading
        <FadeLoading open={true} text="Verificando los permisos del módulo..." />
      ) : (
        <NewsProvider>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "start",
              height: "100%",
              width: "100%",
              fontSize: "2rem",
            }}
          >
            <Screen />
          </Box>
        </NewsProvider>
      )}
    </>
  );
};

// Componente principal que envuelve con el provider
const Comunicados: React.FC = () => {
  return (
    <NewsSecureProvider>
      <ComunicadosContent />
    </NewsSecureProvider>
  );
};

export default Comunicados;
