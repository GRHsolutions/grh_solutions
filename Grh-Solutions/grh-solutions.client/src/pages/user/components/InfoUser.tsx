import { Avatar, Box, Typography, Menu, MenuItem, ListItemIcon, IconButton } from "@mui/material";

import React, { useState } from "react";
import ModalEdit from "./ModalEdit";
import ModalContratos from "./ModalContratos";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ModalCertificate from "./ModalCertificate";
import TuneIcon from '@mui/icons-material/Tune';
const userInfo = [
  {
    title: "Info personal", data: [
      { label: "Nombre", value: "Roberto" },
      { label: "Apellido", value: "Gomez Bolanos" },
      { label: "Fecha de nacimiento", value: "12/12/2000 / 18 años" },
      { label: "País/Ciudad", value: "Colombia/Bogotá" },
    ]
  },
  {
    title: "Contacto", data: [
      { label: "Teléfono", value: "12345678" },
      { label: "Correo", value: "rGKt2@example.com" },
      { label: "Dirección", value: "Calle 12 # 12-12" },
    ]
  },
  {
    title: "Datos laborales", data: [
      { label: "Fecha de contrato", value: "12/12/2000" },
      { label: "Fecha final de contrato", value: "12/12/2000" },
      { label: "Cargo", value: "Desarrollador" },
      { label: "Estado", value: "Activo" },
    ]
  },
]
export default function InfoUser() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [modalType, setModalType] = useState<string | null>(null);
  const open = Boolean(anchorEl);

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

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "start", height: "100%", width: "100%", fontSize: "2rem", marginRight: "20px", }}>
        <Box sx={{ width: "68%", height: "100%", borderRight: "3px solid black", borderLeft: "3px solid black", padding: "25px" }}>
          <Box sx={{ textAlign: "center", marginBottom: 2, display: "flex", marginLeft: 12 }}>
            <Typography variant="h5" sx={{ marginTop: 1 }}>Información del Usuario</Typography>
            <IconButton onClick={handleClick} sx={{ marginLeft: 2}}>
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
            <MenuItem
              onClick={() => handleOpenModal("edit")}
              sx={{ border: "1px solid #ccc", borderRadius: "4px", margin: "4px", paddingX: "6px" }}
            >
              <ListItemIcon>
                <EditIcon fontSize="small" />
              </ListItemIcon>
              Editar información
            </MenuItem>

            <MenuItem
              onClick={() => handleOpenModal("certificate")}
              sx={{ border: "1px solid #ccc", borderRadius: "4px", margin: "4px", paddingX: "6px" }}
            >
              <ListItemIcon>
                <DownloadIcon fontSize="small" />
              </ListItemIcon>
              Descargar certificados
            </MenuItem>

            <MenuItem
              onClick={() => handleOpenModal("contratos")}
              sx={{ border: "1px solid #ccc", borderRadius: "4px", margin: "4px", paddingX: "6px" }}
            >
              <ListItemIcon>
                <AssignmentIcon fontSize="small" />
              </ListItemIcon>
              Verificar contratos
            </MenuItem>
          </Menu>

          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: 200, height: 200, marginBottom: 6, marginTop: 6, marginLeft: "auto", marginRight: "auto" }} />

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
    </>
  );
}
