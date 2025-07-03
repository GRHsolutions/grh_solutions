import { Avatar, Box, Typography, Menu, MenuItem, ListItemIcon, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
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
import { getProfileById } from "../../../domain/services/profile/profile.service";
import { IOption, Profile } from "../../../domain/models/profile/profile.entities";
import { useAuth } from "../../../hooks/auth";

interface InfoUserProps { id?: string, documentType: IOption[] }
export default function InfoUser({ id, documentType }: InfoUserProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [modalType, setModalType] = useState<string | null>(null);
  const [profile, setProfile] = useState<Partial<Profile>>({});
  const open = Boolean(anchorEl);
  const { auth } = useAuth();
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
  console.log(profile)
  useEffect(() => {
    getProfileById(id, auth.token).then((res) => {
      setProfile(res.data)
    })
  }, [id]);
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
              Certificado laboral
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
          {profile && (
            <>
              <Avatar
                alt={`${profile.name} ${profile.lastname}`}
                src="/static/images/avatar/1.jpg"
                sx={{ width: 200, height: 200, margin: "auto", marginBottom: 6 }}
              />

              <Box sx={{ marginLeft: 8, marginBottom: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 1 }}>
                  Info personal
                </Typography>
                <Typography>Nombre: {profile.name}</Typography>
                <Typography>Apellido: {profile.lastname}</Typography>
                <Typography>
                  Fecha de nacimiento: {new Date(profile.date_of_birth || "").toLocaleDateString("es-CO")}
                </Typography>
                <Typography>Documento: {profile.document}</Typography>
                <Typography>Tipo de documento: {documentType.find((doc) => doc.value === profile.type_document)?.name}</Typography>
                <Typography>RH: {profile.rh}</Typography>
                <Typography>Estado: {profile.status}</Typography>
              </Box>

              <Box sx={{ marginLeft: 8, marginBottom: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 1 }}>
                  Contacto
                </Typography>
                <Typography>Teléfono: {profile.number_phone}</Typography>
                <Typography>Teléfono fijo: {profile.telephone}</Typography>
                <Typography>Email: {profile.email}</Typography>
                <Typography>Dirección: {profile.address}</Typography>
              </Box>

              <Box sx={{ marginLeft: 8, marginBottom: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 1 }}>
                  Datos laborales
                </Typography>
                <Typography>Nombre de vacante: {profile.vacancy_name}</Typography>
                <Typography>
                  Fecha de aplicación: {new Date(profile.date_application || "").toLocaleDateString("es-CO")}
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </Box>

      {modalType === "edit" && <ModalEdit open={true} handleClose={handleCloseModal} profile={profile} documentType={documentType} />}
      {modalType === "certificate" && <ModalCertificate open={true} handleClose={handleCloseModal}  profile={profile} documentType={documentType}/>}
      {modalType === "contratos" && <ModalContratos open={true} handleClose={handleCloseModal} />}
      {modalType === "roles" && <ModalRole open={true} handleClose={handleCloseModal} />}
      {modalType === "password" && <ModalChangePassword open={true} handleClose={handleCloseModal} />}
    </>
  );
}