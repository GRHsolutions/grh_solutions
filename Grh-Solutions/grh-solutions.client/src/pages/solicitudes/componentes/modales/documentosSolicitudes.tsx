import DescriptionIcon from '@mui/icons-material/Description';
import CloseIcon from '@mui/icons-material/Close';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Box, IconButton, Modal, Stack, Typography, useTheme } from "@mui/material";
import { Request } from "../../../../domain/models/request/request.entities";
import { Key } from 'react';

interface DocumentosSolicitudesProps {
  handleClose: () => void;
  request: Request | null;
}

const styledoc = {
  position: 'absolute' as const,
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

export const DocumentosSolicitudes = ({ handleClose, request }: DocumentosSolicitudesProps) => {
  const theme = useTheme();
  const files = request?.file || [];

  return (
    <Modal open={!!request} onClose={handleClose}>
      <Box sx={{ ...styledoc, bgcolor: theme.palette.background.paper, color: theme.palette.text.primary }}>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={1} alignItems="center">
            <DescriptionIcon fontSize="large" sx={{ color: theme.palette.primary.contrastText }} />
            <Typography variant="h6" fontWeight="bold">Documentos</Typography>
          </Stack>
          <IconButton onClick={handleClose}><CloseIcon /></IconButton>
        </Box>

        <Box display="flex" gap={2} height="90%" mt={2}>
          <Box
            width="60%"
            border="1px solid black"
            p={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {files.length === 0 ? (
              <Typography>No hay documentos para previsualizar</Typography>
            ) : (
              <Box width="100%" height="100%" display="flex" flexDirection="column" gap={1}>
                {files.map((f: { type: string; base64: string; name: string | number }, i: Key) => {
                  const base64Src = f.base64.startsWith('data:') ? f.base64 : `data:${f.type};base64,${f.base64}`;
                  if (f.type.startsWith("image/")) {
                    return (
                      <img
                        key={i}
                        src={base64Src}
                        alt={String(f.name)}
                        style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", margin: "0 auto" }}
                      />
                    );
                  } else if (f.type === "application/pdf") {
                    return (
                      <iframe
                        key={i}
                        src={base64Src}
                        style={{ width: "100%", height: "100%" }}
                        title={String(f.name)}
                      />
                    );
                  } else {
                    return (
                      <Typography key={i}>
                        Previsualización no disponible para este tipo de archivo
                      </Typography>
                    );
                  }
                })}
              </Box>
            )}
          </Box>

          <Box
            width="35%"
            display="flex"
            flexDirection="column"
            gap={1}
            sx={{ overflowY: 'auto' }}>
            {files.length === 0 ? (
              <Typography>No hay documentos</Typography>
            ) : (
              files.map((f: { name: string | number; type: string; size: number }, i: Key) => (
                <Box key={i} border="1px solid black" display="flex" alignItems="center" p={2}>
                  <InsertDriveFileIcon sx={{ fontSize: 40, mr: 2 }} />
                  <Box display="flex" flexDirection="column" lineHeight={1.3}>
                    <Typography variant="body2"><strong>Nombre:</strong> {String(f.name)}</Typography>
                    <Typography variant="body2"><strong>Tipo:</strong> {f.type}</Typography>
                    <Typography variant="body2"><strong>Tamaño:</strong> {(f.size / 1024).toFixed(2)} KB</Typography>
                  </Box>
                </Box>
              ))
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
