import { Box, Modal, Typography, useTheme } from '@mui/material';
import GrhButton from '../../../generics/grh-generics/button';
import { Profile } from '../../../domain/models/profile/profile.entities';
import html2pdf from 'html2pdf.js';
import { useRef } from 'react';
import { generateLaborCertificateHTML } from './GenerateCertificate';
import { IOption } from '../../../domain/interfaces/common.interface';

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
  gap: 2,
  overflowY: 'auto'
};

interface IModalOptionsProps {
  open: boolean;
  handleClose: () => void;
  profile: Partial<Profile>;
  documentType: IOption[];
}

export default function ModalCertificate({ open, handleClose, profile, documentType }: IModalOptionsProps) {
  const theme = useTheme();
  const certificateRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = () => {
    const element = certificateRef.current;
    if (!element) return;

    html2pdf()
      .set({
        margin: 1,
        filename: `certificado_laboral_${profile.name || 'usuario'}.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      })
      .from(element)
      .save();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ ...style, bgcolor: theme.palette.background.default }}>
        <Typography variant="h5" sx={{ textAlign: "center", fontWeight: "bold", color: theme.palette.text.primary }}>
          Certificado laboral
        </Typography>

        <Box
          ref={certificateRef}
          sx={{
            flex: 1,
            border: `1px solid ${theme.palette.divider}`,
            mt: 2,
            p: 4,
            bgcolor: "#ffffff", // Blanco forzado solo para impresión PDF
            color: "#000000", // Negro para texto en PDF
            borderRadius: 2,
            fontFamily: 'Arial, sans-serif'
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: generateLaborCertificateHTML(profile, documentType) }} />
        </Box>

        <GrhButton
          label="Descargar PDF"
          variant="tertiary"
          onClick={handleDownloadPDF}
          sx={{
            width: '20%',
            alignSelf: 'flex-end',
            mt: 2
          }}
          id="descargar-pdf"
        />
      </Box>
    </Modal>
  );
}
