import React, { use } from "react";
import { Box } from "@mui/material";
import { HorariosProvider } from "../../contexts/horarios.provider";

interface HorarioProps {}

const Horarios: React.FC = ({}: HorarioProps) => {

  return (
    <HorariosProvider>
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
        
      </Box>
    </HorariosProvider>
  );
};

export default Horarios;
