import { useTheme } from "@emotion/react";
import { Box, Button, Modal, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface ModalUsuariosProps {
    open: boolean;
    handleClose: () => void;
  }

  export const ModalUsuarios = ({ open, handleClose }: ModalUsuariosProps) => {
  const theme = useTheme();
  return(
<Modal open={open} onClose={handleClose}>
  <Box sx={style}>
    <Typography>¿Estás seguro de que quieres eliminar?</Typography>
    <Button onClick={handleClose}>Cerrar</Button>
  </Box>
</Modal>
  )
};
