import React from "react";
import { Box, Typography } from "@mui/material";
import { HorariosProvider } from "../../contexts/horarios.provider";
import { ListHorario } from "./components/list/list";
import PositionedMenu from "./components/list/MenuGroup";

interface HorarioProps {}

const Horarios: React.FC = ({}: HorarioProps) => {
  return (
    <HorariosProvider>
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
        <Typography variant={"h6"}>Bienvenidos al portal de horarios</Typography>
        <PositionedMenu />
        <ListHorario />
      </Box>
    </HorariosProvider>
  );
};

export default Horarios;
