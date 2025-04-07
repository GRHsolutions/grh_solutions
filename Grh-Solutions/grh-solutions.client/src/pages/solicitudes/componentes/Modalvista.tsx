import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import PersonIcon from "@mui/icons-material/Person";
import { Stack, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Solicitud } from "../../../domain/models/solicitudes/solicitudes.entities";
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
import GppBadIcon from '@mui/icons-material/GppBad';

const style = {
  position: "absolute",
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
  current: Solicitud | null;
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
        <Box>
          <div className="DivInformacion">
            <label>Informacion basica</label>
          </div>
          <div className="divInfo">
            <Typography variant="body1">{current?.titulo}</Typography>
            <Typography variant="body1">Tipo: {current?.tipo}</Typography>
            <Typography variant="body2">
              Texto de la peticion, si quiere inventese algo aqui Juan
            </Typography>
          </div>
        </Box>
      ),
    },
    {
      value: "2",
      label: "involucadros",
      content: (
        <Box>
          <div className="DivInformacion">
            <label>Usuarios involucrados a la solicitud</label>
          </div>
          <div className="divInfo">
            <div className="divUsuarioIn">
              <label className="divUsuarioLabel">
                <input type="checkbox" id="User1" name="User1" />
                <AccountCircleIcon sx={{ fontSize: 40 }} />
              </label>
              <div className="divUsuarioInfo">
                <label>Pedro Gomez</label>
                <Typography variant="body1">Creador de la solicitud</Typography>
              </div>
            </div>

            <div className="divUsuarioIn">
              <label className="divUsuarioLabel">
                <input type="checkbox" id="User2" name="User2" />
                <AccountCircleIcon sx={{ fontSize: 40 }} />
              </label>
              <div className="divUsuarioInfo">
                <label>Mario Mendosa</label>
                <Typography variant="body1">Interesado</Typography>
              </div>
            </div>

            <div className="divUsuarioIn">
              <label className="divUsuarioLabel">
                <input type="checkbox" id="User3" name="User3" />
                <AccountCircleIcon sx={{ fontSize: 40 }} />
              </label>
              <div className="divUsuarioInfo">
                <label>Luisa Aldana</label>
                <Typography variant="body1">Interesada</Typography>
              </div>
            </div>
          </div>
        </Box>
      ),
    },
    {
      value: "3",
      label: "seguimientos",
      content: (
        <Box>
          <div className="DivInformacion">
            <label>Seguimientos creados por un asignado a la solicitud</label>
          </div>
          <div className="divInfo">
            <div className="divUsuarioIn">
              <InsertDriveFileIcon sx={{ fontSize: 40 }} />
              <div className="divUsuarioInfo">
                <label>Se ha vuelto a pendiente</label>
                <Typography variant="body1">Por: Carlos Mario</Typography>
              </div>
            </div>

            <div className="divUsuarioIn">
              <InsertDriveFileIcon sx={{ fontSize: 40 }} />
              <div className="divUsuarioInfo">
                <label>Se ha asignado a Carlos Mario</label>
                <Typography variant="body1">Por: Mario Juda</Typography>
              </div>
            </div>

            <div className="divUsuarioIn">
              <InsertDriveFileIcon sx={{ fontSize: 40 }} />
              <div className="divUsuarioInfo">
                <label>Ha asignado a Mario Juda, es el primer asignado</label>
                <Typography variant="body1">Por: Mario Castañeda</Typography>
              </div>
            </div>
          </div>
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
                  Ver solicitud {current?.radicado}
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
      {mdo == "history-solicitudes" && (
        <HistorialSolicitudes handleClose={handleHistoy} />
      )}
      {mdo == "documentos-solicitudes" && (
        <DocumentosSolicitudes handleClose={handleHistoy} />
      )}
      {mdo == "Finalizar-solicitudes" && (
        <FinalizarSolicitud handleClose={handleHistoy} />
      )}
      {mdo == "Aprobar-solicitudes" && (
        <AprobarSolicitud handleClose={handleHistoy} />
      )}
      {mdo == "Rechazar-solicitudes" && (
        <RechazarSolicitud handleClose={handleHistoy} />
      )}
    </div>
  );
}
