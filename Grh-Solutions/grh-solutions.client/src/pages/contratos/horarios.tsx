import React from "react";
import { Box, Typography } from "@mui/material";

interface ContratoProps {}

const Contratos: React.FC = ({}: ContratoProps) => {
  return (
    <ContratosProvider>
      <Box
        sx={{
          flexDirection: "column",
          gap: "30px",
          display: "flex",
          padding: 3,
          justifyContent: "start",
          alignItems: "start",
          height: "100%",
          width: "100%",
          fontSize: "2rem",
        }}
      >
        <Typography variant={"h6"}>Bienvenidos al portal de Contratos</Typography>
        <PositionedMenu />
        <ListContrato />
      </Box>
    </ContratosProvider>
  );
};

export default Contratos;
