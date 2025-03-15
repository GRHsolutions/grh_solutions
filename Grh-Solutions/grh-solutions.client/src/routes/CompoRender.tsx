import { Box, useTheme } from "@mui/material";
import useSuspenseLoader from "../hooks/suspenseLoader";
import React from "react";

interface CompoRenderProps {
  element: React.LazyExoticComponent<React.FC<object>>;
  isBoundary?: boolean;
}

export const CompoRender = ({ element, isBoundary = false }: CompoRenderProps) => {
  const theme = useTheme();

  React.useEffect(()=>{
    console.log("Ruta no identificada?" + (isBoundary ? "si" : "no"));
  }, [isBoundary]);

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.father,
        color: theme.palette.primary.contrastText,
        borderBottom: `1px solid ${theme.palette.primary.divider}`,
        marginTop: "4.2rem",
        display: "flex",
        height: "100%",
        overflowY: "auto", // Permite el desplazamiento si el contenido es muy grande
      }}
    >
      {useSuspenseLoader(element)}
    </Box>
  );
};