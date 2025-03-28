
import { Box, Grid2,  useTheme } from "@mui/material";
import { useParametros } from "../../contexts/useParamether.provider";
import VistaVacantes from "./components/VistaVacantes";
import SelectVacation from "./components/SelectVacation";
import { useState } from "react";
import { VacanteData } from "../../domain/models/vacantes/vacantes.entities";

export default function Postulate() {
  const [selectOption, setSelectOption] = useState<VacanteData | null>(null);
  const { parametros } = useParametros();
  const theme = useTheme();
  const { usePhoneScreen } = parametros;

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
      <Grid2
        container
        width={"80vw"}
        height={"100%"}
        sx={{
          border: "3px solid black",
        }}
      >
        <Grid2
          size={5}
          sx={{
            boxShadow: `${theme.palette.primary.boxShadow}`,
            backgroundColor: `${theme.palette.primary.light}`,
            height: "100%",
            overflowY: "hidden",
          }}
        >
          <VistaVacantes setSelectOption={setSelectOption} />
        </Grid2>
        {!usePhoneScreen && (
          <Grid2
            size={{ sm: 7 }}
            sx={{
              boxShadow: `${theme.palette.primary.boxShadow}`,
              backgroundColor: `${theme.palette.primary.light}`,
              height: "100%",
            }}
          >
            <SelectVacation selectedVacante={selectOption} />
          </Grid2>
        )}
      </Grid2>
    </Box>
  );
}
