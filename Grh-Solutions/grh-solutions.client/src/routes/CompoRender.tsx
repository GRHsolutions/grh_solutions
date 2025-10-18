import { Box, useTheme } from "@mui/material";
import useSuspenseLoader from "../hooks/suspenseLoader";
import React from "react";
import { usePermissions } from "../contexts/permissions.provider";
import { Route, useLocation } from "react-router-dom";

interface CompoRenderProps {
  element: React.LazyExoticComponent<React.FC<object>>;
  isBoundary?: boolean;
}

enum TypesModule {
  "comunicados" = "COMUNICADOS",
  "postulate" = "VACANTES",
  "solicitudes" = "SOLICITUDES",
  "horarios" = "HORARIOS",
  "empleados" = "EMPLEADOS"
}

export const CompoRender = ({ element, isBoundary = false }: CompoRenderProps) => {
  const theme = useTheme();
  const {
    hasPermission
  } = usePermissions("post-login-renderer");
  const location = useLocation();

  // Función para obtener el módulo según la ruta
  const getModuleFromPath = (path: string): TypesModule | undefined => {
    // Puedes personalizar esta lógica según tu estructura de rutas
    if (path.includes("/comunicados")) return TypesModule.comunicados;
    if (path.includes("/postulate")) return TypesModule.postulate;
    if (path.includes("/solicitudes")) return TypesModule.solicitudes;
    return undefined;
  };

  const currentModule = getModuleFromPath(location.pathname);

  React.useEffect(() => {
    console.log("Ruta no identificada? " + (isBoundary ? "si" : "no"));
    console.log("Módulo actual:", currentModule);
  }, [isBoundary, currentModule]);

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.main, // theme.palette.primary.main
        color: theme.palette.primary.contrastText,
        borderBottom: `1px solid ${theme.palette.primary.divider}`,
        p: 1,
        display: "flex",
        height: "100%",
        overflowY: "hidden", // El desplazamiento debe ser por el componente a renderizar, IMBECIL
      }}
    >
      {useSuspenseLoader(element)}
    </Box>
  );
};