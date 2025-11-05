import { Modal, Box, Typography, Button, useTheme } from "@mui/material";

interface IModalDeleteProps {
  open: boolean;
  handleClose: () => void;
  handleDelete: () => void;
}

export default function ModalDeleteVacante({ open, handleClose, handleDelete }: IModalDeleteProps) {
  const theme = useTheme();

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '40%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius: '15px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2
      }}>
        <Typography variant="h6" fontWeight="bold" color={theme.palette.text.primary}>
          ¿Estás seguro de eliminar esta vacante?
        </Typography>

        <Typography variant="body1" color={theme.palette.text.secondary} sx={{ textAlign: 'center' }}>
          Esta acción no se puede deshacer. ¿Quieres continuar con la eliminación de esta vacante?
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%', mt: 2 }}>
          <Button
            onClick={handleClose}
            color="secondary"
            variant="outlined"
            sx={{ width: '45%' }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            sx={{ width: '45%' }}
          >
            Eliminar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
