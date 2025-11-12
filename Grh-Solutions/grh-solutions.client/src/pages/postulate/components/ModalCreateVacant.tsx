import {
  Box, Typography, Modal, IconButton, Button, Stack,
  useTheme, Snackbar, Alert, Grid2
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import GrhTextField from '../../../generics/grh-generics/textField';
import GrhCustomSelect from '../../../generics/grh-generics/inputSelect';
import { useState } from 'react';
import { createVacancy } from '../../../domain/services/vacancies/vacancies.service';
import { useAuth } from '../../../hooks/auth';
import { Charge } from '../../../domain/models/charge/charge.entities';
import { Area } from '../../../domain/models/area/area.entities';

const modalStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
  width: '43%',
  height: '100%',
  bgcolor: 'background.paper',
  p: 4,
  overflowY: 'auto',
  '&:focus': { outline: 'none' }
};

interface IModalOptionsProps {
  open: boolean;
  handleClose: () => void;
  charges: Charge[]
  areas: Area[]
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  reload: boolean;
}

const initialValues = {
  tittle: '',
  description: '',
  type_contract: '',
  salary: '',
  horary: '',
  charge: '',
  address: '',
  telephone: '',
  email: '',
  type_modality: '',
  experience: '',
  formation: '',
  status: '',
  area: ''
};

const validationSchema = Yup.object({
  tittle: Yup.string()
    .required("Título obligatorio")
    .max(200, "El título no puede exceder los 200 caracteres"),

  description: Yup.string()
    .required("Descripción obligatoria")
    .max(500, "La descripción no puede exceder los 500 caracteres"),

  type_contract: Yup.string().required("Tipo de contrato obligatorio"),
  salary: Yup.string().required("Salario obligatorio"),
  horary: Yup.string().required("Horario obligatorio"),
  charge: Yup.string().required("Cargo obligatorio"),
  address: Yup.string().required("Dirección obligatoria"),
  telephone: Yup.string()
    .required("Teléfono obligatorio")
    .max(10, "El teléfono no puede exceder los 10 caracteres"),
  email: Yup.string().email("Correo inválido").required("Correo obligatorio"),
  type_modality: Yup.string().required("Modalidad obligatoria"),
  experience: Yup.string().required("Experiencia obligatoria"),
  formation: Yup.string().required("Formación obligatoria"),
  status: Yup.string().required("Estado obligatorio")
});

const modalityOptions = [
  { value: "remote", name: "Remoto" },
  { value: "onsite", name: "Presencial" },
  { value: "hybrid", name: "Híbrido" },
  { value: "freelance", name: "Freelance" },
  { value: "internship", name: "Pasantía" }
];

const typeContractOptions = [
  { value: "Tiempo completo", name: "Tiempo completo" },
  { value: "Medio tiempo", name: "Medio tiempo" },
  { value: "Contrato", name: "Contrato" },
  { value: "Pasantía", name: "Pasantía" }
];

const schedulesOptions = [
  { value: "Diurno", name: "Diurno" },
  { value: "Nocturno", name: "Nocturno" },
  { value: "Mixto", name: "Mixto" }
];

const stateOptions = [
  { value: "Activo", name: "Activo" },
  { value: "Inactivo", name: "Inactivo" },
  { value: "Cerrado", name: "Cerrado" }
];

