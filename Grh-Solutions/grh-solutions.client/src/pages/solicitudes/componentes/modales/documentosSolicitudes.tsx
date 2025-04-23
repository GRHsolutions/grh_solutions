import DescriptionIcon from '@mui/icons-material/Description';
import CloseIcon from '@mui/icons-material/Close';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Box, IconButton, Modal, Stack, Typography, useTheme } from "@mui/material";

interface DocumentosSolicitudesProps {
  handleClose: () => void;
}

const styledoc = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "90%",
  height: "80%",
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export const DocumentosSolicitudes = ({ handleClose }: DocumentosSolicitudesProps) => {
  const theme = useTheme();
  const docs = [
    { nombre: "Documento de Ejemplo", tipo: "PDF", peso: "2MB" },
    { nombre: "Documento de Ejemplo 2", tipo: "PDF", peso: "5MB" },
    { nombre: "Documento de Ejemplo 3", tipo: "PDF", peso: "15MB" },
  ];

  return (
    <Modal open={true} onClose={handleClose}>
      <Box sx={{ ...styledoc, bgcolor: theme.palette.background.paper, color: theme.palette.text.primary }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={1} alignItems="center">
            <DescriptionIcon fontSize="large" sx={{ color: theme.palette.primary.contrastText }} />
            <Typography variant="h6" fontWeight="bold">Documento</Typography>
          </Stack>
          <IconButton onClick={handleClose}><CloseIcon /></IconButton>
        </Box>

        <Box display="flex" justifyContent="space-between" gap={2} height="90%" mt={2}>
          <Box width="60%" border="1px solid black" p={1} display="flex" alignItems="center" justifyContent="center">
            <Box width="100%" height="100%" display="flex" flexDirection="column" justifyContent="space-between" border="2px solid black" borderRadius={1} bgcolor="#f0f0f0">
              <Typography align="center" p={1} fontWeight="bold">Previsualización del Documento</Typography>
              <Box height="500px" width="100%" my={2} bgcolor="#e0e0e0" border="1px dashed black" />
              <Typography align="center" fontSize={12} p={1} bgcolor="#d0d0d0" borderTop="1px solid black">Página 1</Typography>
            </Box>
          </Box>

          <Box width="35%" display="flex" flexDirection="column" justifyContent="space-between" gap={1}>
            {docs.map((doc, i) => (
              <Box key={i} border="1px solid black" display="flex" alignItems="center" p={2}>
                <InsertDriveFileIcon sx={{ fontSize: 40, mr: 2 }} />
                <Box display="flex" flexDirection="column" lineHeight={1.3}>
                  <Typography variant="body2"><strong>Nombre:</strong> {doc.nombre}</Typography>
                  <Typography variant="body2"><strong>Tipo:</strong> {doc.tipo}</Typography>
                  <Typography variant="body2"><strong>Peso:</strong> {doc.peso}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
