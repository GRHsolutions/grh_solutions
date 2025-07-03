import { useEffect, useState } from "react";
import { Box, Typography, IconButton, Modal, Menu, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ModalDeleteVacante from "./ModalDeleteVacante";
import ModalEditVacant from "./ModalEditVacant";
import { getPostulantes } from "../../../domain/services/postulante/postulante.service";
import { useAuth } from "../../../hooks/auth";
import { Postulante, VacanteData } from "../../../domain/models/vacantes/vacantes.entities";
import { deleteVacancy } from "../../../domain/services/vacancies/vacancies.service";


interface IModalProps {
  open: boolean;
  handleClose: () => void;
  vacantData: VacanteData
}


export default function ViewSelectVacante({ open, handleClose, vacantData }: IModalProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [Vacantes, setvacantes] = useState<Postulante[]>([]);
  const openMenu = Boolean(anchorEl);
  const { auth } = useAuth();
  console.log(vacantData);
  useEffect(() => {
    getPostulantes(vacantData?._id, auth.token).then(res => setvacantes(res.data));
  }, [vacantData]);
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

  const handleDeleteVacante = async () => {
    try {
      if (!vacantData?._id) {
        console.error("ID de la vacante no disponible");
        return;
      }

      const response = await deleteVacancy(vacantData._id, auth.token);
      console.log("Vacante eliminada:", response.data);
      setTimeout(() => {
        window.location.reload();
      }, 5000);
      setOpenDeleteModal(false);
      handleClose();
    } catch (error) {
      console.error("Error al eliminar la vacante:", error);
    }
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

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
                <TableCell align="center"><Typography variant="h6">Estado</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Vacantes.map((row, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{row.user.firstName + " " + row.user.lastName}</TableCell>
                  <TableCell align="center">
                    {new Date(row.application_date).toLocaleDateString('es-CO', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })}
                  </TableCell>
                  <TableCell align="center">{row.status}</TableCell>
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
          token={auth.token}
          vacationId={vacantData?._id}
        />
      </Box>
    </Modal>
  );
}
