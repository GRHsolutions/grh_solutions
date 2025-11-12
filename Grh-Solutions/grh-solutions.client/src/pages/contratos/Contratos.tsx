import { useEffect, useState } from "react";
import ContratoTable from "./componentes/contratoTable";
import ContratoFormDrawer from "./componentes/contratoForm";
import ContratoView from "./componentes/contratoView";
import PDFModal from "./componentes/contratoPDFModal";
import contratoService from "../../domain/services/contract/contract.service";
import { Contract } from "../../domain/models/contratos/contratos.entities";

import { Box, Button, Typography, Paper } from "@mui/material";
import { useSnackbar } from "notistack";

export default function Contrato() {
  const { enqueueSnackbar } = useSnackbar();

  const [contratos, setContratos] = useState<Contract[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openPDF, setOpenPDF] = useState(false);
  const [selectedContrato, setSelectedContrato] = useState<Contract | null>(
    null
  );

  const [listaEmpleados, setListaEmpleados] = useState<any[]>([]);
  const [listaTipos, setListaTipos] = useState<any[]>([]);
  const [listaVacantes, setListaVacantes] = useState<any[]>([]);

  const cargarContratos = async () => {
    try {
      const data = await contratoService.getContracts();
      setContratos(data);
    } catch (error) {
      enqueueSnackbar("Error cargando contratos", { variant: "error" });
      console.error(error);
    }
  };

  const cargarListas = async () => {
    try {
      const perfil = await contratoService.getLoggedProfile();
      const empleados = await contratoService.getEmployees();
      const tipos = await contratoService.getContractTypes();
      const vacantes = await contratoService.getVacants();

      setListaEmpleados([perfil, ...empleados]);
      setListaTipos(tipos);
      setListaVacantes(vacantes);
    } catch (error) {
      enqueueSnackbar("Error cargando datos de formularios", {
        variant: "error",
      });
      console.error(error);
    }
  };

  useEffect(() => {
    cargarContratos();
    cargarListas();
  }, []);

  const handleCrear = () => {
    setSelectedContrato(null);
    setOpenForm(true);
  };

  const handleEditar = (contrato: Contract) => {
    setSelectedContrato(contrato);
    setOpenForm(true);
  };

  const handleVer = (contrato: Contract) => {
    setSelectedContrato(contrato);
    setOpenView(true);
  };

  const handleViewPDF = (contrato: Contract) => {
    setSelectedContrato(contrato);
    setOpenPDF(true);
  };

  // Funciones que el formulario llama según si hay selectedContrato
  const handleCrearContrato = async (payload: Partial<Contract>) => {
    try {
      await contratoService.createContract(payload);
      enqueueSnackbar("Contrato creado correctamente", {
        variant: "success",
      });
      setOpenForm(false);
      cargarContratos();
      return true;
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Error creando contrato", { variant: "error" });
      return false;
    }
  };

  const handleActualizarContrato = async (payload: Partial<Contract>) => {
    try {
      if (!selectedContrato?._id) {
        enqueueSnackbar("ID del contrato no encontrado", {
          variant: "error",
        });
        return false;
      }

      await contratoService.updateContract(selectedContrato._id, payload);
      enqueueSnackbar("Contrato actualizado correctamente", {
        variant: "success",
      });
      setOpenForm(false);
      cargarContratos();
      return true;
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Error actualizando contrato", { variant: "error" });
      return false;
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
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" fontWeight="bold" sx={{ color: "#1976D2" }}>
            Gestión de Contratos
          </Typography>

          <Button variant="contained" color="primary" onClick={handleCrear}>
            + Nuevo Contrato
          </Button>
        </Box>

        <ContratoTable
          data={contratos}
          onEdit={handleEditar}
          onView={handleVer}
          onViewPDF={handleViewPDF}
        />
      </Paper>

      <ContratoFormDrawer
        open={openForm}
        onClose={() => setOpenForm(false)}
        onCreate={handleCrearContrato} // ← Prop separada
        onUpdate={handleActualizarContrato} // ← Prop separada
        initialData={selectedContrato}
        empleados={listaEmpleados}
        tiposContratos={listaTipos}
        vacantes={listaVacantes}
        estratoList={[1, 2, 3, 4, 5, 6]}
      />

      <ContratoView
        open={openView}
        onClose={() => setOpenView(false)}
        contrato={selectedContrato}
      />

      <PDFModal
        open={openPDF}
        onClose={() => setOpenPDF(false)}
        contrato={selectedContrato}
      />
    </Box>
  );
}
