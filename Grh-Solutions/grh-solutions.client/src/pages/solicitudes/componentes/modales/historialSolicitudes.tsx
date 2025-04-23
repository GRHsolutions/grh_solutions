import CloseIcon from "@mui/icons-material/Close";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { Box, IconButton, Modal, Typography, useTheme } from "@mui/material";

interface HistorialSolicitudesProps {
  handleClose: () => void;
}

const stylehis = {
  position: "fixed",
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

export const HistorialSolicitudes = ({ handleClose }: HistorialSolicitudesProps) => {
  const theme = useTheme();

  return (
    <Modal open={true} onClose={handleClose}>
      <Box sx={stylehis} onClick={(e) => e.stopPropagation()}>
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

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            border: "2px solid black",
            borderRadius: "10px",
            p: 2,
            m: 3,
            color: theme.palette.text.primary,
          }}
        >
          <InsertDriveFileIcon sx={{ fontSize: 40, mr: 2 }} />
          <Box>
            <Typography>Se ha creado la solicitud</Typography>
            <Typography>Por: Carlos Mario</Typography>
            <Typography>El día 28/12/2025</Typography>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
