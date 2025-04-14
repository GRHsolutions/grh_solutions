import { useState } from "react";
import { Box, Modal, Stack, Typography, useTheme } from "@mui/material";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
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
      onClick={handleOpen}
      sx={{ width: '50%' }}
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
  const handleFileSelect = (files: DragNDropVariables[]) => {
    setSelectedFiles(files);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box display={"flex"} justifyContent={"center"} sx={{ ...style }}>
        <Stack
          direction="row"
          display="flex"
          spacing={1}
          alignItems="center"
          margin={1}
        >

          <Box
            display={"flex"}
            flexDirection={"row"}
            alignItems="center"
            position="absolute"
            top={0}
            left={0}
            p={2}
          >
            <SaveAltIcon
              fontSize="large"
              sx={{
                color: theme.palette.primary.contrastText,
                marginRight: 1,
              }}
            />
            <div>
              <Typography variant="h6" fontWeight={"bold"} mt={0}>
                Crear Solicitud
              </Typography>
              <Typography variant="body1" mt={-1}>
                Crea una Solicitud
              </Typography>
            </div>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"row"}
            alignItems="center"
            position="absolute"
            top={0}
            right={0}
            p={2}
          >
            <CloseIcon
              fontSize="large"
              sx={{ color: "gray", cursor: "pointer" }}
              onClick={handleClose}
            />
          </Box>
        </Stack>
        <Box
          marginTop={5}
          sx={{ paddingLeft: 2 }}
          display={"flex"}
          flexDirection={"row"}
          alignItems="center"
          position="absolute"
          left={0}
          right={0}
          p={2}
        >
          <GrhTextField
            label="Titulo"
            value={text}
            onChange={(e) => {
              setText(e.target.value || "");
            }}
            fullWidth
          />
        </Box>
        <div className="box1">
          <Box>
            <GrhCustomSelect
              label={"Tipo de solicitud"}
              options={optionstype.map(item => ({
                value: item.id,
                name: item.name
              }))}
              value={currentInputSelected}
              onChange={(e) => {
                setCurrentInputSelected(e.target.value as number);
              }}
            />
          </Box>
        </div>
        <div className="box2">
          <Box>
            <MultipleSelect
              label={'Interesados'}
              name={'input'}
              options={options.map(item => ({
                id: item.id,
                nombre: item.name
              }))}
              maxSelections={3}
              value={mult}
              setFieldValue={setFieldValue}
            />
          </Box>
        </div>
        <div className="box3">
          <Box>
            <GrhCustomSelect
              label={"Enviar a..."}
              options={options.map(item => ({
                value: item.id,
                name: item.name
              }))}
              value={newInputSelected}
              onChange={(e) => {
                setNewInputSelected(e.target.value as number);
              }}
            />
          </Box>
        </div>
        <div className="box4">
          <Box>
            <GrhTextField
              label="Correo de seguimiento"
              value={newText}
              onChange={(e) => {
                setNewText(e.target.value || "");
              }}
              fullWidth
            />
          </Box>
        </div>
        <div className="descriptioncreated">
          <Typography variant="h5">Descripcion</Typography>
          <Typography variant="body1" mt={1}>Descripcion mamalona</Typography>
        </div>
          <div className="filescreated">
            <Box>
              <DragDropInput
                acceptedMimeTypes={['image/jpeg', 'image/png', 'image/gif']}
                maxSizeInKB={100}
                onFileSelect={handleFileSelect}
                selectedFiles={selectedFiles}
                maxFiles={1}
              />
            </Box>
          </div>
        <div className="buttonContainerc">
          <button className="btn cancelc" onClick={handleClose}>
            <SaveAltIcon sx={{ fontSize: 15 }} /> Volver
          </button>
          <button className="btnc" onClick={handleClose}>
            <SaveAltIcon sx={{ fontSize: 15 }} /> Guardar
          </button>
        </div>
      </Box>
    </Modal>
  );
};
