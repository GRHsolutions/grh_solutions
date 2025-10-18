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
  "solicitudes" = "SOLICITUDES"

}

export const CompoRender = ({ element, isBoundary = false }: CompoRenderProps) => {
  const theme = useTheme();
  const {
    hasPermission
  } = usePermissions("post-login-renderer");
  const location = useLocation();

  React.useEffect(()=>{
    console.log("Ruta no identificada?" + (isBoundary ? "si" : "no"));
  }, [isBoundary]);

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