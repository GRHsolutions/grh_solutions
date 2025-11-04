import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { HorariosProvider } from "../../contexts/horarios.provider";
import { ListHorario } from "./components/list/list";
import PositionedMenu from "./components/list/MenuGroup";


const Horarios: React.FC = () => {
    const [reload, setReload] = useState<boolean>(false);
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
          <div
           style={{ display: "flex", justifyContent: "space-between", width: "100%" }}
           >
          <Typography variant={"h5"}>Bienvenidos al portal de horarios</Typography>
          <PositionedMenu reload={reload}  setReload={setReload} />
          </div>
        <ListHorario  reload={reload} setReload={setReload}  />
      </Box>
    </HorariosProvider>
  );
};

export default Horarios;
