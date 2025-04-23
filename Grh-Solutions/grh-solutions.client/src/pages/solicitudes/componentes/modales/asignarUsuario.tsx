import { Box, Modal, Divider, useTheme, Typography } from "@mui/material";
import MultipleSelect from "../../../../generics/grh-generics/multipleSelect";
import GrhButton from '../../../../generics/grh-generics/button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import React from "react";

interface AsignarUsuarioProps {
    handleClose : () => void
}

const options = [
  { id: 1, name: "Mario" },
  { id: 2, name: "Migel" },
  { id: 3, name: "Jose" },
  { id: 4, name: "Alguien" },
  { id: 5, name: "Juan" }
];

const styleasig = {
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  top: '50%',
  left: '50%',
  width: '50%',
};

export const AsignarUsuario = ({ handleClose }: AsignarUsuarioProps) => {
  const [mult, setMult] = React.useState<number[]>([]);
  const theme = useTheme();

  const setFieldValue = (_field: string, value: number[]) => {
    setMult(value);
  };

  return (
    <Modal open={true} onClose={handleClose}>
      <Box sx={{ ...styleasig }}>
        <Box
          onClick={(e) => e.stopPropagation()}
          sx={{
            backgroundColor: theme.palette.background.paper,
            borderRadius: 2,
            padding: 4,
            boxShadow: 3,
            color: theme.palette.text.primary,
          }}
        >
          <Typography
            variant="h6"
            sx={{ mb: 2, fontWeight: 'bold' }}
          >
            Busque al usuario al que va a asignar la solicitud
          </Typography>

          <Box sx={{ fontSize: 16, textAlign: 'left', color: theme.palette.text.primary, pb: 2 }}>
            <MultipleSelect
              label={'Lista de Usuarios'}
              name={'input'}
              options={options.map(item => ({
                id: item.id,
                nombre: item.name
              }))}
              value={mult}
              setFieldValue={setFieldValue}
            />
            <Divider sx={{ my: 2, backgroundColor: theme.palette.divider, height: 2 }} />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <GrhButton
              label="Cancelar"
              variant="secondary"
              startIcon={<ArrowBackIcon />}
              onClick={handleClose}
              sx={{
                width: '20%'
              }}
            />
            <GrhButton
              label="Guardar"
              variant="principal"
              startIcon={<SendIcon />}
              onClick={handleClose}
              sx={{
                width: '20%'
              }}
            />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
