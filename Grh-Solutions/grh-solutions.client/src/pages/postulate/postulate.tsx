
import { Box, Grid2, useTheme } from "@mui/material";
import { useParametros } from "../../contexts/useParamether.provider";
import VistaVacantes from "./components/VistaVacantes";
import SelectVacation from "./components/SelectVacation";
import { useState } from "react";
import { VacanteData } from "../../domain/models/vacantes/vacantes.entities";
import { FloatingButton } from "../../generics/floatingButton/floatingButton";
import AddIcon from '@mui/icons-material/Add';
import ModalCreateVacant from "./components/ModalCreateVacant";

export default function Postulate() {
  const [selectOption, setSelectOption] = useState<VacanteData | null>(null);
  const [openModal, setOpenModal] = useState(false);
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
      <FloatingButton
        icon={<AddIcon />}
        onClick={() => {
          setOpenModal(!openModal);
        }}
        label="Crear vacante"
        bgColor={theme.palette.secondary.main}
        positions={{
          bottom: '2.2rem',
          left: '2rem'
        }}
        borderColor={theme.palette.secondary.hover}
      />
      <ModalCreateVacant open={openModal} handleClose={() => setOpenModal(false)} />
    </Box>
  );
}
