import { useState } from "react";
import { Box, Typography, Card, CardContent, Divider, Snackbar, Alert, IconButton } from "@mui/material";
import { VacanteData } from "../../../domain/models/vacantes/vacantes.entities";
import GrhButton from "../../../generics/grh-generics/button";
import { Note, Visibility } from "@mui/icons-material";
import ViewSelectVacante from "./viewSlectVacante";
import { useAuth } from "../../../hooks/auth";
import { CreatePostulante } from "../../../domain/services/postulante/postulante.service";
import { Charge } from "../../../domain/models/charge/charge.entities";
import { Area } from "../../../domain/models/area/area.entities";

interface SelectVacationProps {
  selectedVacante: VacanteData | null;
  charges: Charge[]
  areas: Area[]
  setReload?: React.Dispatch<React.SetStateAction<boolean>>;
  reload?: boolean;
}

export default function SelectVacation({ selectedVacante, charges, areas, setReload, reload }: SelectVacationProps) {
  const [openAlert, setOpenAlert] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { auth } = useAuth();
  const handleApply = () => {
    CreatePostulante(selectedVacante?._id, "pendiente", auth.token)
      .then(() => {
        setOpenAlert(true);
        if (setReload) setReload(prev => !prev);
      })
      .catch((err) => {
        console.error("Error al postularse:", err);
      });
  };

  const handleview = () => {
    setOpenModal(true)
  }

  const handleClose = () => {
    setOpenModal(false);
  };


  return (
    <Box sx={{ width: "95%", minHeight: "95vh", display: "flex", alignItems: "center", justifyContent: "center", px: 2 }}>
      {!selectedVacante ? (
        <Box sx={{ textAlign: "center", p: 3, borderRadius: 4, backgroundColor: "#fff3cd", border: "2px solidrgb(235, 198, 143)", boxShadow: 3, maxWidth: "500px" }}>
          <Typography variant="h5" fontWeight="bold" color="#ff5722">⚠ Debes seleccionar una vacante.</Typography>
          <Typography variant="body1" sx={{ mt: 1, color: "#d84315" }}>Selecciona una opción de la lista para ver más detalles y aplicar.</Typography>
        </Box>
      ) : (
        <Card variant="outlined" sx={{
          p: 4,
          borderRadius: 3,
          boxShadow: 3,
          width: "85%",
          maxWidth: "800px",
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          border: "1px solid"
        }}>
          <CardContent sx={{ flexGrow: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Note sx={{ mr: 1 }} />
              </Box>
              <Box sx={{ flexGrow: 1, textAlign: "center" }}>
                <Typography variant="h4" fontWeight="bold">{selectedVacante.tittle}</Typography>
              </Box>
              <IconButton onClick={handleview}><Visibility /></IconButton>
            </Box>

            <Typography variant="body1" textAlign="center" sx={{ mb: 3 }}>
              Ver información de la vacante y aplicar postulación.
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>📋 Descripción del puesto:</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>{selectedVacante.description}</Typography>

            <Typography variant="h6" fontWeight="bold">📌 Detalles:</Typography>
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, mt: 1 }}>
              <Typography><strong>Modalidad:</strong> {selectedVacante.type_modality}</Typography>
              <Typography><strong>Tipo de contrato:</strong> {selectedVacante.type_contract}</Typography>
              <Typography><strong>Salario:</strong> {selectedVacante.salary}</Typography>
              <Typography><strong>Horario:</strong> {selectedVacante.horary}</Typography>
              <Typography><strong>Cargo:</strong> {selectedVacante.charge?.name}</Typography>
              <Typography><strong>Dirección:</strong> {selectedVacante.address}</Typography>
              <Typography><strong>Teléfono:</strong> {selectedVacante.telephone}</Typography>
              <Typography><strong>Correo:</strong> {selectedVacante.email}</Typography>
              <Typography><strong>Experiencia requerida:</strong> {selectedVacante.experience}</Typography>
              <Typography><strong>Formación:</strong> {selectedVacante.formation}</Typography>
              <Typography><strong>Estado:</strong> {selectedVacante.status}</Typography>
              <Typography><strong>Area:</strong> {selectedVacante.area?.name}</Typography>
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
        vacantData={selectedVacante}
        areas={areas}
        charges={charges}
        setReload={setReload}
        reload={reload}
      />
    </Box>
  );
}
