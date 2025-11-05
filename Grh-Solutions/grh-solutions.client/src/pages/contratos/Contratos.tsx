import React from "react";
import { Box, Modal, Typography } from "@mui/material";
import { ContratosProvider } from "../../contexts/contratos.provider";
import GrhButton from "../../generics/grh-generics/button";
import { CreateEditContract } from "./form/createEditContract";
import { ListContrato } from "./list/list";
import AddIcon from "@mui/icons-material/Add";

interface ContratoProps {}

const Contratos: React.FC = ({}: ContratoProps) => {
  const [modal, setModal] = React.useState(false);

  return (
    <ContratosProvider>
      <Box
        sx={{
          flexDirection: "column",
          gap: "30px",
          display: "flex",
          padding: 3,
          justifyContent: "start",
          alignItems: "start",
          height: "100%",
          width: "100%",
          fontSize: "2rem",
        }}
      >
        <Typography variant={"h6"}>
          Bienvenidos al portal de Contratos
        </Typography>
        <GrhButton
          id="create"
          name="create"
          label="Crear contrato"
          variant="principal"
          startIcon={<AddIcon />}
          onClick={() => {
            setModal(true);
          }}
        />
        <ListContrato />
        <CreateEditContract
          open={modal}
          onClose={() => {
            setModal(false);
          }}
          contrato={undefined}
          onSubmit={() => {
            console.log("JAJAJAJAJ");
          }}
        />
      </Box>
    </ContratosProvider>
  );
};

export default Contratos;
