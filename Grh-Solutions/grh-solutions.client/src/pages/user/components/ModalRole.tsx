import { useState } from 'react';
import {
  Box, Typography, Modal, IconButton, TextField, Select, MenuItem, InputLabel, FormControl, Button, Checkbox, Grid, useTheme,
  Switch
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ModalCreateRol from './ModalCreateRol';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '90%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '15px',
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  overflowY: 'auto',
  border: '2px solid #000',
};

interface IModalRoleProps {
  open: boolean;
  handleClose: () => void;
}

export default function ModalRole({ open, handleClose }: IModalRoleProps) {
  const theme = useTheme();
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedModule, setSelectedModule] = useState('');
  const [search, setSearch] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const roles = ["Empleado - Emp", "Jefe de Área - JA", "Administrador - Admin", "Recursos Humanos - RH"];
  const permissions = [
    "Permiso para ingresar al módulo de empleados.",
    "Permiso para aprobar una vacante.",
    "Permiso para editar información de un empleado.",
    "Permiso para deshabilitar un empleado.",
    "Permiso para rechazar una petición."
  ];
  const [checked, setChecked] = useState([false, true, true, true, false]);

  const handleCheck = (index: number) => {
    setChecked(prev => prev.map((c, i) => (i === index ? !c : c)));
  };
  const handleModal = () => {
    setOpenModal(!openModal);
  }
  return (
    <>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
        <Box sx={style}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" fontWeight="bold">Administración de roles</Typography>
            <IconButton onClick={handleClose}><CloseIcon /></IconButton>
          </Box>
          <Typography variant="body2">Crea roles y administra sus permisos.</Typography>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Roles disponibles</InputLabel>
                <Select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                  <MenuItem value="">Seleccione...</MenuItem>
                  {roles.map((role, index) => (
                    <MenuItem key={index} value={role}>{role}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleModal}>+ Agregar Rol</Button>
            </Grid>
            <Grid item xs={8}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel>Módulo</InputLabel>
                    <Select value={selectedModule} onChange={(e) => setSelectedModule(e.target.value)}>
                      <MenuItem value="">Seleccione...</MenuItem>
                      <MenuItem value="Empleados">Empleados</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth label="Buscar permiso" value={search} onChange={(e) => setSearch(e.target.value)} />
                </Grid>
              </Grid>
              <Box sx={{ mt: 2 }}>
                {permissions.map((permiso, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1, bgcolor: index % 2 === 0 ? '#f5f5f5' : 'transparent' }}>
                    <Typography variant="body2">{permiso}</Typography>
                    <Switch checked={checked[index]} onChange={() => handleCheck(index)} color="secondary" />
                  </Box>
                ))}
              </Box>
              <Grid container justifyContent="center" spacing={1} sx={{ mt: 2 }}>
                <Grid item><Button variant="outlined">&lt;&lt;</Button></Grid>
                <Grid item><Button variant="outlined">1</Button></Grid>
                <Grid item><Button variant="outlined">2</Button></Grid>
                <Grid item><Button variant="outlined">3</Button></Grid>
                <Grid item><Button variant="outlined">...</Button></Grid>
                <Grid item><Button variant="outlined">10</Button></Grid>
                <Grid item><Button variant="outlined">&gt;&gt;</Button></Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <ModalCreateRol open={openModal} handleClose={handleModal} />
    </>
  );
}