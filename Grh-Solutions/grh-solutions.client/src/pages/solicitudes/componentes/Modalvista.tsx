import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import PersonIcon from "@mui/icons-material/Person";
import HistoryIcon from "@mui/icons-material/History";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import GppGoodIcon from "@mui/icons-material/GppGood";
import GppBadIcon from "@mui/icons-material/GppBad";

import { Box, Grid, Modal, Stack, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

import GrhBasicMenu from "../../../generics/grh-generics/menu";
import { TabConfig, TabsCompo } from "../../../generics/tabs/tabs";

import { Request } from "../../../domain/models/request/request.entities";
import { Involved } from "../../../domain/models/request/involved.entities";
import { http } from "../../../infrastructure/axios/axios";

import { AsignarUsuario } from "./modales/asignarUsuario";
import { DocumentosSolicitudes } from "./modales/documentosSolicitudes";
import { HistorialSolicitudes } from "./modales/historialSolicitudes";
import { FinalizarSolicitud } from "./modales/finalizarSolicitud";
import { AprobarSolicitud } from "./modales/aprobarSolicitud";
import { RechazarSolicitud } from "./modales/rechazarSolicitud";

// 🔹 Tipo para profile
interface Profile {
  _id: string;
  user: string;
  name: string;
  lastname: string;
  date_of_birth: string;
  email: string;
  address: string | null;
  number_phone: string | null;
  rh: string;
  status: string;
  type_document: string;
  document: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const style = {
  position: "absolute" as const,
  top: 0,
  right: 0,
  width: "45%",
  height: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  overflowY: "auto",
  "&:focus": { outline: "none" },
};

interface BasicModalProps {
  current: Request | null;
  handleClose: () => void;
  userId: string; // id del usuario actual
}

export default function BasicModal({ current, handleClose, userId }: BasicModalProps) {
  const theme = useTheme();
  const [mdo, setMdo] = useState("");
  const [involved, setInvolved] = useState<Involved[]>([]);
  const [loadingInvolved, setLoadingInvolved] = useState(false);
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);

  // 🔹 Traer usuario actual
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await http.get<Profile>(`/api/profiles/getByUserId?userId=${userId}`);
        setCurrentUser(response); // 🔹 Aquí ya es el objeto Profile
      } catch (error) {
        console.error("Error al obtener usuario actual", error);
      }
    };
  
    if (userId) fetchCurrentUser();
  }, [userId]);
  

  // 🔹 Cargar involucrados
  useEffect(() => {
    const fetchInvolved = async (requestId: string) => {
      try {
        setLoadingInvolved(true);
        const response = await http.get<Involved[]>(`/api/involved/getByRequestId?requestId=${requestId}`);
        // 🔹 response ya es un array de Involved
        const mapped = response.map((i) => ({
          ...i,
          createdAt: dayjs(i.createdAt),
          updatedAt: dayjs(i.updatedAt),
          profileId:
            i.profileId && typeof i.profileId === "object"
              ? { ...i.profileId, createdAt: dayjs(i.profileId.createdAt), updatedAt: dayjs(i.profileId.updatedAt) }
              : i.profileId,
          requestId:
            i.requestId && typeof i.requestId === "object"
              ? { ...i.requestId, createdAt: dayjs(i.requestId.createdAt), updatedAt: dayjs(i.requestId.updatedAt) }
              : i.requestId,
        }));
        setInvolved(mapped);
      } catch (error) {
        console.error("Error al obtener involucrados", error);
        setInvolved([]);
      } finally {
        setLoadingInvolved(false);
      }
    };
  
    if (current?._id) fetchInvolved(current._id);
  }, [current?._id]);
  

  const handleCloseModal = () => handleClose();
  const handleCls = () => setMdo("");

  const tabs: TabConfig[] = [
    {
      value: "1",
      label: "informacion",
      content: (
        <Box sx={{ width: "100%", color: theme.palette.text.primary }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              p: "2% 5%",
              mt: "3%",
              borderRadius: "5px 5px 0 0",
              backgroundColor: theme.palette.background.paper,
              border: `2px solid ${theme.palette.primary.contrastText}`,
              borderBottom: "none",
            }}
          >
            <Typography variant="h6" fontWeight="bold">Información básica</Typography>
          </Box>
          <Box
            sx={{
              p: "2% 5%",
              borderRadius: "0 0 5px 5px",
              backgroundColor: theme.palette.background.paper,
              border: `2px solid ${theme.palette.primary.contrastText}`,
              width: "100%",
              boxSizing: "border-box",
              minHeight: 350,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6}><Typography variant="body1"><strong>Título:</strong> {current?.title ?? "Sin título"}</Typography></Grid>
              <Grid item xs={6}><Typography variant="body1"><strong>Estado:</strong> {current?.status ?? "Sin estado"}</Typography></Grid>
              <Grid item xs={6}><Typography variant="body1"><strong>Tipo:</strong> {current?.type_request ?? "General"}</Typography></Grid>
              <Grid item xs={6}><Typography variant="body1"><strong>Radicado:</strong> {current?._id ?? "No disponible"}</Typography></Grid>
              <Grid item xs={6}><Typography variant="body1"><strong>Creado:</strong> {current ? dayjs(current.createdAt).format("DD/MM/YYYY HH:mm") : "No disponible"}</Typography></Grid>
              <Grid item xs={6}><Typography variant="body1"><strong>Actualizado:</strong> {current ? dayjs(current.updatedAt).format("DD/MM/YYYY HH:mm") : "No disponible"}</Typography></Grid>
            </Grid>
            <Typography variant="body2" sx={{ mt: 2 }}><strong>Descripción:</strong> {current?.infoDx ?? "Sin descripción"}</Typography>
          </Box>
        </Box>
      ),
    },
    {
      value: "2",
      label: "involucrados",
      content: (
        <Box sx={{ color: theme.palette.text.primary, width: "100%" }}>
          <Box sx={{ display: "flex", alignItems: "center", p: 2, mt: 3, borderRadius: "5px 5px 0 0", bgcolor: theme.palette.background.paper, border: `2px solid ${theme.palette.primary.contrastText}`, borderBottom: "none" }}>
            <Typography variant="h6" fontWeight="bold">Usuarios involucrados a la solicitud</Typography>
          </Box>
          <Box sx={{ p: 2, bgcolor: theme.palette.background.paper, border: `2px solid ${theme.palette.primary.contrastText}`, borderRadius: "0 0 5px 5px" }}>
            {loadingInvolved ? (
              <Typography>Cargando involucrados...</Typography>
            ) : involved.length === 0 ? (
              <Typography>No hay usuarios involucrados</Typography>
            ) : (
              involved.map((i) => (
                <Box key={i._id} sx={{ display: "flex", alignItems: "center", mb: 2, p: 2, border: `1px solid ${theme.palette.primary.contrastText}`, borderRadius: 2, gap: 2 }}>
                  <AccountCircleIcon sx={{ fontSize: 40 }} />
                  <Box>
                    <Typography variant="subtitle1">
                      {i.profileId && typeof i.profileId === "object"
                        ? `${i.profileId.name} ${i.profileId.lastname}`
                        : "Desconocido"}
                    </Typography>
                    <Typography variant="body2">Rol: {i.role ?? "Sin rol"}</Typography>
                  </Box>
                </Box>
              ))
            )}
          </Box>
        </Box>
      ),
    },
    {
      value: "3",
      label: "seguimientos",
      content: (
        <Box sx={{ color: theme.palette.text.primary, width: "100%" }}>
          <Box sx={{ p: 2, mt: 3, borderRadius: "5px 5px 0 0", bgcolor: theme.palette.background.paper, border: `2px solid ${theme.palette.primary.contrastText}`, borderBottom: "none" }}>
            <Typography variant="h6" fontWeight="bold">Seguimientos creados por los involucrados</Typography>
          </Box>
          <Box sx={{ p: 2, bgcolor: theme.palette.background.paper, border: `2px solid ${theme.palette.primary.contrastText}`, borderRadius: "0 0 5px 5px" }}>
            {loadingInvolved ? (
              <Typography>Cargando seguimientos...</Typography>
            ) : involved.length === 0 ? (
              <Typography>No hay seguimientos</Typography>
            ) : (
              involved.map((i) => (
                <Box key={i._id} sx={{ display: "flex", alignItems: "center", gap: 2, p: 2, mb: 2, border: `1px solid ${theme.palette.primary.contrastText}`, borderRadius: 2 }}>
                  <InsertDriveFileIcon sx={{ fontSize: 40 }} />
                  <Box>
                    <Typography variant="subtitle1">
                      {i.profileId ? `${i.profileId.name} ${i.profileId.lastname}` : "Desconocido"}
                    </Typography>
                    <Typography variant="body2">
                      Involucrado por: {i.assignedBy ? `${i.assignedBy.name} ${i.assignedBy.lastname}` : "Desconocido"}
                    </Typography>
                  </Box>
                </Box>
              ))
            )}
          </Box>
        </Box>
      ),
    },
  ];

  return (
    <div>
      <Modal open={current != null} onClose={handleCloseModal}>
        <Box sx={style}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid rgba(0,0,0,0.1)`, color: theme.palette.text.primary }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <NoteAltIcon fontSize="large" sx={{ color: theme.palette.primary.contrastText }} />
              <Box display={"flex"} flexDirection={"column"}>
                <Typography variant="h6" fontWeight={"bold"} mt={1}>Ver solicitud {current?._id ?? "Sin radicado"}</Typography>
                <Typography variant="body1" mt={-0.5}>Vea la información actual de su solicitud</Typography>
              </Box>
            </Stack>
            <GrhBasicMenu
              optionsPosition={{ top: "2px", left: "10px" }}
              items={[
                { icon: <PersonIcon />, label: "Asignar usuario", onClick: () => setMdo("asigna-usuario") },
                { icon: <HistoryIcon />, label: "Historial usuario", onClick: () => setMdo("history-solicitudes") },
                { icon: <InsertDriveFileIcon />, label: "Documentos usuario", onClick: () => setMdo("documentos-solicitudes") },
                { icon: <StopCircleIcon />, label: "Finalizar solicitud", onClick: () => setMdo("Finalizar-solicitudes") },
                { icon: <GppGoodIcon />, label: "Aprobar solicitud", onClick: () => setMdo("Aprobar-solicitudes") },
                { icon: <GppBadIcon />, label: "Rechazar solicitud", onClick: () => setMdo("Rechazar-solicitudes") },
              ]}
            />
          </Box>

          <TabsCompo tabs={tabs} />
        </Box>
      </Modal>

      {/* 🔹 Renderizado seguro de los modales */}
      {mdo === "asigna-usuario" && current?._id && currentUser?._id && (
  <AsignarUsuario handleClose={handleCls} requestId={current._id} currentUserId={currentUser._id} />
)}
      {mdo === "history-solicitudes" && current?._id && (
        <HistorialSolicitudes handleClose={handleCls} requestId={current._id} />
      )}
      {mdo === "documentos-solicitudes" && <DocumentosSolicitudes handleClose={handleCls} />}
      {mdo === "Finalizar-solicitudes" && <FinalizarSolicitud handleClose={handleCls} />}
      {mdo === "Aprobar-solicitudes" && <AprobarSolicitud handleClose={handleCls} />}
      {mdo === "Rechazar-solicitudes" && <RechazarSolicitud handleClose={handleCls} />}
    </div>
  );
}
