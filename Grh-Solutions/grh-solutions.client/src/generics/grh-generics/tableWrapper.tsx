import * as React from 'react';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { SxProps } from '@mui/material';

interface DataTableProps<T> {
  paginationModel: GridPaginationModel;
  columns: GridColDef[];
  rows: T[];
  paperSx?: SxProps;
  onPaginationChange?: (paginationModel: GridPaginationModel) => void;
}

function DataTable<T>({
  paginationModel,
  rows,
  columns,
  paperSx,
  onPaginationChange,
}: DataTableProps<T>) {
  return (
    <Paper sx={{ ...paperSx }}>
      <DataGrid
        rows={rows}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationChange} // Controla la paginación si se pasa la función
        pageSizeOptions={[5, 10, 25, 50]} // Tamaños de página configurables
        checkboxSelection // Activa la selección de filas (opcional)
        sx={{ border: 0 }}
      />
    </Paper>
  );
}

export default DataTable;
