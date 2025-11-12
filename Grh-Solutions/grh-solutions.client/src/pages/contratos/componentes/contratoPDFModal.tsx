import { FC } from "react";
import { Box, IconButton, Modal, Typography, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { PDFViewer } from "@react-pdf/renderer";
import ContratoPDF from "./contratoPDF";
import { Contract } from "../../../domain/models/contratos/contratos.entities";

interface PDFModalProps {
  open: boolean;
  onClose: () => void;
  contrato: Contract | null;
}

const sideModalStyle = {
  position: "fixed" as const,
  top: 0,
  left: 0,           // izquierda
  width: "50%",      // puedes ajustar el ancho
  height: "100%",
  bgcolor: "background.paper",
  boxShadow: "2px 0px 15px rgba(0, 0, 0, 0.3)",
  display: "flex",
  flexDirection: "column",
  borderRadius: "0 10px 10px 0",
  zIndex: 1300,      // asegurarte que quede arriba
};

const PDFModal: FC<PDFModalProps> = ({ open, onClose, contrato }) => {
  const theme = useTheme();
  if (!contrato) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={sideModalStyle} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
            py: 1,
            borderBottom: "2px solid #ccc",
            bgcolor: "background.paper",
            borderRadius: "0 10px 0 0",
            color: theme.palette.text.primary,
          }}
        >
          <Typography variant="h6"><strong>Previsualización PDF</strong></Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* PDF Viewer */}
        <Box sx={{ flex: 1, p: 2, minHeight: 400 }}>
          <PDFViewer width="100%" height="100%" style={{ border: "1px solid #ccc" }}>
            <ContratoPDF contrato={contrato} />
          </PDFViewer>
        </Box>
      </Box>
    </Modal>
  );
};

export default PDFModal;