export default function ModalCreateVacant({ open, handleClose, charges, areas, setReload }: IModalOptionsProps) {
  const theme = useTheme();
  const [openAlert, setOpenAlert] = useState(false);
  const { auth } = useAuth();
  const [alertType, setAlertType] = useState<"success" | "error">("success");
  const [alertMessage, setAlertMessage] = useState("");
  const handleSubmit = async (values: typeof initialValues, { setSubmitting }: any) => {
    try {
      await createVacancy(values, auth.token);
      setAlertType("success");
      setAlertMessage("La vacante se ha creado con éxito. Puedes verla en la sección de vacantes.");
      setOpenAlert(true);
      setReload(prev => !prev);
      handleClose();
    } catch (error) {
      console.error("Error al crear la vacante:", error.response.data.message);
      setAlertType("error");
      setAlertMessage(`Ocurrió un error al crear la vacante. ${error.response.data.message}`);
      setOpenAlert(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...modalStyle, color: theme.palette.primary.contrastText }}>
          <Box sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            borderBottom: `1px solid ${theme.palette.primary.hover, 0.1}`
          }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <WorkOutlineIcon fontSize="large" sx={{ color: theme.palette.primary.contrastText }} />
              <Typography variant="h6" fontWeight="bold">Crear nueva vacante</Typography>
            </Stack>
            <IconButton onClick={handleClose}><CloseIcon /></IconButton>
          </Box>

          <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
            {({ values, handleChange, validateForm, submitForm, errors }) => (
              <Form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const errors = await validateForm();
                  if (Object.keys(errors).length > 0) {
                    setAlertType("error");
                    setAlertMessage("Los campos obligatorios deben ser completados.");
                    setOpenAlert(true);
                    return;
                  }
                  submitForm();
                }}
              >
                <Grid2 container spacing={2} mt={2}>
                  <Grid2 size={12}>
                    <GrhTextField name="tittle" label="Título" value={values.tittle} onChange={handleChange} fullWidth error={Boolean(errors.tittle)} helperText={errors.tittle} />
                  </Grid2>

                  <Grid2 size={12}>
                    <GrhTextField name="description" label="Descripción" value={values.description} onChange={handleChange} multirows rows={4} fullWidth error={Boolean(errors.description)} helperText={errors.description} />
                  </Grid2>
                  <Grid2 size={6}>
                    <GrhCustomSelect
                      name="type_contract"
                      label="Tipo de Contrato"
                      options={typeContractOptions.map((charge) => ({ value: charge.value, name: charge.name }))}
                      value={values.type_contract}
                      onChange={handleChange}
                      fullWidth
                      error={Boolean(errors.type_contract)}
                      helperText={errors.type_contract}
                    />

                  </Grid2>
                  <Grid2 size={6}>
                    <GrhTextField name="salary" label="Salario" value={values.salary} onChange={handleChange} fullWidth error={Boolean(errors.salary)} helperText={errors.salary} />
                  </Grid2>
                  <Grid2 size={6}>
                    <GrhCustomSelect
                      name="horary"
                      label="Horario"
                      options={schedulesOptions.map((charge) => ({ value: charge.value, name: charge.name }))}
                      value={values.horary}
                      onChange={handleChange}
                      fullWidth
                      error={Boolean(errors.horary)}
                      helperText={errors.horary}
                    />
                  </Grid2>
                  <Grid2 size={6}>
                    <GrhCustomSelect
                      name="charge"
                      label="Cargo"
                      options={charges.map((charge) => ({ value: charge._id, name: charge.name }))}
                      value={values.charge}
                      onChange={handleChange}
                      fullWidth
                      error={Boolean(errors.charge)}
                      helperText={errors.charge}
                    />
                  </Grid2>

                  <Grid2 size={6}>
                    <GrhTextField name="address" label="Dirección" value={values.address} onChange={handleChange} fullWidth error={Boolean(errors.address)} helperText={errors.address} />
                  </Grid2>
                  <Grid2 size={6}>
                    <GrhTextField name="telephone" label="Teléfono" value={values.telephone} onChange={handleChange} fullWidth    error={Boolean(errors.telephone)} helperText={errors.telephone} />
                  </Grid2>

                  <Grid2 size={12}>
                    <GrhTextField name="email" label="Correo electrónico" value={values.email} onChange={handleChange} fullWidth    error={Boolean(errors.email)} helperText={errors.email} />
                  </Grid2>

                  <Grid2 size={6}>
                    <GrhCustomSelect
                      name="type_modality"
                      label="Modalidad"
                      options={modalityOptions}
                      value={values.type_modality}
                      onChange={handleChange}
                      fullWidth
                      error={Boolean(errors.type_modality)}
                      helperText={errors.type_modality}
                    />

                  </Grid2>

                  <Grid2 size={6}>
                    <GrhCustomSelect
                      name="status"
                      label="Estado"
                      options={stateOptions.map((area) => ({ value: area.value, name: area.name }))}
                      value={values.status}
                      onChange={handleChange}
                      fullWidth
                      error={Boolean(errors.status)}
                      helperText={errors.status}
                    />
                  </Grid2>

                  <Grid2 size={12}>
                    <GrhCustomSelect
                      name="area"
                      label="Area"
                      options={areas.map((area) => ({ value: area._id, name: area.name }))}
                      value={values.area}
                      onChange={handleChange}
                      fullWidth
                      error={Boolean(errors.area)}
                      helperText={errors.area}  
                    />
                  </Grid2>
                  <Grid2 size={6}>
                    <GrhTextField name="experience" label="Experiencia" value={values.experience} onChange={handleChange} fullWidth error={Boolean(errors.experience)} helperText={errors.experience} />
                  </Grid2>
                  <Grid2 size={6}>
                    <GrhTextField name="formation" label="Formación" value={values.formation} onChange={handleChange} fullWidth error={Boolean(errors.formation)} helperText={errors.formation} />
                  </Grid2>

                  <Grid2 size={12} display="flex" justifyContent="flex-end" gap={1}>
                    <Button onClick={handleClose} color="secondary" variant="outlined">Cancelar</Button>
                    <Button type="submit" color="primary" variant="contained">Guardar</Button>
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
        <Alert
          onClose={() => setOpenAlert(false)}
          severity={alertType}
          sx={{ width: "100%" }}
        >
          <Typography variant="body1"><strong>{alertMessage}</strong></Typography>
        </Alert>
      </Snackbar>
    </>
  );
}
