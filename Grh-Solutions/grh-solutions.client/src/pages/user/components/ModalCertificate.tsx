import { Box, Typography, Modal, IconButton, TextField, Select, MenuItem, Button, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import GrhButton from '../../../generics/grh-generics/button';

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
  const theme = useTheme();

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box sx={style}>
        <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 10, right: 10, color: theme.palette.text.primary }}>
          <CloseIcon />
        </IconButton>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <PictureAsPdfIcon sx={{ fontSize: 40, color: theme.palette.text.primary }} />
          <Box>
            <Typography variant="h5" fontWeight="bold" color={theme.palette.text.primary}>
              Descargar Certificados
            </Typography>
            <Typography variant="body1" color={theme.palette.text.primary}>Roberto - Gerente</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Box sx={{ flex: 1, mr: 2 }}>
            <Typography variant="body2" color={theme.palette.text.primary}>Tipo de documento:</Typography>
            <Select fullWidth defaultValue="" sx={{ color: theme.palette.text.primary }}>
              <MenuItem value="">Seleccione el tipo de documento</MenuItem>
              <MenuItem value="certificado1">Certificado 1</MenuItem>
              <MenuItem value="certificado2">Certificado 2</MenuItem>
            </Select>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" color={theme.palette.text.primary}>Búsqueda:</Typography>
            <TextField fullWidth placeholder="Buscar..." sx={{ input: { color: theme.palette.text.primary } }} />
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
            p: 2,
            color: theme.palette.text.primary
          }}
        >
          <Typography variant="h4" fontWeight="bold" color={theme.palette.text.primary}>
            DOCUMENTO PDF
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }} color={theme.palette.text.primary}>
            (Previsualización del documento)
          </Typography>
        </Box>
        <GrhButton
          label={"Descargar PDF"}
          variant='tertiary'
          sx={{
            width: '15%',
            alignSelf: 'flex-end',
             mt: 2
          }}
          id={"descargar-pdf"}
        />
      </Box>
    </Modal>
  );
}
