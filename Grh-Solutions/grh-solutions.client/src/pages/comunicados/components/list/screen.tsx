import { Grid2, Typography, useTheme } from "@mui/material";
import React from "react";
import { useParametros } from "../../../../contexts/useParamether.provider";
import RenderNews from "./renderNews";
import RenderBirths from "./renderBirths";
import { ViewMail } from "../view/viewMail";
const Screen: React.FC = () => {
  const { parametros } = useParametros();
  const theme = useTheme();
  const { usePhoneScreen } = parametros; 

  return (
    <Grid2 
      container 
      spacing={1.5} 
      width={"80vw"} 
      height={"93vh"}
    >
      {/* Se expande al 100% en móviles, al 10/12 en pantallas grandes */}
      <Grid2 
        size={{
          xs: 12,
          sm: 10
        }}
        sx={{ 
          boxShadow: `${theme.palette.primary.boxShadow}`,
          backgroundColor: `${theme.palette.primary.light}`,
          height: '100%',
          width: '100%',
          overflowY: 'auto',
          "&::-webkit-scrollbar": {
            width: "8px", // Ancho de la barra
          },
          "&::-webkit-scrollbar-track": {
            background: `${theme.palette.primary.light}`, // Color de fondo
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888", // Color del "thumb" (parte desplazable)
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555", // Color cuando se pasa el mouse
          },
        }}
      >
        <RenderNews />
      </Grid2>

      {/* Se esconde en móviles */}
      {!usePhoneScreen && (
        <Grid2 
          size={{
            sm: 2
          }}
          sx={{ 
            boxShadow: `${theme.palette.primary.boxShadow}`,
            backgroundColor: `${theme.palette.primary.light}`,
            height: "100%",
            maxHeight: '60vh',
            marginTop: "25px",
            overflowY: 'auto',
            "&::-webkit-scrollbar": {
              width: "8px", // Ancho de la barra
            },
            "&::-webkit-scrollbar-track": {
              background: "#f1f1f1", // Color de fondo
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#888", // Color del "thumb" (parte desplazable)
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#555", // Color cuando se pasa el mouse
            },
          }}
        >
          <Typography 
            variant="h5" 
            display={"flex"} 
            justifyContent={"center"}
            mt={2}
          >
            Cumpleaños
          </Typography>
          <RenderBirths />
        </Grid2>
      )}
      <ViewMail />
    </Grid2>
  );
};

export default Screen;
