import React from "react";
import GrhGenericTable2 from "../../../generics/grh-generics/tableWrapper2";
import BasicModal from "./Modalvista";
import { Box } from "@mui/material";
import { Solicitud } from "../../../domain/models/solicitudes/solicitudes.entities";
import dayjs from "dayjs";

export default function TableSolicitudes() {
  const [current, setCurrent] = React.useState<Solicitud | null>(null);

  const handleClose = () => setCurrent(null);

  const solicitudes: Solicitud[]= [
    {
      radicado: "SOL-20250313",
      titulo: "Necesito por favor..",
      estado: "pendiente",
      tipo: "prestamo",
      desde: dayjs("10/09/2024"),
      hasta: dayjs("2/09/2024"),
      creadoPor: {
        id: 1,
        primerNombre: "Pedro",
        segundoNombre: "Pedro",
        primerApellido: "",
        segundoApellido: "",
        correo: "pedro.sanchez@gmail.com",
        photo: null,
        area: {
          id: 41,
          nombre: "Contabilidad"
        }
      },
    },
    {
      radicado: "SOL-20250314",
      titulo: "Solicitud urgente..",
      estado: "en proceso",
      tipo: "credito",
      desde: dayjs("10/09/2024"),
      hasta: dayjs("2/09/2024"),
      creadoPor: {
        id: 1,
        primerNombre: "Pedro",
        segundoNombre: "Pedro",
        primerApellido: "",
        segundoApellido: "",
        correo: "pedro.sanchez@gmail.com",
        photo: null,
        area: {
          id: 41,
          nombre: "Contabilidad"
        }
      },
    },
    {
      radicado: "SOL-20250315",
      titulo: "Requiere aprobación..",
      estado: "aprobado",
      tipo: "inversion",
      desde: dayjs("10/09/2024"),
      hasta: dayjs("2/09/2024"),
      creadoPor: {
        id: 1,
        primerNombre: "Pedro",
        segundoNombre: "Pedro",
        primerApellido: "",
        segundoApellido: "",
        correo: "pedro.sanchez@gmail.com",
        photo: null,
        area: {
          id: 41,
          nombre: "Contabilidad"
        }
      },
    },
    {
      radicado: "SOL-20250316",
      titulo: "Revisión final..",
      estado: "pendiente",
      tipo: "prestamo",
      desde: dayjs("10/09/2024"),
      hasta: dayjs("2/09/2024"),
      creadoPor: {
        id: 1,
        primerNombre: "Pedro",
        segundoNombre: "Pedro",
        primerApellido: "",
        segundoApellido: "",
        correo: "pedro.sanchez@gmail.com",
        photo: null,
        area: {
          id: 41,
          nombre: "Contabilidad"
        }
      },
    },
    {
      radicado: "SOL-20250317",
      titulo: "Documentos completos..",
      estado: "en proceso",
      tipo: "credito",
      desde: dayjs("10/09/2024"),
      hasta: dayjs("2/09/2024"),
      creadoPor: {
        id: 1,
        primerNombre: "Pedro",
        segundoNombre: "Pedro",
        primerApellido: "",
        segundoApellido: "",
        correo: "pedro.sanchez@gmail.com",
        photo: null,
        area: {
          id: 41,
          nombre: "Contabilidad"
        }
      },
    },
    {
      radicado: "SOL-20250318",
      titulo: "Consulta adicional..",
      estado: "pendiente",
      tipo: "prestamo",
      desde: dayjs("10/09/2024"),
      hasta: dayjs("2/09/2024"),
      creadoPor: {
        id: 1,
        primerNombre: "Pedro",
        segundoNombre: "Pedro",
        primerApellido: "",
        segundoApellido: "",
        correo: "pedro.sanchez@gmail.com",
        photo: null,
        area: {
          id: 41,
          nombre: "Contabilidad"
        }
      },
    },
  ]

  const onSubmit = (radicado: any) => {
    setCurrent(radicado)
  };

  return (
    <Box sx={{width: "100%" }}>
      <GrhGenericTable2 
            maxHeight={"20rem"}
            columns={[{
              key: "radicado",
              label: "Radicado",
              onRowClick: (value)=>{
                onSubmit(value)
              },
              type: "string"
            },{
              key: "titulo",
              label: "Titulo",
              onRowClick: undefined,
              type: "string"
            },
            {
              key: "estado",
              label: "Estado",
              onRowClick: undefined,
              type: "string"
            },{
              key: "tipo",
              label: "Tipo",
              onRowClick: undefined,
              type: "string"
            },{
              key: "desde",
              label: "Desde",
              onRowClick: undefined,
              type: "date"
            },{
              key: "hasta",
              label: "Hasta",
              onRowClick: undefined,
              type: "date"
            }
          ]} 
            data={solicitudes} 
            pagination={{
              pageSize: 5,
              totalPages: 10,
              currentPage: 1,
              totalRows: 510
            }} 
            onPageChange={(value)=>{
              console.log(value);
            }}                    
          />
      <BasicModal current={current} handleClose={handleClose} />
    </Box>
  );
}
