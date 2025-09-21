import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import PersonIcon from "@mui/icons-material/Person";
import { Stack, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Request } from "../../../domain/models/request/request.entities";
import GrhBasicMenu from "../../../generics/grh-generics/menu";
import { TabConfig, TabsCompo } from "../../../generics/tabs/tabs";
import { AsignarUsuario } from "./modales/asignarUsuario";
import { DocumentosSolicitudes } from "./modales/documentosSolicitudes";
import { HistorialSolicitudes } from "./modales/historialSolicitudes";
import HistoryIcon from "@mui/icons-material/History";
import { FinalizarSolicitud } from "./modales/finalizarSolicitud";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import { AprobarSolicitud } from "./modales/aprobarSolicitud";
import GppGoodIcon from "@mui/icons-material/GppGood";
import { RechazarSolicitud } from "./modales/rechazarSolicitud";
import GppBadIcon from "@mui/icons-material/GppBad";

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
  "&:focus": {
    outline: "none",
  },
};

interface BasicModalProps {
  current: Request | null;
  handleClose: () => void;
}

export default function BasicModal({ current, handleClose }: BasicModalProps) {
  const theme = useTheme();
  const [mdo, setMdo] = useState("");

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
            <Typography variant="h6" fontWeight="bold">
              Información básica
            </Typography>
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
            {/* Radicado = _id */}
            <Typography variant="body1">
              Radicado: {current?._id ?? "No disponible"}
            </Typography>

            {/* Otros campos */}
            <Typography variant="body1">
              Tipo: {current?.type_request ?? "General"}
            </Typography>
            <Typography variant="body2">
              Texto de la petición, si quiere invéntese algo aquí Juan
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      value: "2",
      label: "involucadros",
      content: (
        <Box sx={{ color: theme.palette.text.primary, width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              p: 2,
              mt: 3,
              borderRadius: "5px 5px 0 0",
              bgcolor: theme.palette.background.paper,
              border: `2px solid ${theme.palette.primary.contrastText}`,
              borderBottom: "none",
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Usuarios involucrados a la solicitud
            </Typography>
          </Box>

          <Box
            sx={{
              p: 2,
              bgcolor: theme.palette.background.paper,
              border: `2px solid ${theme.palette.primary.contrastText}`,
              borderRadius: "0 0 5px 5px",
            }}
          >
            {[
              ["User1", "Pedro Gomez", "Creador de la solicitud"],
              ["User2", "Mario Mendosa", "Interesado"],
              ["User3", "Luisa Aldana", "Interesada"],
            ].map(([id, nombre, rol], index, array) => (
              <Box
                key={id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: index !== array.length - 1 ? 2 : 0,
                  p: 2,
                  border: `1px solid ${theme.palette.primary.contrastText}`,
                  borderRadius: 2,
                  gap: 2,
                }}
              >
                <label
                  htmlFor={id}
                  style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                >
                  <input
                    type="checkbox"
                    id={id}
                    name={id}
                    style={{ marginRight: 8, cursor: "pointer" }}
                  />
                  <AccountCircleIcon sx={{ fontSize: 40 }} />
                </label>
                <Box>
                  <Typography variant="subtitle1">{nombre}</Typography>
                  <Typography variant="body1">{rol}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      ),
    },
    {
      value: "3",
      label: "seguimientos",
      content: (
        <Box sx={{ color: theme.palette.text.primary, width: "100%" }}>
          <Box
            sx={{
              p: 2,
              mt: 3,
              borderRadius: "5px 5px 0 0",
              bgcolor: theme.palette.background.paper,
              border: `2px solid ${theme.palette.primary.contrastText}`,
              borderBottom: "none",
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Seguimientos creados por un asignado a la solicitud
            </Typography>
          </Box>

          <Box
            sx={{
              p: 2,
              bgcolor: theme.palette.background.paper,
              border: `2px solid ${theme.palette.primary.contrastText}`,
              borderRadius: "0 0 5px 5px",
            }}
          >
            {[
              ["Se ha vuelto a pendiente", "Carlos Mario"],
              ["Se ha asignado a Carlos Mario", "Mario Juda"],
              ["Ha asignado a Mario Juda, es el primer asignado", "Mario Castañeda"],
            ].map(([accion, autor], idx) => (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 2,
                  mb: 2,
                  border: `1px solid ${theme.palette.primary.contrastText}`,
                  borderRadius: 2,
                }}
              >
                <InsertDriveFileIcon sx={{ fontSize: 40 }} />
                <div>
                  <Typography variant="subtitle1">{accion}</Typography>
                  <Typography variant="body1">Por: {autor}</Typography>
                </div>
              </Box>
            ))}
          </Box>
        </Box>
      ),
    },
  ];

  const handleCloseModal = () => {
    handleClose();
  };

  const handleCls = () => {
    setMdo("");
  };

  const handleHistoy = () => {
    setMdo("");
  };

  return (
    <div>
      <Modal open={current != null} onClose={handleCloseModal}>
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: `1px solid ${(theme.palette.primary.hover, 0.1)}`,
              color: theme.palette.text.primary,
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <NoteAltIcon
                fontSize="large"
                sx={{
                  color: theme.palette.primary.contrastText,
                }}
              />
              <Box display={"flex"} flexDirection={"column"}>
                <Typography variant="h6" fontWeight={"bold"} mt={"3"}>
                  Ver solicitud {current?._id ?? "Sin radicado"}
                </Typography>
                <Typography variant="body1" mt={"-6"}>
                  Vea la información actual de su solicitud
                </Typography>
              </Box>
            </Stack>
            <GrhBasicMenu
              optionsPosition={{
                top: "2px",
                left: "10px",
              }}
              items={[
                {
                  icon: <PersonIcon />,
                  label: "Asignar usuario",
                  onClick: () => setMdo("asigna-usuario"),
                },
                {
                  icon: <HistoryIcon />,
                  label: "Historial usuario",
                  onClick: () => setMdo("history-solicitudes"),
                },
                {
                  icon: <InsertDriveFileIcon />,
                  label: "Documentos usuario",
                  onClick: () => setMdo("documentos-solicitudes"),
                },
                {
                  icon: <StopCircleIcon />,
                  label: "Finalizar solicitud",
                  onClick: () => setMdo("Finalizar-solicitudes"),
                },
                {
                  icon: <GppGoodIcon />,
                  label: "Aprobar solicitud",
                  onClick: () => setMdo("Aprobar-solicitudes"),
                },
                {
                  icon: <GppBadIcon />,
                  label: "Rechazar solicitud",
                  onClick: () => setMdo("Rechazar-solicitudes"),
                },
              ]}
            />
          </Box>
          <TabsCompo tabs={tabs} />
        </Box>
      </Modal>
      {mdo == "asigna-usuario" && <AsignarUsuario handleClose={handleCls} />}
      {mdo == "history-solicitudes" && <HistorialSolicitudes handleClose={handleHistoy} />}
      {mdo == "documentos-solicitudes" && <DocumentosSolicitudes handleClose={handleHistoy} />}
      {mdo == "Finalizar-solicitudes" && <FinalizarSolicitud handleClose={handleHistoy} />}
      {mdo == "Aprobar-solicitudes" && <AprobarSolicitud handleClose={handleHistoy} />}
      {mdo == "Rechazar-solicitudes" && <RechazarSolicitud handleClose={handleHistoy} />}
    </div>
  );
}
