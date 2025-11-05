import CloseIcon from "@mui/icons-material/Close";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { Box, IconButton, Modal, Typography, useTheme } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { History } from "../../../../domain/models/request/history.entities";
import { http } from "../../../../infrastructure/axios/axios";

interface HistorialSolicitudesProps {
  handleClose: () => void;
  requestId: string;
}

const stylehis = {
  position: "fixed" as const,
  top: 0,
  right: 0,
  width: "25%",
  height: "100%",
  bgcolor: "background.paper",
  borderLeft: "2px solid black",
  boxShadow: "-2px 0px 15px rgba(0, 0, 0, 0.2)",
  display: "flex",
  flexDirection: "column",
  borderRadius: "10px",
};

export const HistorialSolicitudes = ({ handleClose, requestId }: HistorialSolicitudesProps) => {
  const theme = useTheme();
  const [history, setHistory] = useState<History[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!requestId) return;
  
      setLoading(true);
      try {
        console.log("[HistorialSolicitudes] requestId enviado:", requestId);
  
        const response = await http.get<History[]>(
          `/api/history/getByRequestId?requestId=${requestId}`
        );
  
        console.log("[HistorialSolicitudes] response recibido:", response);
  
        setHistory(response); // Si el backend devuelve directamente History[]
      } catch (err) {
        console.error("Error cargando historial:", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchHistory();
  }, [requestId]);

  return (
    <Modal open={true} onClose={handleClose}>
      <Box sx={stylehis} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
            py: 1,
            borderBottom: "2px solid black",
            bgcolor: "background.paper",
            borderRadius: "10px 10px 0 0",
            color: theme.palette.text.primary,
          }}
        >
          <Typography variant="h5">Historial</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Listado del historial */}
        <Box sx={{ overflowY: "auto", flex: 1, p: 2 }}>
          {loading ? (
            <Typography sx={{ textAlign: "center", mt: 2 }}>Cargando historial...</Typography>
          ) : history.length === 0 ? (
            <Typography sx={{ textAlign: "center", mt: 2 }}>No hay historial para esta solicitud</Typography>
          ) : (
            history.map((h) => (
              <Box
                key={h._id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  border: "2px solid black",
                  borderRadius: "10px",
                  p: 2,
                  mb: 2,
                  color: theme.palette.text.primary,
                }}
              >
                <InsertDriveFileIcon sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography>{h.description}</Typography>
                  <Typography>
                    Perfil:{" "}
                    {h.profileId && typeof h.profileId === "object"
                      ? `${h.profileId.name ?? "Desconocido"} ${h.profileId.lastname ?? ""}`.trim()
                      : "Desconocido"}
                  </Typography>
                  <Typography>
                    El día {dayjs(h.createdAt).format("DD/MM/YYYY HH:mm")}
                  </Typography>
                </Box>
              </Box>
            ))
          )}
        </Box>
      </Box>
    </Modal>
  );
};
