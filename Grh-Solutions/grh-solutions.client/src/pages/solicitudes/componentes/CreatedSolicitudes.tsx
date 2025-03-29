import { useState } from "react";
import { Box, Modal, Stack, Typography, useTheme } from "@mui/material";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import "../stiles.scss";

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

export default function CreatedSolicitudes() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button onClick={handleOpen} className="button">
        Crear
      </button>
      <CreatedSolicitudesModal handleClose={handleClose} open={open} />
    </div>
  );
}

interface CreatedSolicitudesModalProps {
  handleClose: () => void;
  open: boolean;
}

const CreatedSolicitudesModal = ({ handleClose, open }: CreatedSolicitudesModalProps) => {
  const theme = useTheme();

  return (
    <Modal open={open} onClose={handleClose}>
      <Box display={"flex"} justifyContent={"center"} sx={{ ...style }}>
            <Stack
              direction="row"
              display="flex"
              spacing={1}
              alignItems="center"
              margin={1}
            >
              <SaveAltIcon
                fontSize="large"
                sx={{
                  color: theme.palette.primary.contrastText,
                }}
              />
              <Box display={"flex"} flexDirection={"column"}>
                <Typography variant="h6" fontWeight={"bold"} mt={"3"}>
                  Crear Solicitud
                </Typography>
              </Box>
            </Stack>
          <Typography display="flex">

          </Typography>
          <Typography display="flex">
            Esta acción notificará a los usuarios involucrados en la solicitud.
          </Typography>
          <div className="buttonContainer">
            <button className="btn cancel" onClick={handleClose}>
              <SaveAltIcon sx={{ fontSize: 15 }} /> Cancelar
            </button>
            <button className="btn" onClick={handleClose}>
              <SaveAltIcon sx={{ fontSize: 15 }} /> Aprobar
            </button>
          </div>
      </Box>
    </Modal>
  );
};
