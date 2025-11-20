import {
  Box, Typography, Modal, IconButton, Button, Stack,
  Snackbar, Alert, Grid2,
  useTheme
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import GrhTextField from '../../../generics/grh-generics/textField';
import GrhCustomSelect from '../../../generics/grh-generics/inputSelect';
import { IOption, Profile } from '../../../domain/models/profile/profile.entities';
import { useState } from 'react';
import { createProfile, updateProfile } from '../../../domain/services/profile/profile.service';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '78%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  height: '92%',
  bgcolor: 'background.paper',
  borderRadius: '15px',
  bosizehadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  overflowY: 'auto'
};

interface IModalOptionsProps {
  open: boolean;
  profile: Partial<Profile>;
  handleClose: () => void;
  documentType: IOption[]
  token: string
  setReload?: React.Dispatch<React.SetStateAction<boolean>>
}

const validationSchema = Yup.object({
  name: Yup.string().required('Nombre obligatorio'),
  lastname: Yup.string().required('Apellido obligatorio'),
  date_of_birth: Yup.date().required('Fecha de nacimiento obligatoria'),
  email: Yup.string().email('Correo inválido').required('Correo obligatorio'),
  address: Yup.string().required('Dirección obligatoria'),
  number_phone: Yup.string().required('Teléfono obligatorio'),
  telephone: Yup.string().required('Teléfono fijo obligatorio'),
  type_document: Yup.string().required('Tipo de documento obligatorio'),
  document: Yup.string().required('Número de documento obligatorio'),
  rh: Yup.string().required('RH obligatorio'),
  status: Yup.string().required('Estado obligatorio')
});

const rhOptions = [
  { value: 'O+', name: 'O+' },
  { value: 'O-', name: 'O-' },
  { value: 'A+', name: 'A+' },
  { value: 'A-', name: 'A-' },
  { value: 'B+', name: 'B+' },
  { value: 'B-', name: 'B-' },
  { value: 'AB+', name: 'AB+' },
  { value: 'AB-', name: 'AB-' }
];

const statusOptions = [
  { value: 'enabled', name: 'Activo' },
  { value: 'disabled', name: 'Inactivo' }
];
export default function ModalEdit({ open, profile, handleClose, documentType, token, setReload }: IModalOptionsProps) {
  const [openAlert, setOpenAlert] = useState(false);
  const theme = useTheme();
  const initialValues = {
    _id: profile._id || '',
    user: profile.user || '',
    name: profile.name || '',
    lastname: profile.lastname || '',
    date_of_birth: profile.date_of_birth?.split('T')[0] || '',
    email: profile.email || '',
    address: profile.address || '',
    number_phone: profile.number_phone?.toString() || '',
    telephone: profile.telephone?.toString() || '',
    type_document: profile.type_document || '',
    document: profile.document?.toString() || '',
    rh: profile.rh || '',
    status: profile.status || '',
    vacancy_name: profile.vacancy_name || '',
    date_application: profile.date_application?.split('T')[0] || '',
  };
  const handleSubmit = (values: typeof initialValues) => {
    if (!values.user) {
      console.error("El ID del usuario es obligatorio");
      return;
    }

    const dataToSend = {
      ...values,
      number_phone: Number(values.number_phone),
      telephone: Number(values.telephone),
      document: Number(values.document),
    };

    if (profile._id) {
      updateProfile(profile._id, dataToSend, token)
        .then(() => {
          setOpenAlert(true);
          if (setReload) setReload(prev => !prev);
        })
        .catch((err) => console.error("Error actualizando perfil", err));
    } else {
      createProfile(dataToSend, values.user)
        .then(() => {
          setOpenAlert(true);
          setTimeout(() => {
            window.location.reload();
          })
          if (setReload) setReload(prev => !prev);
        })
        .catch((err) => console.error("Error creando perfil", err));
    }
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <PersonIcon sx={{ fontSize: 40, color: theme.palette.text.primary }} />
            <Box>
              <Typography variant="h6" fontWeight="bold" sx={{ color: theme.palette.text.primary }}>Editar información personal</Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>Usuario activo</Typography>
            </Box>
          </Stack>
          <IconButton onClick={handleClose}><CloseIcon /></IconButton>
        </Box>

        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
          {({ values, handleChange }) => (
            <Form>
              <Grid2 container spacing={2} mt={2}>
                <Grid2 size={6}>
                  <GrhTextField label="Nombre" name="name" value={values.name} onChange={handleChange} fullWidth />
                </Grid2>
                <Grid2 size={6}>
                  <GrhTextField label="Apellido" name="lastname" value={values.lastname} onChange={handleChange} fullWidth />
                </Grid2>
                <Grid2 size={6}>
                  <GrhTextField label="Fecha de nacimiento" name="date_of_birth" value={values.date_of_birth} type="date" onChange={handleChange} fullWidth />
                </Grid2>
                <Grid2 size={6}>
                  <GrhTextField label="Correo electrónico" name="email" value={values.email} onChange={handleChange} fullWidth />
                </Grid2>
                <Grid2 size={12}>
                  <GrhTextField label="Dirección" name="address" value={values.address} onChange={handleChange} fullWidth />
                </Grid2>
                <Grid2 size={6}>
                  <GrhTextField label="Celular" name="number_phone" value={values.number_phone} onChange={handleChange} fullWidth />
                </Grid2>
                <Grid2 size={6}>
                  <GrhTextField label="Teléfono fijo" name="telephone" value={values.telephone} onChange={handleChange} fullWidth />
                </Grid2>
                <Grid2 size={6}>
                  <GrhCustomSelect name="type_document" label="Tipo de documento" options={documentType} value={values.type_document} onChange={handleChange}  fullWidth />
                </Grid2>
                <Grid2 size={6}>
                  <GrhTextField label="Número de documento" name="document" value={values.document} onChange={handleChange} fullWidth />
                </Grid2>
                <Grid2 size={6}>
                  <GrhCustomSelect name="rh" label="RH" options={rhOptions} value={values.rh} onChange={handleChange} fullWidth />
                </Grid2>
                <Grid2 size={6}>
                  <GrhCustomSelect label="Estado" name="status" options={statusOptions} value={values.status} onChange={handleChange} fullWidth />
                </Grid2>

                <Grid2 size={12} display="flex" justifyContent="flex-end" gap={1} mt={2}>
                  <Button variant="outlined" startIcon={<CancelIcon />} sx={{ color: theme.palette.text.primary }} onClick={handleClose}>Cancelar</Button>
                  <Button type="submit" variant="contained" startIcon={<SendIcon />} sx={{ color: theme.palette.text.primary }}>Guardar</Button>
                </Grid2>
              </Grid2>
            </Form>
          )}
        </Formik>

        <Snackbar
          open={openAlert}
          autoHideDuration={6000}
          onClose={() => setOpenAlert(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert onClose={() => setOpenAlert(false)} severity="success" sx={{ width: "100%" }}>
            Perfil actualizado correctamente.
          </Alert>
        </Snackbar>
      </Box>
    </Modal>
  );
}
