import {
  Box,
  Typography,
  Modal,
  IconButton,
  Button,
  Stack,
  useTheme,
  Snackbar,
  Alert,
  Grid2,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

import GrhTextField from '../../../generics/grh-generics/textField';
import GrhCustomSelect from '../../../generics/grh-generics/inputSelect';
import { VacanteData } from '../../../domain/models/vacantes/vacantes.entities';
import { updateVacancy } from '../../../domain/services/vacancies/vacancies.service';
import { Charge } from '../../../domain/models/charge/charge.entities';
import { Area } from '../../../domain/models/area/area.entities';

const modalStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
  width: '43%',
  height: '100%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto',
  '&:focus': {
    outline: 'none',
  },
};

const modalityOptions = [
  { value: 'remote', name: 'Remoto' },
  { value: 'onsite', name: 'Presencial' },
  { value: 'hybrid', name: 'Híbrido' },
  { value: 'freelance', name: 'Freelance' },
  { value: 'internship', name: 'Pasantía' },
];

const validationSchema = Yup.object({
  tittle: Yup.string().required("Título obligatorio"),
  description: Yup.string().required("Descripción obligatoria"),
  type_contract: Yup.string().required("Tipo de contrato obligatorio"),
  salary: Yup.string().required("Salario obligatorio"),
  horary: Yup.string().required("Horario obligatorio"),
  charge: Yup.string().required("Cargo obligatorio"),
  address: Yup.string().required("Dirección obligatoria"),
  telephone: Yup.string().required("Teléfono obligatorio"),
  email: Yup.string().email("Correo inválido").required("Correo obligatorio"),
  type_modality: Yup.string().required("Modalidad obligatoria"),
  experience: Yup.string().required("Experiencia obligatoria"),
  formation: Yup.string().required("Formación obligatoria"),
  status: Yup.string().required("Estado obligatorio"),
});

interface IModalEditProps {
  open: boolean;
  handleClose: () => void;
  initialValues: VacanteData;
  token: string;
  vacationId: string;
  charges: Charge[]
  areas: Area[]
  setReload?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ModalEditVacant({ open, handleClose, initialValues, token, vacationId, charges, areas, setReload }: IModalEditProps) {
  const theme = useTheme();
  const [openAlert, setOpenAlert] = useState(false);
  const handleSubmit = (values: typeof initialValues) => {
    updateVacancy(vacationId, values, token);
    setOpenAlert(true);
    if (setReload) setReload(prev => !prev);
    handleClose();
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...modalStyle, color: theme.palette.primary.contrastText }}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: `1px solid ${theme.palette.primary.hover, 0.1}`
          }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <WorkOutlineIcon fontSize="large" sx={{ color: theme.palette.primary.contrastText }} />
              <Typography variant="h6" fontWeight="bold">Editar Vacante</Typography>
            </Stack>
            <IconButton onClick={handleClose}><CloseIcon /></IconButton>
          </Box>

          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({ values, handleChange }) => (
              <Form>
                <Grid2 container spacing={2} mt={2}>
                  <Grid2 size={12}>
                    <GrhTextField name="tittle" label="Título" value={values.tittle} onChange={handleChange} fullWidth />
                  </Grid2>

                  <Grid2 size={12}>
                    <GrhTextField name="description" label="Descripción" value={values.description} onChange={handleChange} multirows rows={4} fullWidth />
                  </Grid2>

                  <Grid2 size={6}>
                    <GrhTextField name="type_contract" label="Tipo de Contrato" value={values.type_contract} onChange={handleChange} fullWidth />
                  </Grid2>
                  <Grid2 size={6}>
                    <GrhTextField name="salary" label="Salario" value={values.salary} onChange={handleChange} fullWidth />
                  </Grid2>

                  <Grid2 size={6}>
                    <GrhTextField name="horary" label="Horario" value={values.horary} onChange={handleChange} fullWidth />
                  </Grid2>
                  <Grid2 size={6}>
                    <GrhCustomSelect
                      name="charge"
                      label="Cargo"
                      options={charges.map((charge) => ({ value: charge._id, name: charge.name }))}
                      value={values.charge}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid2>

                  <Grid2 size={6}>
                    <GrhTextField name="address" label="Dirección" value={values.address} onChange={handleChange} fullWidth />
                  </Grid2>
                  <Grid2 size={6}>
                    <GrhTextField name="telephone" label="Teléfono" value={values.telephone} onChange={handleChange} fullWidth />
                  </Grid2>

                  <Grid2 size={12}>
                    <GrhTextField name="email" label="Correo electrónico" value={values.email} onChange={handleChange} fullWidth />
                  </Grid2>

                  <Grid2 size={6}>
                    <GrhCustomSelect
                      name="type_modality"
                      label="Modalidad"
                      options={modalityOptions}
                      value={values.type_modality}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid2>
                  <Grid2 size={6}>
                    <GrhTextField name="status" label="Estado" value={values.status} onChange={handleChange} fullWidth />
                  </Grid2>
                  <Grid2 size={12}>
                    <GrhCustomSelect
                      name="area"
                      label="Area"
                      options={areas.map((area) => ({ value: area._id, name: area.name }))}
                      value={values.area}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid2>
                  <Grid2 size={6}>
                    <GrhTextField name="experience" label="Experiencia" value={values.experience} onChange={handleChange} fullWidth />
                  </Grid2>
                  <Grid2 size={6}>
                    <GrhTextField name="formation" label="Formación" value={values.formation} onChange={handleChange} fullWidth />
                  </Grid2>

                  <Grid2 size={12} display="flex" justifyContent="flex-end" gap={1}>
                    <Button onClick={handleClose} color="secondary" variant="outlined">Cancelar</Button>
                    <Button type="submit" color="primary" variant="contained">Guardar Cambios</Button>
                  </Grid2>
                </Grid2>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={() => setOpenAlert(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={() => setOpenAlert(false)} severity="success" sx={{ width: "100%" }}>
          <Typography variant="body1"><strong>La vacante se ha actualizado con éxito.</strong></Typography>
          Puedes verla en la sección de vacantes.
        </Alert>
      </Snackbar>
    </>

  );
}
