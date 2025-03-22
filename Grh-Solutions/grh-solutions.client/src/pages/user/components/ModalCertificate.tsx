import { Box, Typography, Modal, IconButton, TextField, Select, MenuItem, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '90%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '15px',
  display: 'flex',
  flexDirection: 'column',
  gap: 2
};

interface IModalOptionsProps {
  open: boolean;
  handleClose: () => void;
}

export default function ModalCertificate({ open, handleClose }: IModalOptionsProps) {
  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box sx={style}>
        <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 10, right: 10 }}>
          <CloseIcon />
        </IconButton>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <PictureAsPdfIcon sx={{ fontSize: 40 }} />
          <Box>
            <Typography variant="h5" fontWeight="bold">
              Descargar Certificados
            </Typography>
            <Typography variant="body1">Roberto - Gerente</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Box sx={{ flex: 1, mr: 2 }}>
            <Typography variant="body2">Tipo de documento:</Typography>
            <Select fullWidth defaultValue="">
              <MenuItem value="">Seleccione el tipo de documento</MenuItem>
              <MenuItem value="certificado1">Certificado 1</MenuItem>
              <MenuItem value="certificado2">Certificado 2</MenuItem>
            </Select>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2">Búsqueda:</Typography>
            <TextField fullWidth placeholder="Buscar..." />
          </Box>
        </Box>
        <Box
          sx={{
            flex: 1,
            border: '2px solid black',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            mt: 2,
            p: 2
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            DOCUMENTO PDF
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>
            (Previsualización del documento)
          </Typography>
        </Box>
        <Button variant="contained" sx={{ alignSelf: 'flex-end', mt: 2 }} startIcon={<PictureAsPdfIcon />}>
          Descargar PDF
        </Button>
      </Box>
    </Modal>
  );
}
