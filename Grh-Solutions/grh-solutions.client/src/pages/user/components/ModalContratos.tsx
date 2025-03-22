import { useState } from 'react';
import {
  Box, Typography, Modal, IconButton, TextField, Select, MenuItem, InputLabel, FormControl, Button, Grid
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  height: '92%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '15px',
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  overflowY: 'auto'
};

interface IModalOptionsProps {
  open: boolean;
  handleClose: () => void;
}

export default function ModalContratos({ open, handleClose }: IModalOptionsProps) {
  const [tipoContrato, setTipoContrato] = useState('');
  const [busqueda, setBusqueda] = useState('');

  const contratos = [
    {
      titulo: "Contrato laboral a termino indefinido del contratado a Disolin",
      firma: "01/02/2024",
      finalizacion: "INDEFINIDO",
      categoria: "Laboral",
      tipo: "Termino Indefinido",
      involucrados: ["Carmen Diaz - Director", "Jack Mendez - Recursos", "Roberto Gomez - Gerente"]
    },
    {
      titulo: "Contrato eventual por interinidad a Jose Martines.",
      firma: "01/02/2023",
      finalizacion: "01/04/2023"
    },
    {
      titulo: "Contrato de colaboración por prestación de servicios a Fabulous Software.",
      firma: "01/05/2023",
      finalizacion: "01/08/2025"
    },
    {
      titulo: "Contrato de beneficios por confidencialidad con Jose Martines.",
      firma: "01/05/2023",
      finalizacion: "INDEFINIDO"
    }
  ];

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box sx={style}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight="bold">Lista de contratos donde usted está vinculado.</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Roberto - Gerente</Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <FormControl fullWidth sx={{ flex: 1 }}>
            <InputLabel>Tipo de contrato</InputLabel>
            <Select value={tipoContrato} onChange={(e) => setTipoContrato(e.target.value)}>
              <MenuItem value="">Seleccione...</MenuItem>
              <MenuItem value="laboral">Laboral</MenuItem>
              <MenuItem value="prestacion">Prestación de Servicios</MenuItem>
            </Select>
          </FormControl>
          <TextField fullWidth sx={{ flex: 2 }} label="Búsqueda" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
          <TextField fullWidth sx={{ flex: 1 }} label="Fecha de Firma de contrato" type="date" InputLabelProps={{ shrink: true }} />
          <TextField fullWidth sx={{ flex: 1 }} label="Fecha de Finalización del contrato" type="date" InputLabelProps={{ shrink: true }} />
        </Box>
        {contratos.map((contrato, index) => (
          <Box key={index} sx={{ p: 2, border: '1px solid #ccc', borderRadius: '10px', mb: 2 }}>
            <Typography variant="h6">{contrato.titulo}</Typography>
            <Typography variant="body2">Fecha de Firma: {contrato.firma} | Fecha de Finalización: {contrato.finalizacion}</Typography>
            {contrato.categoria && (
              <Typography variant="body2">Categoría: {contrato.categoria} | Tipo: {contrato.tipo}</Typography>
            )}
            {contrato.involucrados && (
              <Box sx={{ mt: 1, p: 1, bgcolor: "#f5f5f5", borderRadius: '5px' }}>
                <Typography variant="body2" fontWeight="bold">Involucrados:</Typography>
                {contrato.involucrados.map((persona, i) => (
                  <Typography key={i} variant="body2">{persona}</Typography>
                ))}
              </Box>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
              <Button sx={{ color: 'blue' }}>Descargar Contrato</Button>
            </Box>
          </Box>
        ))}

        <Grid container justifyContent="center" alignItems="center" spacing={1}>
          <Grid item><Button variant="contained">{"<<"}</Button></Grid>
          <Grid item><Button variant="contained">1</Button></Grid>
          <Grid item><Button variant="contained">2</Button></Grid>
          <Grid item><Button variant="contained">3</Button></Grid>
          <Grid item><Button variant="contained">{"..."}</Button></Grid>
          <Grid item><Button variant="contained">10</Button></Grid>
          <Grid item><Button variant="contained">{">>"}</Button></Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
