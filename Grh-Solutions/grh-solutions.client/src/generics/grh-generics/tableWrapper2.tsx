import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from "@mui/material";

export interface GrhItemColumn {
  key: string;
  label: string;
  onRowClick?: (row: any) => void;
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
}

const GrhGenericTable2: React.FC<GrhGenericTableProps> = ({ 
    columns, 
    data, 
    pagination, 
    onPageChange 
}) => {
    const getNestedValue = (obj: any, path: string) => {
        return path.split('.').reduce((acc, part) => acc && acc[part], obj);
      };
  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.key}>{col.label}</TableCell>
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
                    getNestedValue(row, col.key)
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
    </div>
  );
};

export default GrhGenericTable2;
