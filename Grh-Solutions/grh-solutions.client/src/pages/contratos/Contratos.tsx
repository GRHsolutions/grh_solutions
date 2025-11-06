import { useEffect, useState } from "react";
import ContratoTable from "./componentes/contratoTable";
import ContratoFormDrawer from "./componentes/contratoForm";
import ContratoView from "./componentes/contratoView";
import PDFModal from "./componentes/contratoPDFModal"; // <-- Modal PDF
import contratoService from "../../domain/services/contract/contract.service";
import { Contract } from "../../domain/models/contratos/contratos.entities";

import { Box, Button, Typography, Paper } from "@mui/material";

export default function Contrato() {
  const [contratos, setContratos] = useState<Contract[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openPDF, setOpenPDF] = useState(false); // Estado del PDFModal
  const [selectedContrato, setSelectedContrato] = useState<Contract | null>(null);

  const cargarContratos = async () => {
    try {
      const data = await contratoService.getContracts();
      setContratos(data);
    } catch (error) {
      console.error("Error cargando contratos:", error);
    }
  };

  useEffect(() => {
    cargarContratos();
  }, []);

  // Crear contrato
  const handleCrear = () => {
    setSelectedContrato(null);
    setOpenForm(true);
  };

  // Editar contrato
  const handleEditar = (contrato: Contract) => {
    setSelectedContrato(contrato);
    setOpenForm(true);
  };

  // Ver detalles
  const handleVer = (contrato: Contract) => {
    setSelectedContrato(contrato);
    setOpenView(true);
  };

  // Ver PDF
  const handleViewPDF = (contrato: Contract) => {
    setSelectedContrato(contrato);
    setOpenPDF(true);
  };

  // Guardar formulario
  const handleGuardar = async (formData: Partial<Contract>) => {
    try {
      if (selectedContrato) {
        await contratoService.updateContract(selectedContrato._id!, formData);
      } else {
        await contratoService.createContract(formData);
      }

      setOpenForm(false);
      cargarContratos();
    } catch (error) {
      console.error("Error guardando:", error);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
        padding: 4,
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          maxWidth: "1400px",
          padding: 4,
          borderRadius: 2,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {/* TÍTULO Y BOTÓN */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ textAlign: "center", width: "100%", color: "#1976D2" }}
          >
            Gestión de Contratos
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={handleCrear}
            sx={{ borderRadius: 2, whiteSpace: "nowrap", ml: 2 }}
          >
            + Nuevo Contrato
          </Button>
        </Box>

        {/* TABLA */}
        <Box sx={{ width: "100%", overflow: "auto" }}>
          <ContratoTable
            data={contratos}
            onEdit={handleEditar}
            onView={handleVer}
            onViewPDF={handleViewPDF} // <-- Pasamos la función al Table
          />
        </Box>
      </Paper>

      {/* MODAL CREAR / EDITAR */}
      <ContratoFormDrawer
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={handleGuardar}
        initialData={selectedContrato}
      />

      {/* MODAL SOLO LECTURA */}
      <ContratoView
        open={openView}
        onClose={() => setOpenView(false)}
        contrato={selectedContrato}
      />

      {/* MODAL PDF */}
      <PDFModal
        open={openPDF}
        onClose={() => setOpenPDF(false)}
        contrato={selectedContrato} // <-- Pasamos el contrato seleccionado
      />
    </Box>
  );
}
