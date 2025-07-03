import { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, IconButton, Pagination } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { VacanteData } from "../../../domain/models/vacantes/vacantes.entities";
import { getVacancies } from "../../../domain/services/vacancies/vacancies.service";
import { useAuth } from "../../../hooks/auth";

interface Vacante {
  setSelectOption: React.Dispatch<React.SetStateAction<VacanteData | null>>;
}

export default function VistaVacantes({ setSelectOption }: Vacante) {
  const [page, setPage] = useState(1);
  const [vacantes, setVacantes] = useState<VacanteData[]>([]);
  const { auth } = useAuth();

  useEffect(() => {
    getVacancies(auth.token)
      .then((response) => {
        setVacantes(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener las vacantes:", error);
      });
  }, [page]);
  return (
    <Box sx={{ maxWidth: "85%", margin: "auto", textAlign: "center", mt: 4, height: "100%" }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Vacantes Disponibles
      </Typography>

      <Box
        sx={{
          border: "1px solid #ddd",
          borderRadius: 3,
          overflow: "hidden",
          height: "75%",
          p: 2,
          boxShadow: 1,
        }}
      >
        <Typography variant="subtitle1" sx={{ py: 1, fontSize: "1.1rem", fontWeight: "bold" }}>
          Vacantes
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {vacantes.map((vacante, index) => (
            <Card
              key={index}
              variant="outlined"
              sx={{
                borderRadius: 2,
                transition: "0.2s",
                ":hover": { boxShadow: 3, transform: "scale(1.02)" },
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 2,
                }}
              >
                <Box sx={{ textAlign: "left" }}>
                  <Typography variant="body1" fontWeight="bold" sx={{ fontSize: "1rem" }}>
                    {vacante.tittle}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: "0.9rem" }}> {vacante.salary}</Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ fontSize: "0.85rem" }}>
                    {vacante.type_modality}
                  </Typography>
                </Box>
                <IconButton onClick={() => setSelectOption(vacante)} sx={{ transition: "0.2s", ":hover": { transform: "scale(1.1)" } }}>
                  <CheckCircleOutlineIcon fontSize="large" />
                </IconButton>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
      {/* <Pagination
        count={10}
        page={page}
        onChange={(event, value) => setPage(value)}
        sx={{ mt: 2, display: "flex", justifyContent: "center" }}
      /> */}
    </Box>
  );
}
