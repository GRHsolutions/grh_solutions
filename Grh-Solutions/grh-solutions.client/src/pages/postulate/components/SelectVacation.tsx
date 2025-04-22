import { useState } from "react";
import { Box, Typography, Card, CardContent, Divider, Snackbar, Alert, IconButton } from "@mui/material";
import { VacanteData } from "../../../domain/models/vacantes/vacantes.entities";
import GrhButton from "../../../generics/grh-generics/button";
import { Note, Visibility } from "@mui/icons-material";
import ViewSelectVacante from "./viewSlectVacante";

interface SelectVacationProps {
  selectedVacante: VacanteData | null;
}

export default function SelectVacation({ selectedVacante }: SelectVacationProps) {
  const [openAlert, setOpenAlert] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleApply = () => {
    setOpenAlert(true);
  }

  const handleview = () => {
    setOpenModal(true)
  }

  const handleClose = () => {
    setOpenModal(false);
  };

  // Datos de postulantes (ejemplo)
  const postulantes = [
    { nombre: "Roberto Gómez Bolaños", fechaPostulacion: "2025-04-01" },
    { nombre: "Juan Pérez", fechaPostulacion: "2025-04-02" },
    { nombre: "María López", fechaPostulacion: "2025-04-03" },
  ];

  const handleEdit = () => {
    alert("Editar vacante");
  }

  const handleDelete = () => {
    console.log("Vacante eliminada");
  }

  return (
    <Box sx={{ width: "95%", minHeight: "95vh", display: "flex", alignItems: "center", justifyContent: "center", px: 2 }}>
      {!selectedVacante ? (
        <Box sx={{ textAlign: "center", p: 3, borderRadius: 4, backgroundColor: "#fff3cd", border: "2px solidrgb(235, 198, 143)", boxShadow: 3, maxWidth: "500px" }}>
          <Typography variant="h5" fontWeight="bold" color="#ff5722">⚠ Debes seleccionar una vacante.</Typography>
          <Typography variant="body1" sx={{ mt: 1, color: "#d84315" }}>Selecciona una opción de la lista para ver más detalles y aplicar.</Typography>
        </Box>
      ) : (
        <Card variant="outlined" sx={{ p: 4, borderRadius: 3, boxShadow: 3, width: "85%", maxWidth: "800px", minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "space-between", border: "1px solid" }}>
          <CardContent sx={{ flexGrow: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Note sx={{ mr: 1 }} />
              </Box>
              <Box sx={{ flexGrow: 1, textAlign: "center" }}>
                <Typography variant="h4" fontWeight="bold">{selectedVacante.titulo}</Typography>
              </Box>
              <IconButton onClick={handleview}>
                <Visibility />
              </IconButton>
            </Box>
            <Typography variant="body1" textAlign="center" sx={{ mb: 3 }}>Ver información de la vacante y aplicar postulación.</Typography>
            <Typography variant="h6" fontWeight="bold">Descripción del puesto:</Typography>
            <Typography variant="body1" sx={{ mt: 1, mb: 3 }}>Buscamos un profesional altamente capacitado para desempeñar este rol dentro de nuestra organización...</Typography>
            <Divider sx={{ my: 3 }} />
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
              <Typography variant="body1"><strong>Salario:</strong> {selectedVacante.salario}</Typography>
              <Typography variant="body1"><strong>Modalidad:</strong> {selectedVacante.modalidad}</Typography>
            </Box>
          </CardContent>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, gap: 2 }}>
            <GrhButton label={"Aplicar ahora"} variant='secondary' sx={{ width: '35%' }} onClick={handleApply} />
          </Box>
        </Card>
      )}
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={() => setOpenAlert(false)} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <Alert onClose={() => setOpenAlert(false)} severity="success" sx={{ width: "65%" }}>
          <Typography variant="body1"><strong>Su CV fue enviado correctamente.</strong></Typography>
        </Alert>
      </Snackbar>
      <ViewSelectVacante
        open={openModal}
        handleClose={handleClose}
        postulantes={postulantes}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </Box>
  );
}
