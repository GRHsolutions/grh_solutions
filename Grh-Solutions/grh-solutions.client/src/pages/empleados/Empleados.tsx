import { Box, Typography } from "@mui/material";
import React from "react";
import GrhGenericTable2 from "../../generics/grh-generics/tableWrapper2";
import dayjs, { Dayjs } from "dayjs";
interface EmpleadosProps {}

interface TableDemo {
  name: string,
  calories: number, 
  fat: number, 
  carbs: number, 
  protein : number,
  cualquiera: Cualqueira,
  [key: string] : any
}

interface Cualqueira {
  name: string,
  fecha: Dayjs;

}
const Empleados: React.FC = ({}: EmpleadosProps) => {
  const rows : TableDemo[] = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0, "sigma", dayjs()),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3, "sigma", dayjs()),
    createData('Eclair', 262, 16.0, 24, 6.0, "sigma", dayjs()),
    createData('Cupcake', 305, 3.7, 67, 4.3, "sigma", dayjs()),
    createData('Gingerbread', 356, 16.0, 49, 3.9, "sigma", dayjs()),
    createData('Gingerbread', 356, 16.0, 49, 3.9, "sigma", dayjs()),
    createData('Gingerbread', 356, 16.0, 49, 3.9, "sigma", dayjs()),
    createData('Gingerbread', 356, 16.0, 49, 3.9, "sigma", dayjs()),
    createData('Gingerbread', 356, 16.0, 49, 3.9, "sigma", dayjs()),
    createData('Gingerbread', 356, 16.0, 49, 3.9, "sigma", dayjs()),
  ];  
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
    <Typography variant={"h6"}>Bienvenidos al portal de horarios</Typography>
    <GrhGenericTable2 
            maxHeight={"20rem"}
            columns={[{
              key: "name",
              label: "Alimento",
              onRowClick: (value)=>{
                console.log(value)
              },
              type: "string"
            },{
              key: "calories",
              label: "Calorias",
              onRowClick: undefined,
              type: "string"
            },
            {
              key: "fat",
              label: "Fatura?",
              onRowClick: undefined,
              type: "string"
            },{
              key: "carbs",
              label: "Carbohidratos",
              onRowClick: undefined,
              type: "string"
            },{
              key: "cualquiera.name",
              label: "Cualquiera",
              onRowClick: undefined,
              type: "string"
            },{
              key: "cualquiera.fecha",
              label: "Fecha",
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
  );
};

export default Empleados;

function createData(arg0: string, arg1: number, arg2: number, arg3: number, arg4: number, arg5: string, arg6: any): TableDemo {
  throw new Error("Function not implemented.");
}
