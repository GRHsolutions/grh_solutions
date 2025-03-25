import { Box } from "@mui/material";
import { useHorarios } from "../../../../hooks/horarios";
import GrhGenericTable2 from "../../../../generics/grh-generics/tableWrapper2";

export const ListHorario = () => {
  const { horarios, pagination, setPagination } = useHorarios();

  const ChangeCurrentPage = (page: number) => {
    setPagination({
      ...pagination,
      currentPage: page
    })
  }
  return(
    <Box width={'70%'}>
      <GrhGenericTable2 
        columns={[{
          key: 'grupo.nombre',
          label: "Al grupo",
          onRowClick: (obj: any)=>{
            console.log(obj)
          },
          type: 'string'
        },{
          key: 'creadoPor.area.nombre',
          label: "Del area",
          type: 'string'
        },{
          key: 'fechaInicio',
          label: "fecha de inicio",
          type: 'date'
        },{
          key: 'fechaFin',
          label: "fecha de finalizacion",
          type: 'date'
        }]} 
        data={horarios} 
        pagination={pagination} 
        onPageChange={ChangeCurrentPage}   
        maxHeight={'40rem'}
      />
    </Box>
  );
};