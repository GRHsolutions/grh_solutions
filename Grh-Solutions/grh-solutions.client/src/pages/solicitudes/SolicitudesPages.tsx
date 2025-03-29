import { Box, Typography } from "@mui/material";
import CreatedSolicitudes from "./componentes/CreatedSolicitudes";
import TableSolicitudes from "./componentes/TableSolicitudes";

export default function SolicitudesPage() {
  return (
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
      <Typography variant={"h6"}>
        Bienvenido al portal de Solicitudes y peticiones.
      </Typography>
      <CreatedSolicitudes />  
      <TableSolicitudes />
    </Box>
  );
}
