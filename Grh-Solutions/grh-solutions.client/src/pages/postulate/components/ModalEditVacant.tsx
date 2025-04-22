import { Box, Typography, Modal, IconButton, Button, Stack, useTheme, Grid2, Snackbar, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import GrhTextField from '../../../generics/grh-generics/textField';
import { Formik, Form } from 'formik';
import GrhCustomSelect from '../../../generics/grh-generics/inputSelect';
import TextField from '../../../generics/grh-generics/textField';
import { useState } from 'react';

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

interface IModalOptionsProps {
  open: boolean;
  handleClose: () => void;
  initialValues: typeof initialValues;
  handleEdit: (values: typeof initialValues) => void;
}

const select = [
  { value: 'remote', name: 'Remoto' },
  { value: 'onsite', name: 'Presencial' },
  { value: 'hybrid', name: 'Híbrido' },
  { value: 'freelance', name: 'Freelance / Por proyecto' },
  { value: 'internship', name: 'Pasantía / Práctica' },
];

const initialValues = {
  type: '',
  title: '',
  description: '',
  requisitos: '',
  typeVacant: '',
  salario: '',
};

export default function ModalEditVacant({
  open,
  handleClose,
  initialValues: initialValuesProp,
  handleEdit,
}: IModalOptionsProps) {
  const theme = useTheme();
  const [openAlert, setOpenAlert] = useState(false);

  const handleSubmit = (values: typeof initialValues) => {
    handleEdit(values);
    setOpenAlert(true);
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box
        sx={{
          ...modalStyle,
          color: theme.palette.primary.contrastText,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: `1px solid ${theme.palette.primary.hover, 0.1}`,
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <WorkOutlineIcon fontSize="large" sx={{ color: theme.palette.primary.contrastText }} />
            <Typography variant="h6" fontWeight="bold">
              Editar Vacante
            </Typography>
          </Stack>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Formik initialValues={initialValuesProp} onSubmit={handleSubmit}>
          {({ values, handleChange }) => (
            <Form>
              <Grid2 container spacing={2} mt={2}>
                <Grid2 size={12}>
                  <GrhTextField
                    label="Título"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid2>

                <Grid2 size={12}>
                  <GrhTextField
                    label="Descripción"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    multirows
                    fullWidth
                    rows={6}
                  />
                </Grid2>

                <Grid2 size={12}>
                  <GrhTextField
                    label="Requisitos"
                    name="requisitos"
                    value={values.requisitos}
                    onChange={handleChange}
                    multirows
                    fullWidth
                    rows={6}
                  />
                </Grid2>

                <Grid2 size={12}>
                  <GrhCustomSelect
                    label="Modalidad"
                    options={select}
                    value={values.typeVacant}
                    name="typeVacant"
                    onChange={handleChange}
                  />
                </Grid2>

                <Grid2 size={12}>
                  <TextField
                    label="Salario"
                    name="salario"
                    type="number"
                    value={values.salario}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid2>

                <Grid2 size={12} display="flex" justifyContent="flex-end" gap={1}>
                  <Button onClick={handleClose} color="secondary" variant="outlined">
                    Cancelar
                  </Button>
                  <Button type="submit" color="primary" variant="contained">
                    Guardar Cambios
                  </Button>
                </Grid2>
              </Grid2>
            </Form>
          )}
        </Formik>

        <Snackbar
          open={openAlert}
          autoHideDuration={6000}
          onClose={() => setOpenAlert(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={() => setOpenAlert(false)} severity="success" sx={{ width: '100%' }}>
            <Typography variant="body1">
              <strong>La vacante se ha actualizado con éxito.</strong>
            </Typography>
            Puedes verla en la sección de vacantes.
          </Alert>
        </Snackbar>
      </Box>
    </Modal>
  );
}
