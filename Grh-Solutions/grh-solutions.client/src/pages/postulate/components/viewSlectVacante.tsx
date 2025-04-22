import { useState } from "react";
import { Box, Typography, IconButton, Modal, Menu, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ModalDeleteVacante from "./ModalDeleteVacante";
import ModalEditVacant from "./ModalEditVacant";

// Datos de ejemplo para la vacante
const vacantData = {
  type: "Full-time", // o el tipo que correspondiera
  title: "Desarrollador Frontend", // título en inglés
  description: "Se busca desarrollador con experiencia en React.",
  requisitos: "Experiencia en React y conocimientos de TypeScript.",
  typeVacant: "Remoto",
  salario: "$5000"
};

interface IModalProps {
  open: boolean;
  handleClose: () => void;
}

const data = [
  { nombre: "Roberto Gómez Bolaños", fechaPostulacion: "2025-04-01" },
  { nombre: "Juan Pérez", fechaPostulacion: "2025-04-02" },
  { nombre: "María López", fechaPostulacion: "2025-04-03" },
];

export default function ViewSelectVacante({ open, handleClose }: IModalProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleCloseMenu();
    setOpenEditModal(true);
  };

  const handleDelete = () => {
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleDeleteVacante = () => {
    console.log("Vacante eliminada");
    setOpenDeleteModal(false);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleEditVacant = (updatedData: typeof vacantData) => {
    console.log('Vacante actualizada:', updatedData);
    setOpenEditModal(false);
  }
  const theme = useTheme();

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        height: '90%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius: '15px',
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}>
        <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 10, right: 10 }}>
          <CloseIcon />
        </IconButton>
        <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" fontWeight="bold" color={theme.palette.text.primary} sx={{ textAlign: 'center' }}>
          Usuarios Postulados a la Vacante
        </Typography>
          <IconButton onClick={handleMenuClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={handleEdit}>Editar vacante</MenuItem>
            <MenuItem onClick={handleDelete}>Eliminar vacante</MenuItem>
          </Menu>
        </Box>
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center"><Typography variant="h6">Nombre</Typography></TableCell>
                <TableCell align="center"><Typography variant="h6">Fecha de Postulación</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{row.nombre}</TableCell>
                  <TableCell align="center">{row.fechaPostulacion}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <ModalDeleteVacante
          open={openDeleteModal}
          handleClose={handleCloseDeleteModal}
          handleDelete={handleDeleteVacante}
        />
        <ModalEditVacant
          open={openEditModal}
          handleClose={handleCloseEditModal}
          initialValues={vacantData}
          handleEdit={handleEditVacant}
        />
      </Box>
    </Modal>
  );
}
