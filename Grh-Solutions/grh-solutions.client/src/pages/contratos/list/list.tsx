import { Box } from "@mui/material";
import { Contracts } from "../../../domain/models/contratos/contratos.entities";
import { useContratos } from "../../../hooks/contratos";
import GrhGenericTable2 from "../../../generics/grh-generics/tableWrapper2";
import { ViewContrato } from "../view/viewContrato";

export const ListContrato = () => {
  const { 
    Contratos,
    pagination,
    setPagination, 
    setCurrent,
    current
  } = useContratos();

  const handleClose = () => setCurrent({
    item: null,
    action: 'none'
  });
  
  const ChangeCurrentPage = (page: number) => {
    setPagination({
      ...pagination,
      currentPage: page
    })
  }

  const onSubmit = (radicado: Contracts) => {
    setCurrent({
      item: radicado, 
      action: 'view'
    })
  };
  
  return(
    <Box width={'100%'}>
      <GrhGenericTable2<Contracts> 
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

      {(current.action === 'view' && current.item != null) && (
        <ViewContrato 
          handleClose={handleClose}
        />
      )}
    </Box>
  );
};