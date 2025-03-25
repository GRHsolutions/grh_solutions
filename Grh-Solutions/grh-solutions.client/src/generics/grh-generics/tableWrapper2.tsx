import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, useTheme, Box } from "@mui/material";
import formatearFecha from "../../utils/formatearFecha";

export interface GrhItemColumn {
  key: string;
  label: string;
  onRowClick?: (row: any) => void;
  type: "string" | "date"
}

export interface GrhPagination {
  totalRows: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

interface GrhGenericTableProps {
  columns: GrhItemColumn[];
  data: any[];
  pagination: GrhPagination;
  onPageChange: (page: number) => void;
  maxHeight?: string | number;
}

const GrhGenericTable2: React.FC<GrhGenericTableProps> = ({ 
    columns, 
    data, 
    pagination, 
    onPageChange,
    maxHeight
}) => {
  const theme = useTheme();
  const getNestedValue = (obj: any, path: string) => {
      return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    };
  return (
    <Box>
      <TableContainer
        sx={{
          maxHeight: maxHeight,
          width: '100%',
          overflowY: 'auto',
          "&::-webkit-scrollbar": {
            width: "8px", 
          },
          "&::-webkit-scrollbar-track": {
            background: `${theme.palette.primary.light}`, 
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888", 
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555"
          },
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell 
                  sx={{
                    fontWeight: 'bold'
                  }}
                  key={col.key}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex} hover>
                {columns.map((col) => (
                  <TableCell key={col.key}>
                  {col.onRowClick != undefined ? (
                    <span
                      style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
                      onClick={() => col.onRowClick?.(row)}
                    >
                      {getNestedValue(row, col.key)}
                    </span>
                  ) : (
                    col.type == "date" ? formatearFecha(getNestedValue(row, col.key)) : getNestedValue(row, col.key)
                  )}
                </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Paginación */}
      <TablePagination
        component="div"
        count={pagination.totalRows}
        page={pagination.currentPage}
        rowsPerPage={pagination.pageSize}
        onPageChange={(_, newPage) => onPageChange(newPage)}
        rowsPerPageOptions={[pagination.pageSize]}
      />
    </Box>
  );
};

export default GrhGenericTable2;
