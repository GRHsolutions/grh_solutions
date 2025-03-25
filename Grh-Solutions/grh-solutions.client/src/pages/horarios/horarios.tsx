import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { HorariosProvider } from "../../contexts/horarios.provider";
import { ListHorario } from "./components/list/list";
import PositionedMenu from "./components/list/ModalGroup";

interface HorarioProps {}

const Horarios: React.FC = ({}: HorarioProps) => {
  return (
    <HorariosProvider>
      <Box
        sx={{
          flexDirection: "column",
          gap: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
          height: "100%",
          width: "100%",
          fontSize: "2rem",
        }}
      >
        <Typography>Bienvenidos al portal de horarios</Typography>
        <PositionedMenu />
        <ListHorario />
      </Box>
    </HorariosProvider>
  );
};

export default Horarios;
