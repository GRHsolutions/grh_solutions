import { Box } from "@mui/material";
import { useHorarios } from "../../../../hooks/horarios";
import GrhGenericTable2 from "../../../../generics/grh-generics/tableWrapper2";
import React from "react";
import { Horarios } from "../../../../domain/models/horarios/Horarios-entities";
import BasicModal from "./ModalTurno";

export const ListHorario = () => {
  const { horarios, pagination, setPagination } = useHorarios();
  const [current, setCurrent] = React.useState<Horarios | null>(null);
  const handleClose = () => setCurrent(null);
  
  const ChangeCurrentPage = (page: number) => {
    setPagination({
      ...pagination,
      currentPage: page
    })
  }

  const onSubmit = (radicado: any) => {
    setCurrent(radicado)
  };
  return(
    <Box width={'100%'}>
      <GrhGenericTable2 
        columns={[{
          key: 'grupo.nombre',
          label: "Al grupo",
          onRowClick: (value)=>{
            onSubmit (value)
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
        <BasicModal current={current} handleClose={handleClose} />
    </Box>
  );
};