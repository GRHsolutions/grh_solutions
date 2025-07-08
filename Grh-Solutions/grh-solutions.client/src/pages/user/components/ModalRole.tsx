import { useEffect, useState } from 'react';
import {
  Box, Typography, Modal, IconButton, TextField, Select, MenuItem, InputLabel, FormControl,
  Button, Grid, useTheme, Switch, CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ModalCreateRol from './ModalCreateRol';
import { CreateRolDto, UpdateRolDto } from '../../../domain/models/role/role.entities';
import { getRoles, updateRol } from '../../../domain/services/Roles/Roles.service';
import { getPermissions } from '../../../domain/services/Permissions/Permissions.service';
import { useAuth } from '../../../hooks/auth';


interface IModalRoleProps {
  open: boolean;
  handleClose: () => void;
}

export default function ModalRole({ open, handleClose }: IModalRoleProps) {
  const theme = useTheme();
  const [roles, setRoles] = useState<CreateRolDto[]>([]);
  const [selectedRoleId, setSelectedRoleId] = useState('');
  const [permissions, setPermissions] = useState<{ _id: string, description: string }[]>([]);
  const [assignedPermissions, setAssignedPermissions] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { auth } = useAuth();

  useEffect(() => {
    const name = ""
    getRoles(name, auth.token).then(res => setRoles(res.data));
    getPermissions(auth.token).then(res => {
      const maybeArray = Array.isArray(res.data) ? res.data : [];
      setPermissions(maybeArray);
    });
  }, []);

  useEffect(() => {
    const selectedRole = roles.find(role => role._id === selectedRoleId);
    setAssignedPermissions(selectedRole?.permissions || []);
  }, [selectedRoleId, roles]);

  const handlePermissionToggle = (permId: string) => {
    setAssignedPermissions(prev =>
      prev.includes(permId)
        ? prev.filter(id => id !== permId)
        : [...prev, permId]
    );
  };

  const handleSave = async () => {
    const currentRole = roles.find(r => r._id === selectedRoleId);
    if (!currentRole) return;

    const originalPermissions = currentRole.permissions;
    const addPermissions = assignedPermissions.filter(p => !originalPermissions.includes(p));
    const removePermissions = originalPermissions.filter(p => !assignedPermissions.includes(p));

    const payload: UpdateRolDto = {
      name: currentRole.name,
      isActive: currentRole.isActive,
      addPermissions,
      removePermissions
    };

    setIsSaving(true);
    try {
      await updateRol(currentRole._id, payload, token);
      alert("Permisos actualizados con éxito");
    } catch (error) {
      console.error("Error al actualizar el rol", error);
    } finally {
      setIsSaving(false);
    }
  };

  const filteredPermissions = permissions.filter(p =>
    p.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)', width: '80%', height: '90%',
          bgcolor: 'background.paper', boxShadow: 24, p: 4,
          borderRadius: '15px', display: 'flex', flexDirection: 'column',
          gap: 2, overflowY: 'auto', border: '2px solid #000',
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" fontWeight="bold" sx={{ color: theme.palette.primary.contrastText }}>Administración de roles</Typography>
            <IconButton onClick={handleClose}><CloseIcon /></IconButton>
          </Box>
          <Typography variant="body2">Crea roles y administra sus permisos.</Typography>

          <Grid container spacing={2}>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Roles disponibles</InputLabel>
                <Select value={selectedRoleId} onChange={(e) => setSelectedRoleId(e.target.value)}>
                  <MenuItem value="">Seleccione...</MenuItem>
                  {roles.map(role => (
                    <MenuItem key={role._id} value={role._id}>{role.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={() => setOpenModal(true)}>+ Agregar Rol</Button>
            </Grid>

            <Grid item xs={8}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField fullWidth label="Buscar permiso" value={search} onChange={(e) => setSearch(e.target.value)} />
                </Grid>
              </Grid>

              <Box sx={{ mt: 2, maxHeight: 400, overflowY: 'auto' }}>
                {filteredPermissions.map(perm => (
                  <Box key={perm._id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1, px: 2, bgcolor: 'rgba(0,0,0,0.04)', borderRadius: 1, mb: 1 }}>
                    <Typography variant="body2">{perm.description}</Typography>
                    <Switch
                      checked={assignedPermissions.includes(perm._id)}
                      onChange={() => handlePermissionToggle(perm._id)}
                      color="primary"
                    />
                  </Box>
                ))}
              </Box>

              <Button
                variant="contained"
                onClick={handleSave}
                disabled={!selectedRoleId || isSaving}
                sx={{ mt: 2, float: "right" }}
              >
                {isSaving ? <CircularProgress size={24} /> : "Guardar Cambios"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      <ModalCreateRol open={openModal} handleClose={() => setOpenModal(false)} />
    </>
  );
}
