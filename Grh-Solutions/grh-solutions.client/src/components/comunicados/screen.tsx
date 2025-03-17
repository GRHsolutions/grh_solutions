import { Grid2, Typography, useTheme } from "@mui/material";
import RenderBirths from "./renderBirths";
import React from "react";
import { useParametros } from "../../contexts/useParamether.provider";

const Screen: React.FC = () => {
  const { parametros } = useParametros();
  const theme = useTheme();
  const { usePhoneScreen } = parametros; 

  return (
    <Grid2 
      container 
      spacing={1.5} 
      width={"80vw"} 
      height={"90vh"}
    >
      {/* Se expande al 100% en móviles, al 10/12 en pantallas grandes */}
      <Grid2 
        size={{
          xs: 12,
          sm: 10
        }}
        sx={{ 
          boxShadow: `${theme.palette.primary.boxShadow}` 
        }}
      >
        <>gola</>
      </Grid2>

      {/* Se esconde en móviles */}
      {!usePhoneScreen && (
        <Grid2 
          size={{
            sm: 2
          }}
          sx={{  
            border: "1px solid black",
            height: "60vh",
            marginTop: "25px"
          }}
        >
          <Typography 
            variant="h5" 
            display={"flex"} 
            justifyContent={"center"}
          >
            Cumpleaños
          </Typography>
          <RenderBirths />
        </Grid2>
      )}
    </Grid2>
  );
};

export default Screen;
