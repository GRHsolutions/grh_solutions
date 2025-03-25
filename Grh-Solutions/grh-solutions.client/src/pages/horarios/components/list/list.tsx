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

  return (
    <Box width={'70%'}>
      <GrhGenericTable2 
        columns={[{
          key: 'grupo.nombre',
          label: "Al grupo",
          onRowClick: (obj: any)=>{
            console.log(obj)
          }
        },{
          key: 'creadoPor.area.nombre',
          label: "Del area",
        }]} 
        data={horarios} 
        pagination={pagination} 
        onPageChange={ChangeCurrentPage}        
      />
    </Box>
  );
};