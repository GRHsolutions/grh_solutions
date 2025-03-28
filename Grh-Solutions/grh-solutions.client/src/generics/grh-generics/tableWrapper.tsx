import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { SxProps } from '@mui/material';

interface DataTableProps<T> {
  paginationModel: GridPaginationModel;
  columns: GridColDef[];
  rows: T[];
  paperSx?: SxProps;
  onPaginationChange?: (paginationModel: GridPaginationModel) => void;
  rowCount?: number;
}

function GrhDataTable<T>({
  paginationModel,
  rows,
  columns,
  paperSx,
  rowCount,
  onPaginationChange,
}: DataTableProps<T>) {
  return (
    <Paper sx={{ 
      ...paperSx 
      }}
    >
      <DataGrid
        rows={rows}
        rowCount={rowCount}
        paginationMode="server"
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationChange} // Controla la paginación si se pasa la función
        pageSizeOptions={[5, 10, 25, 50]} // Tamaños de página configurables
        checkboxSelection // Activa la selección de filas (opcional)
        sx={{ 
          border: 0 
        }}
        disableRowSelectionOnClick
        pagination
      />
    </Paper>
  );
}

export default GrhDataTable;
