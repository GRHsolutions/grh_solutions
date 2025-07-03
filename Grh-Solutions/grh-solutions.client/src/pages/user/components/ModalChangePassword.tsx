import { Box, Typography, Modal, IconButton, TextField, Button, useTheme, InputLabel } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import GrhButton from "../../../generics/grh-generics/button";
import EditIcon from "@mui/icons-material/Edit"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  bgcolor: "background.paper",
  borderRadius: '15px',
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 2,
  border: '2px solid #000',
};

interface IModalChangePasswordProps {
  open: boolean;
  handleClose: () => void;
}

export default function ModalChangePassword({ open, handleClose }: IModalChangePasswordProps) {
  const theme = useTheme();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
      <Box sx={style}>
        <Typography variant="h5" sx={{ textAlign: "center", fontWeight: "bold", color: theme.palette.text.primary }}>
          Cambiar contraseña
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "flex-end", position: "absolute", top: 16, right: 16 }}>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box>
          <InputLabel sx={{ mb: 0.5 }}>Contraseña anterior</InputLabel>
          <TextField
            type="password"
            fullWidth
            variant="outlined"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </Box>

        <Box>
          <InputLabel sx={{ mb: 0.5 }}>Digite su nueva contraseña</InputLabel>
          <TextField
            type="password"
            fullWidth
            variant="outlined"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Box>

        <Box>
          <InputLabel sx={{ mb: 0.5 }}>Confirmar contraseña</InputLabel>
          <TextField
            type="password"
            fullWidth
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, gap: 2 }}>
          <GrhButton
            startIcon={<EditIcon  />}
            label={"Editar"}
            variant='principal'
            sx={{
              width: '30%'
            }}
            id={"like"}
          />
        </Box>
      </Box>
    </Modal>
  );
}
