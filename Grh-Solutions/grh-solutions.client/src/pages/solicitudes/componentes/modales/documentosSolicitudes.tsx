import DescriptionIcon from '@mui/icons-material/Description';
import CloseIcon from '@mui/icons-material/Close';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Box, IconButton, Modal, Stack, Typography, useTheme } from "@mui/material";

interface DocumentosSolicitudesProps {
    handleClose : () => void
}

const styledoc = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "90%",
  height: "80%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};


export const DocumentosSolicitudes = ({ handleClose }: DocumentosSolicitudesProps) => {
  const theme = useTheme();
  return (
    <Modal open={true} onClose={handleClose}>
      <Box sx={{ ...styledoc}}>
           <Box
            display={"flex"}
            justifyContent={"space-between"}
           >
            
             <Stack direction="row" display="flex" spacing={1} alignItems="center">
              <DescriptionIcon
                fontSize="large"
                sx={{
                  color: theme.palette.primary.contrastText,
                }}
              />
              <Box display={"flex"} flexDirection={"column"}>
                <Typography variant="h6" fontWeight={"bold"} mt={"3"}>
                 Documento
                </Typography>
              </Box>
            </Stack>
            <IconButton
                onClick={handleClose}
            >
                <CloseIcon />
            </IconButton>
            </Box> 
              <div className="docContent">
                <div className="pdfPreview">
                  <div className="pdfSimulated">
                    <div className="pdfHeader">Previsualización del Documento</div>
                    <div className="pdfPage"></div>
                    <div className="pdfFooter">Página 1</div>
                  </div>
                </div>
                <div className="docInfo">

                  <div className="docText">
                    <div className="docInfoRow">
                      <InsertDriveFileIcon sx={{ fontSize: 40 }} />
                      <div className="docNameType">
                        <label><strong>Nombre:</strong> Documento de Ejemplo</label>
                        <label><strong>Tipo:</strong> PDF</label>
                        <label><strong>Peso:</strong> 2MB</label>
                      </div>
                    </div>
                  </div>

                  <div className="docText">
                    <div className="docInfoRow">
                      <InsertDriveFileIcon sx={{ fontSize: 40 }} />
                      <div className="docNameType">
                        <label><strong>Nombre:</strong> Documento de Ejemplo 2</label>
                        <label><strong>Tipo:</strong> PDF</label>
                        <label><strong>Peso:</strong> 5MB</label>
                      </div>
                    </div>
                  </div>

                  <div className="docText">
                    <div className="docInfoRow">
                      <InsertDriveFileIcon sx={{ fontSize: 40 }} />
                      <div className="docNameType">
                        <label><strong>Nombre:</strong> Documento de Ejemplo 3</label>
                        <label><strong>Tipo:</strong> PDF</label>
                        <label><strong>Peso:</strong> 15MB</label>
                      </div>
                    </div>
                  </div>


                </div>
              </div>
          </Box>
    </Modal>
  );
}