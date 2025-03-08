import { Box, useTheme } from "@mui/material";
import useSuspenseLoader from "../hooks/suspenseLoader";
import React from "react";

interface CompoRenderProps {
  element: React.LazyExoticComponent<React.FC<{}>>;
}

export const CompoRender = ({ element }: CompoRenderProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
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