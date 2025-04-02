import { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { useParametros } from "../../contexts/useParamether.provider";
import ResumeAccordion from "./Components/FormHv";
import PreviewHv from "./Components/PreviewHv";

export default function HojaVidaPage() {
  const { parametros } = useParametros();
  const theme = useTheme();
  const { usePhoneScreen } = parametros;

  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState<Record<string, string>>({});

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        height: "100%",
        width: "100%",
        fontSize: "1rem",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "80vw",
          height: "100%",
          border: "3px solid " + theme.palette.primary.boxShadow,
        }}
      >
        {/* Formulario */}
        <div
          style={{
            width: "50%",
            backgroundColor: theme.palette.primary.light,
            boxShadow: theme.palette.primary.boxShadow,
            height: "100%",
            overflowY: "hidden",
          }}
        >
          <ResumeAccordion onChange={setFormData} formData={formData} />
        </div>

        {/* Vista Previa */}
        {!usePhoneScreen && (
          <div
            style={{
              width: "50%",
              backgroundColor: theme.palette.primary.light,
              boxShadow: theme.palette.primary.boxShadow,
              height: "100%",
            }}
          >
            <PreviewHv data={formData} />
          </div>
        )}
      </div>
    </Box>
  );
}
