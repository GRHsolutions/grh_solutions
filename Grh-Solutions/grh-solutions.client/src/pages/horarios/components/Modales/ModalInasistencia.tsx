import PersonOffIcon from '@mui/icons-material/PersonOff';
import {
  Box,
  IconButton,
  Modal,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

interface InasistenciaDetalle {
  handleClose: () => void;
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

export const InasistenciaDetalle = ({ handleClose }: InasistenciaDetalle) => {
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
        </Box>
        <Box sx={{ mt: 2, display: "flex", gap: 2, alignItems: "center" }}>
            <Typography 
            sx={{
              border:2,
              width: "90%",
              textAlign: "center"
            }} >
              Se ha generado una inasistencia
            </Typography>
          </Box>
      </Box>
    </Modal>
  );
};
