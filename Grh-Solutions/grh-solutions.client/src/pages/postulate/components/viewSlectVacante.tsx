import { useEffect, useState } from "react";
import { Box, Typography, IconButton, Modal, Menu, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, useTheme, Snackbar, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ModalDeleteVacante from "./ModalDeleteVacante";
import ModalEditVacant from "./ModalEditVacant";
import { getPostulantes, updatePostulante } from "../../../domain/services/postulante/postulante.service";
import { useAuth } from "../../../hooks/auth";
import { Postulante, VacanteData } from "../../../domain/models/vacantes/vacantes.entities";
import { deleteVacancy } from "../../../domain/services/vacancies/vacancies.service";
import { Charge } from "../../../domain/models/charge/charge.entities";
import { Area } from "../../../domain/models/area/area.entities";
import { useNavigate } from "react-router-dom";
import { getProfiles } from "../../../domain/services/profile/profile.service";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import VisibilityIcon from "@mui/icons-material/Visibility";


interface IModalProps {
  open: boolean;
  handleClose: () => void;
  vacantData: VacanteData
  charges: Charge[]
  areas: Area[]
}


export default function ViewSelectVacante({ open, handleClose, vacantData, charges, areas }: IModalProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [Vacantes, setvacantes] = useState<Postulante[]>([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
const [profiles, setProfiles] = useState<{ data: string[] }>({
  data: [],
});
  const navigate = useNavigate();
  const openMenu = Boolean(anchorEl);
  const { auth } = useAuth();
  useEffect(() => {
    if (vacantData?._id) {
      getPostulantes(vacantData._id, auth.token).then(res => setvacantes(res.data));
    }
  }, [vacantData]);
  // Obtener todos los perfiles para cruzar luego
  useEffect(() => {
    getProfiles(auth.token).then(res => setProfiles(res.data));
  }, []);
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  console.log(profiles);
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

  const handleAccept = async (postulanteId: string) => {
    try {
      await updatePostulante(postulanteId, "contratado", auth.token);
      setAlertMessage("Postulante contratado exitosamente");
      setOpenAlert(true);

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error("Error al aceptar postulante:", error);
    }
  };

  const handleReject = async (postulanteId: string) => {
    try {
      await updatePostulante(postulanteId, "rechazado", auth.token);
      setAlertMessage("Postulante rechazado exitosamente");
      setOpenAlert(true);

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error("Error al rechazar postulante:", error);
    }
  };
  useEffect(() => {
    getProfiles(auth.token);

  }, []);
  const handleView = (id: string) => {

    navigate(`/user/${id}`);
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
                <TableCell align="center"><Typography variant="h6">Correo</Typography></TableCell>
                <TableCell align="center"><Typography variant="h6">Fecha de Postulación</Typography></TableCell>
                <TableCell align="center"><Typography variant="h6">Estado</Typography></TableCell>
                <TableCell align="center"><Typography variant="h6">Acciones</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Vacantes.map((row, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{row.user.email}</TableCell>
                  <TableCell align="center">
                    {new Date(row.application_date).toLocaleDateString('es-CO', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })}
                  </TableCell>
                  <TableCell align="center">{row.status}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      sx={{
                        width: 36,
                        height: 36,
                        bgcolor: "#4caf50",
                        color: "white",
                        m: 0.5,
                        "&:hover": { bgcolor: "#43a047" },
                        borderRadius: "50%",
                      }}
                      onClick={() => handleAccept(row._id)}
                    >
                      <CheckIcon fontSize="small" />
                    </IconButton>

                    <IconButton
                      sx={{
                        width: 36,
                        height: 36,
                        bgcolor: "#f44336",
                        color: "white",
                        m: 0.5,
                        "&:hover": { bgcolor: "#e53935" },
                        borderRadius: "50%",
                      }}
                      onClick={() => handleReject(row._id)}
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>

                    <IconButton
                      sx={{
                        width: 36,
                        height: 36,
                        bgcolor: "#2196f3",
                        color: "white",
                        m: 0.5,
                        "&:hover": { bgcolor: "#1976d2" },
                        borderRadius: "50%",
                      }}
                      onClick={() => handleView(profiles[0]?._id)}
                    >
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
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
          areas={areas}
          charges={charges}
        />
        <Snackbar open={openAlert} autoHideDuration={3000} onClose={() => setOpenAlert(false)} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
          <Alert onClose={() => setOpenAlert(false)} severity="success" sx={{ width: "100%" }}>
            <Typography variant="body1"><strong>{alertMessage}</strong></Typography>
          </Alert>
        </Snackbar>
      </Box>
    </Modal>
  );
}
