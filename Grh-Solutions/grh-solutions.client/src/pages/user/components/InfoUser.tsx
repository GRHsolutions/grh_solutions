import { Avatar, Box, Typography, Menu, MenuItem, ListItemIcon, IconButton } from "@mui/material";
import React, { useState } from "react";
import ModalEdit from "./ModalEdit";
import ModalContratos from "./ModalContratos";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ModalCertificate from "./ModalCertificate";
import TuneIcon from "@mui/icons-material/Tune";
import ModalRole from "./ModalRole";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import ModalChangePassword from "./ModalChangePassword";
import { useNavigate } from "react-router-dom";

const userInfo = [
  {
    title: "Info personal",
    data: [
      { label: "Nombre", value: "Roberto" },
      { label: "Apellido", value: "Gomez Bolanos" },
      { label: "Fecha de nacimiento", value: "12/12/2000 / 18 años" },
      { label: "País/Ciudad", value: "Colombia/Bogotá" },
    ],
  },
  {
    title: "Contacto",
    data: [
      { label: "Teléfono", value: "12345678" },
      { label: "Correo", value: "rGKt2@example.com" },
      { label: "Dirección", value: "Calle 12 # 12-12" },
    ],
  },
  {
    title: "Datos laborales",
    data: [
      { label: "Fecha de contrato", value: "12/12/2000" },
      { label: "Fecha final de contrato", value: "12/12/2000" },
      { label: "Cargo", value: "Desarrollador" },
      { label: "Estado", value: "Activo" },
    ],
  },
];

export default function InfoUser() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [modalType, setModalType] = useState<string | null>(null);
  const open = Boolean(anchorEl);
 const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = (type: string) => {
    setModalType(type);
    handleClose();
  };

  const handleCloseModal = () => {
    setModalType(null);
  };

  const sendHvc = () => {
    navigate("/hv-user")
  }


  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
          height: "100%",
          width: "100%",
          fontSize: "2rem",
          marginRight: "20px",
        }}
      >
        <Box
          sx={{
            width: "68%",
            height: "90%",
            borderRight: "2px solid black",
            borderLeft: "2px solid black",
            padding: "25px",
            overflowY: "auto",
          }}
        >
          <Box sx={{ textAlign: "center", marginBottom: 2, display: "flex", marginLeft: 12 }}>
            <Typography variant="h5" sx={{ marginTop: 1 }}>Información del Usuario</Typography>
            <IconButton onClick={handleClick} sx={{ marginLeft: 2 }}>
              <TuneIcon sx={{ fontSize: 40, cursor: "pointer" }} />
            </IconButton>
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
          >
            <MenuItem onClick={() => handleOpenModal("edit")}>
              <ListItemIcon>
                <EditIcon fontSize="small" />
              </ListItemIcon>
              Editar información
            </MenuItem>
            <MenuItem onClick={() => handleOpenModal("certificate")}>
              <ListItemIcon>
                <DownloadIcon fontSize="small" />
              </ListItemIcon>
              Descargar certificados
            </MenuItem>
            <MenuItem onClick={() => handleOpenModal("contratos")}>
              <ListItemIcon>
                <AssignmentIcon fontSize="small" />
              </ListItemIcon>
              Verificar contratos
            </MenuItem>
            <MenuItem onClick={() => handleOpenModal("roles")}>
              <ListItemIcon>
                <AdminPanelSettingsIcon fontSize="small" />
              </ListItemIcon>
              Administrar roles
            </MenuItem>
            <MenuItem onClick={() => handleOpenModal("password")}>
              <ListItemIcon>
                <VpnKeyIcon fontSize="small" />
              </ListItemIcon>
              Cambiar contraseña
            </MenuItem>
            <MenuItem onClick={sendHvc}>
              <ListItemIcon>
                <DownloadIcon fontSize="small" />
              </ListItemIcon>
              Hoja de vida
            </MenuItem>
          </Menu>

          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: 200, height: 200, margin: "auto", marginBottom: 6 }} />

          {userInfo.map((section) => (
            <Box key={section.title} sx={{ marginLeft: 8, marginBottom: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 1 }}>{section.title}</Typography>
              {section.data.map((item) => (
                <Typography key={item.label} sx={{ marginBottom: 1 }}>
                  {item.label}: {item.value}
                </Typography>
              ))}
            </Box>
          ))}
        </Box>
      </Box>

      {modalType === "edit" && <ModalEdit open={true} handleClose={handleCloseModal} />}
      {modalType === "certificate" && <ModalCertificate open={true} handleClose={handleCloseModal} />}
      {modalType === "contratos" && <ModalContratos open={true} handleClose={handleCloseModal} />}
      {modalType === "roles" && <ModalRole open={true} handleClose={handleCloseModal} />}
      {modalType === "password" && <ModalChangePassword open={true} handleClose={handleCloseModal} />}
    </>
  );
}