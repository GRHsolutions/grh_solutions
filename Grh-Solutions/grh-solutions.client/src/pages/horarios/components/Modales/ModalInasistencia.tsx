import PersonOffIcon from "@mui/icons-material/PersonOff";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import * as React from "react";
import Pagination from "@mui/material/Pagination";
import { Horarios } from "../../../../domain/models/horarios/Horarios.entities";
import formatearFecha from "../../../../utils/formatearFecha";
import CloseIcon from "@mui/icons-material/Close";

interface InasistenciaDetalle {
  handleClose: () => void;
  current: Horarios | null;
}
const style = {
  position: "absolute",
  top: 0,
  right: 0,
  width: "38%",
  height: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
  "&:focus": {
    outline: "none",
  },
};

export const InasistenciaDetalle = ({
  current,
  handleClose,
}: InasistenciaDetalle) => {
  const theme = useTheme();
  return (
    <Modal open={true} onClose={handleClose}>
      <Box sx={style}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <PersonOffIcon></PersonOffIcon>
          <Box>
            <Typography variant="h6" fontWeight={"bold"} mt={"3"}>
              Listado de inasistencia
            </Typography>
            <Typography variant="body1" mt={"-6"}>
              Listado de reportes
            </Typography>
          </Box>
          <IconButton
            sx={{ display: "flex", justifyContent: "flex-end" }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ m: 5, display: "flex", gap: 2, alignItems: "center" }}>
          <Box
            sx={{
              border: 2,
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography sx={{ m: 0.5 }}>
                Se ha generado una inasistencia
              </Typography>
              <Typography sx={{ m: 0.5 }}>
                creado el {formatearFecha(current?.fechaInicio, true, true)}
              </Typography>
            </Box>
            <Button
              sx={{
                color: "blue",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              ver
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            height: "68vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              border: "2px solid #1976d2",
              borderRadius: 2,
              padding: "8px 16px",
            }}
          >
            <Pagination count={10} color="secondary" />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
