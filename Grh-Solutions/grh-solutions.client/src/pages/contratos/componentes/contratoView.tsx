import { FC } from "react";
import { Box, IconButton, Modal, Typography, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";
import { Contract } from "../../../domain/models/contratos/contratos.entities";
import { PDFViewer } from "@react-pdf/renderer";
import ContratoPDF from "./contratoPDF"; // Componente PDF

interface ContratoViewProps {
  open: boolean;
  onClose: () => void;
  contrato: Contract | null;
}

const sideModalStyle = {
  position: "fixed" as const,
  top: 0,
  right: 0,
  width: "40%",
  height: "100%",
  bgcolor: "background.paper",
  boxShadow: "-2px 0px 15px rgba(0, 0, 0, 0.2)",
  display: "flex",
  flexDirection: "column",
  borderRadius: "10px",
};

const ContratoView: FC<ContratoViewProps> = ({ open, onClose, contrato }) => {
  const theme = useTheme();
  if (!contrato) return null;

  const formatDate = (date?: string) => (date ? dayjs(date).format("DD/MM/YYYY") : "No aplica");

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
            borderRadius: "10px 10px 0 0",
            color: theme.palette.text.primary,
          }}
        >
          <Typography variant="h6"><strong>Detalle del Contrato</strong></Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Contenido con scroll */}
        <Box sx={{ overflowY: "auto", flex: 1, p: 2, display: "flex", flexDirection: "column" }}>
          
          {/* Datos generales */}
          <Typography><strong>ID:</strong> {contrato._id}</Typography>
          <Typography><strong>Título:</strong> {contrato.title}</Typography>
          <Typography><strong>Estado:</strong> {contrato.estado}</Typography>
          <Typography><strong>EPS:</strong> {contrato.eps}</Typography>
          <Typography><strong>ARL:</strong> {contrato.arl}</Typography>
          <Typography><strong>Estrato:</strong> {contrato.estrato}</Typography>
          <Typography><strong>Fecha inicio:</strong> {formatDate(contrato.start_date)}</Typography>
          <Typography><strong>Fecha fin:</strong> {formatDate(contrato.end_date)}</Typography>

          {/* Tipo de contrato */}
          <Box mt={2}>
            <Typography variant="subtitle1"><strong>Tipo de Contrato:</strong></Typography>
            <Typography><strong>Nombre:</strong> {contrato.tipo_contrato?.name}</Typography>
            <Typography><strong>Descripción:</strong> {contrato.tipo_contrato?.description}</Typography>
            <Typography><strong>Contenido:</strong></Typography>
            <Typography whiteSpace="pre-line">{contrato.tipo_contrato?.content}</Typography>
          </Box>

          {/* Perfil creador */}
          <Box mt={2}>
            <Typography variant="subtitle1"><strong>Perfil Creador:</strong></Typography>
            <Typography><strong>Nombre:</strong> {contrato.perfil_creador?.name} {contrato.perfil_creador?.lastname}</Typography>
            <Typography><strong>Email:</strong> {contrato.perfil_creador?.email}</Typography>
            <Typography><strong>Teléfono:</strong> {contrato.perfil_creador?.telephone || contrato.perfil_creador?.number_phone}</Typography>
            <Typography><strong>Dirección:</strong> {contrato.perfil_creador?.address}</Typography>
            <Typography><strong>Documento:</strong> {contrato.perfil_creador?.document}</Typography>
            <Typography><strong>Tipo documento:</strong> {contrato.perfil_creador?.type_document}</Typography>
          </Box>

          {/* Perfil empleado */}
          <Box mt={2}>
            <Typography variant="subtitle1"><strong>Perfil Empleado:</strong></Typography>
            <Typography><strong>Nombre:</strong> {contrato.perfil_empleado?.name} {contrato.perfil_empleado?.lastname}</Typography>
            <Typography><strong>Email:</strong> {contrato.perfil_empleado?.email}</Typography>
            <Typography><strong>Teléfono:</strong> {contrato.perfil_empleado?.number_phone || "No disponible"}</Typography>
            <Typography><strong>Dirección:</strong> {contrato.perfil_empleado?.address || "No disponible"}</Typography>
            <Typography><strong>Documento:</strong> {contrato.perfil_empleado?.document}</Typography>
            <Typography><strong>Tipo documento:</strong> {contrato.perfil_empleado?.type_document}</Typography>
          </Box>

          {/* Vacante */}
          {contrato.vacante && (
            <Box mt={2}>
              <Typography variant="subtitle1"><strong>Vacante:</strong></Typography>
              <Typography><strong>Título:</strong> {contrato.vacante.tittle}</Typography>
              <Typography><strong>Descripción:</strong> {contrato.vacante.description}</Typography>
              <Typography><strong>Salario:</strong> {contrato.vacante.salary}</Typography>
              <Typography><strong>Horario:</strong> {contrato.vacante.horary}</Typography>
              <Typography><strong>Dirección:</strong> {contrato.vacante.address}</Typography>
              <Typography><strong>Email:</strong> {contrato.vacante.email}</Typography>
              <Typography><strong>Teléfono:</strong> {contrato.vacante.telephone}</Typography>
              <Typography><strong>Modalidad:</strong> {contrato.vacante.type_modality}</Typography>
              <Typography><strong>Experiencia:</strong> {contrato.vacante.experience}</Typography>
              <Typography><strong>Formación:</strong> {contrato.vacante.formation}</Typography>
            </Box>
          )}

          {/* Firmas */}
          <Box mt={2} display="flex" gap={2} flexWrap="wrap">
            {contrato.firma_empleado && (
              <Box>
                <Typography variant="subtitle2"><strong>Firma Empleado:</strong></Typography>
                <img src={contrato.firma_empleado} alt="Firma Empleado" style={{ maxWidth: "150px" }} />
              </Box>
            )}
            {contrato.firma_empleador && (
              <Box>
                <Typography variant="subtitle2"><strong>Firma Empleador:</strong></Typography>
                <img src={contrato.firma_empleador} alt="Firma Empleador" style={{ maxWidth: "150px" }} />
              </Box>
            )}
          </Box>

          {/* PDF */}
          <Box sx={{ mt: 3, flex: 1, minHeight: 400 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}><strong>Previsualización del PDF</strong></Typography>
            <PDFViewer width="100%" height="100%" style={{ flex: 1 }}>
              <ContratoPDF contrato={contrato} />
            </PDFViewer>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ContratoView;
