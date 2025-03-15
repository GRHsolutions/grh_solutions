import CreatedSolicitudes from "./componentes/CreatedSolicitudes"
import TableSolicitudes from "./componentes/tableSolicitudes"
import "./stiles.scss"
export default function SolicitudesPage (){
  return (
    <div className="TableContent">
        <h1 className="Title">Bienvenido al portal de Solicitudes y peticiones.</h1>
        <div className="divButton">        <CreatedSolicitudes/></div>

        
        <TableSolicitudes/>
    </div>

  )
}