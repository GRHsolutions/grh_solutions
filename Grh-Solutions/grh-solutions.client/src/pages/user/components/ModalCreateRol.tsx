import { Box, Typography, Modal, IconButton, TextField, Button, Switch, FormControlLabel, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  borderRadius: "15px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 3,
  border: '2px solid #000',
};
interface IModalCreateRolProps {
  open: boolean;
  handleClose: () => void;
}

export default function ModalCreateRol({ open, handleClose }: IModalCreateRolProps) {
  const theme = useTheme();
  const [isActive, setIsActive] = useState(false);
  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
      <Box sx={style}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AddCircleOutlineIcon sx={{ fontSize: 30, color: theme.palette.text.primary }} />
            <Box>
              <Typography variant="h6" fontWeight="bold">
                Crear un nuevo Rol.
              </Typography>
              <Typography variant="body2" color={theme.palette.text.secondary}>
                Crea un nuevo rol sin permisos para luego asignarle.
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField label="Nombre" fullWidth variant="standard" />
          <TextField label="Código" fullWidth variant="standard" />
        </Box>
        <TextField label="Descripción" fullWidth multiline rows={3} variant="standard" />
        <FormControlLabel
          control={<Switch checked={isActive} onChange={() => setIsActive(!isActive)} color="secondary" />}
          label="Activo"
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="contained" startIcon={<AddCircleOutlineIcon />} sx={{ backgroundColor: "#90CAF9", color: "black" }}>
            Guardar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
