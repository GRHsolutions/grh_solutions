import { Box, Typography } from "@mui/material";
import React from "react";
import GrhGenericTable2 from "../../generics/grh-generics/tableWrapper2";
import dayjs, { Dayjs } from "dayjs";
import { useNavigate } from "react-router-dom";
interface EmpleadosProps {}

interface EmpleadoDemo {
  name: string,
  state : "contratado"|"por-renobar"
  cedula: string
  telefono:string
  fechaContratacion:Dayjs
  [key: string] : any
}

const createData =(name:string,state : "contratado"|"por-renobar",  cedula: string,  telefono:string,  fechaContratacion:Dayjs)=>{
  return {
    name:name,
    state:state,
    cedula: cedula,
    telefono:telefono,
    fechaContratacion:fechaContratacion
  }

}
const Empleados: React.FC = ({}: EmpleadosProps) => {
  const rows : EmpleadoDemo[] = [
    createData("juan","contratado","1231242","42413536", dayjs()),
    createData("miguel","por-renobar","53242","42423536", dayjs()),
    createData("arturo","contratado","14324242","4246536", dayjs()),
    createData("andres","por-renobar","1342","4243354536", dayjs()),
    createData("santiago","contratado","1131242","43456536", dayjs()),
    createData("deiby","por-renobar","12312342","42433536", dayjs()),
    createData("sebastian","contratado","126456242","426466", dayjs()),

  ];  
  const navigate= useNavigate()
  const handleClick =(value : any)=>{
    navigate("/user")
  } 
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
    <Typography variant={"h6"}>Bienvenidos al portal de Empleados</Typography>
        <Box width={'100%'}>
    <GrhGenericTable2 
            maxHeight={"20rem"}
            columns={[{
              key: "name",
              label: "nombre",
              onRowClick: (value)=>{
                handleClick (value)
              },
              type: "string"
            },{
              key: "state",
              label: "estado",
              onRowClick: undefined,
              type: "string"
            },
            {
              key: "cedula",
              label: "cedula?",
              onRowClick: undefined,
              type: "string"
            },{
              key: "telefono",
              label: "telefono",
              onRowClick: undefined,
              type: "string"
            },{
              key: "fechaContratacion",
              label: "fecha de contratacion",
              onRowClick: undefined,
              type: "date"
            }
          ]} 
            data={rows} 
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
          </Box>
  </Box>
  );
};

export default Empleados;

