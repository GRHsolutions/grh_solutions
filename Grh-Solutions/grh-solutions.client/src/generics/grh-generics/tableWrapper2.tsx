import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  useTheme,
  Box,
} from "@mui/material";
import formatearFecha from "../../utils/formatearFecha";

// Modificamos las props para usar el tipo genérico T
export interface GrhItemColumn<T> {
  key: string;
  label: string;
  onRowClick?: (row: T) => void;
  type: "string" | "date";
}

export interface GrhPagination {
  totalRows: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

interface GrhGenericTableProps<T> {
  columns: GrhItemColumn<T>[];
  data: T[];
  pagination?: GrhPagination;
  onPageChange: (page: number) => void;
  maxHeight?: string | number;
  maxWidth?: string | number;
  onShowingDate?: {
    showDate: boolean;
    showTime: boolean;
  };
}

// Componente genérico
const GrhGenericTable2 = <T,>({
  columns,
  data,
  pagination,
  onPageChange,
  maxHeight,
  maxWidth,
  onShowingDate,
}: GrhGenericTableProps<T>): React.ReactElement => {
  const theme = useTheme();

  const getNestedValue = (obj: any, path: string) => {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  };

  return (
    <Box>
      <TableContainer
        sx={{
          maxHeight,
          maxWidth,
          width: "100%",
          overflowY: "auto",
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
            background: "#555",
          },
        }}
      >
        <Table>
          <TableHead
            sx={{
              backgroundColor: theme.palette.primary.light,
              color: theme.palette.primary.contrastText,
            }}
          >
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.key} sx={{ fontWeight: "bold" }}>
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
                    {col.onRowClick ? (
                      <span
                        style={{
                          color: "blue",
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                        onClick={() => col.onRowClick?.(row)}
                      >
                        {getNestedValue(row, col.key)}
                      </span>
                    ) : col.type === "date" ? (
                      formatearFecha(
                        getNestedValue(row, col.key),
                        onShowingDate?.showDate,
                        onShowingDate?.showTime
                      )
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
      {pagination && (
        <TablePagination
          component="div"
          count={pagination.totalRows}
          page={pagination.currentPage}
          rowsPerPage={pagination.pageSize}
          onPageChange={(_, newPage) => onPageChange(newPage)}
          rowsPerPageOptions={[pagination.pageSize]}
        />
      )}
    </Box>
  );
};

export default GrhGenericTable2;
