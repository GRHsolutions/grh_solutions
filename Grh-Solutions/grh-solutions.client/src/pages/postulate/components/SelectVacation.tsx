import { useState } from "react";
import { Box, Typography, Card, CardContent, Divider, Snackbar, Alert } from "@mui/material";
import { VacanteData } from "../../../domain/models/vacantes/vacantes.entities";
import GrhButton from "../../../generics/grh-generics/button";

interface SelectVacationProps {
  selectedVacante: VacanteData | null;
}

export default function SelectVacation({ selectedVacante }: SelectVacationProps) {
  const [openAlert, setOpenAlert] = useState(false);

  const handleApply = () => {
    setOpenAlert(true);
  };

  return (
    <Box
      sx={{
        width: "95%",
        minHeight: "95vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      {!selectedVacante ? (
        <Box
          sx={{
            textAlign: "center",
            p: 3,
            borderRadius: 4,
            backgroundColor: "#fff3cd",
            border: "2px solidrgb(235, 198, 143)",
            boxShadow: 3,
            maxWidth: "500px",
          }}
        >
          <Typography variant="h5" fontWeight="bold" color="#ff5722">
            ⚠ Debes seleccionar una vacante.
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, color: "#d84315" }}>
            Selecciona una opción de la lista para ver más detalles y aplicar.
          </Typography>
        </Box>
      ) : (
        <Card
          variant="outlined"
          sx={{
            p: 4,
            borderRadius: 3,
            boxShadow: 3,
            width: "85%",
            maxWidth: "800px",
            minHeight: "80vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: "1px solid",
          }}
        >
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="h4" fontWeight="bold" textAlign="center">
              {selectedVacante.titulo}
            </Typography>
            <Typography variant="body1" textAlign="center" sx={{ mb: 3 }}>
              Ver información de la vacante y aplicar postulación.
            </Typography>

            <Typography variant="h6" fontWeight="bold">Descripción del puesto:</Typography>
            <Typography variant="body1" sx={{ mt: 1, mb: 3 }}>
              Buscamos un profesional altamente capacitado para desempeñar este rol dentro de nuestra organización.
              La persona seleccionada será responsable de cumplir con las tareas asignadas de manera eficiente,
              colaborando con el equipo y contribuyendo al crecimiento de la empresa. Se espera que tenga habilidades
              técnicas y/o experiencia en el área, así como un enfoque proactivo para resolver problemas y mejorar procesos.
            </Typography>

            <Typography variant="h6" fontWeight="bold">Requerimientos:</Typography>
            <Box component="ul" sx={{ mt: 1, mb: 3, pl: 2 }}>
              <Typography component="li" variant="body1">
                Experiencia previa en el área relacionada (mínimo X años).
              </Typography>
              <Typography component="li" variant="body1">
                Conocimientos técnicos y habilidades específicas para el puesto.
              </Typography>
              <Typography component="li" variant="body1">
                Capacidad para trabajar en equipo y comunicarse eficazmente.
              </Typography>
              <Typography component="li" variant="body1">
                Disponibilidad para cumplir con el horario establecido.
              </Typography>
              <Typography component="li" variant="body1">
                Compromiso con la calidad y la mejora continua.
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
              <Typography variant="body1"><strong>Salario:</strong> {selectedVacante.salario}</Typography>
              <Typography variant="body1"><strong>Modalidad:</strong> {selectedVacante.modalidad}</Typography>
            </Box>
          </CardContent>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, gap: 2 }}>
            <GrhButton
              label={"Aplicar ahora"}
              variant='secondary'
              sx={{
                width: '35%'
              }}
              id={"like"}
              onClick={handleApply}
            />
          </Box>
        </Card>
      )}
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={() => setOpenAlert(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={() => setOpenAlert(false)} severity="success" sx={{ width: "65%" }}>
          <Typography variant="body1"><strong>Su CV fue enviado correctamente.</strong></Typography>
          <br />
          En su perfil podrá ver el estado de su aplicación. Atento a su correo.
        </Alert>
      </Snackbar>
    </Box>
  );
}
