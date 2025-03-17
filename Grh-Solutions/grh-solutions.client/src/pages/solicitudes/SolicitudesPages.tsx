import { Box } from "@mui/material"
import CreatedSolicitudes from "./componentes/CreatedSolicitudes"
import TableSolicitudes from "./componentes/tableSolicitudes"
import "./stiles.scss"
export default function SolicitudesPage() {
  return (
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
    <div className="TableContent">
      <h1 className="Title">Bienvenido al portal de Solicitudes y peticiones.</h1>
      <div className="divButton">
        <CreatedSolicitudes />
      </div>


      <TableSolicitudes />
    </div>
    </Box>
  )
}