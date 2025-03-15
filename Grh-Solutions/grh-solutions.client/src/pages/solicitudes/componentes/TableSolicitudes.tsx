import "../stiles.scss";
import BasicModal from "./Modalvista";
import React from "react";

export default function TableSolicitudes() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");

  const handleClose = () => setOpen(false);

  const solicitudes = [
    {
      radicado: "SOL-20250313",
      titulo: "Necesito por favor..",
      estado: "pendiente",
      tipo: "prestamo",
      desde: "10/09/2024",
      hasta: "20/09/2024",
    },
    {
      radicado: "SOL-20250314",
      titulo: "Solicitud urgente..",
      estado: "en proceso",
      tipo: "credito",
      desde: "12/09/2024",
      hasta: "22/09/2024",
    },
    {
      radicado: "SOL-20250315",
      titulo: "Requiere aprobación..",
      estado: "aprobado",
      tipo: "inversion",
      desde: "14/09/2024",
      hasta: "24/09/2024",
    },
    {
      radicado: "SOL-20250316",
      titulo: "Revisión final..",
      estado: "pendiente",
      tipo: "prestamo",
      desde: "16/09/2024",
      hasta: "26/09/2024",
    },
    {
      radicado: "SOL-20250317",
      titulo: "Documentos completos..",
      estado: "en proceso",
      tipo: "credito",
      desde: "18/09/2024",
      hasta: "28/09/2024",
    },
    {
      radicado: "SOL-20250318",
      titulo: "Consulta adicional..",
      estado: "pendiente",
      tipo: "prestamo",
      desde: "20/09/2024",
      hasta: "30/09/2024",
    },
  ]

  const onSubmit = (radicado: any) => {
    setName(radicado)
    setOpen(true)
  };

  return (
    <>
      <table>
        <thead>
          <tr className="tr">
            <th>Radicado</th>
            <th>Titulo</th>
            <th>Estado</th>
            <th>Tipo</th>
            <th>Desde la fecha</th>
            <th>Hasta la fecha</th>
          </tr>
        </thead>
        <tbody>
          {solicitudes.map((solicitud, index) => (
            <tr key={index}>
              <td>
                <button
                  className="button2"
                  type="button"
                  onClick={() => onSubmit(solicitud)}
                >
                  {solicitud.radicado}
                </button>
              </td>
              <td>{solicitud.titulo}</td>
              <td>{solicitud.estado}</td>
              <td>{solicitud.tipo}</td>
              <td>{solicitud.desde}</td>
              <td>{solicitud.hasta}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <BasicModal open={open} handleClose={handleClose} name={name} />
    </>
  );
}
