import { FC, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  TablePagination,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { Contract } from "../../../domain/models/contratos/contratos.entities";

interface Props {
  data: Contract[];
  onView: (item: Contract) => void;
  onEdit: (item: Contract) => void;
  onViewPDF: (item: Contract) => void; // ✅ Prop para abrir PDF
}

const ContratoTable: FC<Props> = ({ data, onView, onEdit, onViewPDF }) => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const handleChangePage = (_: any, newPage: number) => {
    setPage(newPage);
  };

  const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper sx={{ width: "100%" }} elevation={3}>
      <TableContainer sx={{ height: "600px" }}>
        <Table stickyHeader>
          <TableHead sx={{ bgcolor: "#f0f0f0" }}>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Título</strong></TableCell>
              <TableCell><strong>Tipo Contrato</strong></TableCell>
              <TableCell><strong>Estado</strong></TableCell>
              <TableCell align="center"><strong>Acciones</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((contrato) => (
                <TableRow key={contrato._id} hover>
                  <TableCell>{contrato._id}</TableCell>
                  <TableCell>{contrato.title}</TableCell>
                  <TableCell>{contrato.tipo_contrato?.name || "Sin asignar"}</TableCell>
                  <TableCell>{contrato.estado}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => onView(contrato)} sx={{ color: "#1976D2" }}>
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton onClick={() => onEdit(contrato)} sx={{ color: "#E65100" }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => onViewPDF(contrato)} sx={{ color: "#D32F2F" }}>
                      <PictureAsPdfIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography>No hay contratos</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[]}
      />
    </Paper>
  );
};

export default ContratoTable;
