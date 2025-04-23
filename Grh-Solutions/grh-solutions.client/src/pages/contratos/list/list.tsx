import { Box } from "@mui/material";
import React from "react";
import { Contracts } from "../../../domain/models/contratos/contratos.entities";
import { useContratos } from "../../../hooks/contratos";
import GrhGenericTable2 from "../../../generics/grh-generics/tableWrapper2";
import GrhButton from "../../../generics/grh-generics/button";

export const ListContrato = () => {
  const { Contratos, pagination, setPagination } = useContratos();
  const [current, setCurrent] = React.useState<Contracts | null>(null);
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
          key: 'title',
          label: "Titulo del contrato",
          onRowClick: (value)=>{
            onSubmit (value)
          },
          type: 'string'
        },{
          key: 'contractType',
          label: "Tipo del contrato",
          type: 'string'
        },{
          key: 'createdAt',
          label: "Fecha de creacion",
          type: 'date'
        }]} 
        data={Contratos} 
        pagination={pagination} 
        onPageChange={ChangeCurrentPage}   
        maxHeight={'40rem'}
        onShowingDate={{
          showDate: true,
          showTime: false
        }}
      />
    </Box>
  );
};