import { useState } from "react";
import { Box, Modal, Stack, Typography, useTheme } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import CancelIcon from '@mui/icons-material/Cancel';
import CloseIcon from "@mui/icons-material/Close";
import GrhTextField from '../../../generics/grh-generics/textField';
import GrhCustomSelect from '../../../generics/grh-generics/inputSelect';
import MultipleSelect from '../../../generics/grh-generics/multipleSelect';
import GrhButton from '../../../generics/grh-generics/button';
import { DragDropInput, DragNDropVariables } from '../../../generics/grh-generics/DragNDrop';
import "../stiles.scss";
import React from 'react';

const style = {
  position: "absolute",
  top: 0,
  right: 0,
  width: "45%",
  height: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  overflowY: "auto",
  "&:focus": {
    outline: "none",
  },
};

export default function CreatedSolicitudes() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <GrhButton
        label="Crear"
        variant="principal"
        startIcon={<AddCircleOutlineIcon />}
        onClick={handleOpen}
        sx={{ width: '100%' }}
      />
      <CreatedSolicitudesModal handleClose={handleClose} open={open} />
    </div>
  );
}

interface CreatedSolicitudesModalProps {
  handleClose: () => void;
  open: boolean;
}
const CreatedSolicitudesModal = ({ handleClose, open }: CreatedSolicitudesModalProps) => {
  const theme = useTheme();
  const [text, setText] = useState('');
  const [currentInputSelected, setCurrentInputSelected] = React.useState(0);

  const optionstype = [{
    id: 1,
    name: "credito"
  }, {
    id: 2,
    name: "inversion"
  }, {
    id: 3,
    name: "prestamo"
  }
  ];

  const options = [{
    id: 1,
    name: "Carlos"
  }, {
    id: 2,
    name: "Mariana"
  }, {
    id: 3,
    name: "Alex"
  }, {
    id: 4,
    name: "Jose"
  }, {
    id: 5,
    name: "Juan"
  }
  ];
  const [selectedFiles, setSelectedFiles] = React.useState<DragNDropVariables[]>([]);
  const [mult, setMult] = React.useState<number[]>([]);
  const setFieldValue = (_field: string, value: number[]) => {
    setMult(value);
  };
  const [newInputSelected, setNewInputSelected] = React.useState(0);
  const [newText, setNewText] = React.useState('');
  const [DesText,setdesText] = React.useState('');
  const handleFileSelect = (files: DragNDropVariables[]) => {
    setSelectedFiles(files);
  };

  return (
    <Modal open={open} onClose={handleClose}>
  <Box sx={{ ...style }}>
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
      <Box display="flex" alignItems="center">
        <SaveAltIcon sx={{ color: theme.palette.text.primary, mr: 1 }} />
        <Box>
          <Typography variant="h6" fontWeight="bold" sx={{ color: theme.palette.text.primary, mr: 1 }}>
            Crear Solicitud
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Crea una Solicitud
          </Typography>
        </Box>
      </Box>
      <CloseIcon sx={{ cursor: "pointer", color: "gray" }} onClick={handleClose} />
    </Box>
    <Stack spacing={2}>
      <GrhTextField label="Titulo" value={text} onChange={(e) => setText(e.target.value || "")} fullWidth />

      <GrhCustomSelect
        label="Tipo de solicitud"
        options={optionstype.map(item => ({ value: item.id, name: item.name }))}
        value={currentInputSelected}
        onChange={(e) => setCurrentInputSelected(e.target.value as number)}
      />

      <MultipleSelect
        label="Interesados"
        name="input"
        options={options.map(item => ({ id: item.id, nombre: item.name }))}
        maxSelections={3}
        value={mult}
        setFieldValue={setFieldValue}
      />

      <GrhCustomSelect
        label="Enviar a..."
        options={options.map(item => ({ value: item.id, name: item.name }))}
        value={newInputSelected}
        onChange={(e) => setNewInputSelected(e.target.value as number)}
      />

      <GrhTextField
        label="Correo de seguimiento"
        value={newText}
        onChange={(e) => setNewText(e.target.value || "")}
        fullWidth
      />

      <GrhTextField
        label="Descripcion"
        value={DesText}
        onChange={(e) => setdesText(e.target.value || "")}
        fullWidth
      />

      <DragDropInput
        acceptedMimeTypes={['image/jpeg', 'image/png', 'image/gif']}
        maxSizeInKB={100}
        onFileSelect={handleFileSelect}
        selectedFiles={selectedFiles}
        maxFiles={1}
      />

      <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
        <GrhButton label="Cancelar" variant="secondary" startIcon={<CancelIcon />} onClick={handleClose} />
        <GrhButton label="Guardar" variant="principal" startIcon={<SaveAltIcon />} onClick={handleClose} />
      </Stack>
    </Stack>
  </Box>
</Modal>

  );
};
