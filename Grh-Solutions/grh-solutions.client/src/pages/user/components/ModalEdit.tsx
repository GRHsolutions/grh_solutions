import { Box, Typography, Modal, IconButton, TextField, Select, MenuItem, Button, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import GrhTextField from '../../../generics/grh-generics/textField';

const style = {
  position: 'absolute',
  top: '50%',
  left: '78%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  height: '92%',
  bgcolor: 'background.paper',
  borderRadius: '15px',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  overflowY: 'auto' // Agrega scrollbar si el contenido es muy largo
};

interface IModalOptionsProps {
  open: boolean;
  handleClose: () => void;
}

export default function ModalEdit({ open, handleClose }: IModalOptionsProps) {
    const theme = useTheme();
  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box sx={style}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <PersonIcon sx={{ fontSize: 40, color: theme.palette.text.primary }} />
            <Box>
              <Typography variant="h6" fontWeight="bold" color={theme.palette.text.primary}>
                Solicitud de editar información personal.
              </Typography>
              <Typography variant="body2" color={theme.palette.text.primary}>Gerente - Activo</Typography>
            </Box>
          </Box>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography variant="h6" fontWeight="bold" color={theme.palette.text.primary}>
          Campos para editar tus datos
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Select fullWidth defaultValue="pais">
            <MenuItem value="pais">País</MenuItem>
            <MenuItem value="ciudad">Ciudad</MenuItem>
            <MenuItem value="direccion">Dirección</MenuItem>
          </Select>
          <TextField fullWidth defaultValue="Cancún" />
        </Box>
        <Button
          variant="contained"
          sx={{ alignSelf: 'flex-end', backgroundColor: '#90CAF9', color: 'black' }}
          startIcon={<AddCircleOutlineIcon />}
        >
          Agregar Campo
        </Button>
        <Typography variant="body2" sx={{ fontStyle: 'italic', color: theme.palette.text.primary }}>
          Justificación (Esto aparecerá en el correo de notificación)
        </Typography>
        <GrhTextField fullWidth  />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button variant="outlined" startIcon={<CancelIcon />} sx={{ color: theme.palette.text.primary }} onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#90CAF9', color: 'black' }}
            startIcon={<SendIcon />}
          >
            Enviar Solicitud.
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
