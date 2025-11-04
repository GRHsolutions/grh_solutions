import * as React from "react";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Groups3Icon from "@mui/icons-material/Groups3";
import LogoutIcon from "@mui/icons-material/Logout";
import { Alert, IconButton, Snackbar, useTheme } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { createGroup } from "../../../../domain/services/grupos/grupos.service";
import GrhTextField from "../../../../generics/grh-generics/textField";
import GrhCustomSelect from "../../../../generics/grh-generics/inputSelect";
import MultipleSelectString from "../../../../generics/grh-generics/multipleSelectString";
import GrhButton from "../../../../generics/grh-generics/button";


const style = {
  position: "absolute",
  top: 0,
  right: 0,
  width: "45%",
  height: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
  "&:focus": {
    outline: "none",
  },
};

interface IModalOptionsProps {
  open: boolean;
  handleClose: () => void;
  setReload?: React.Dispatch<React.SetStateAction<boolean>>;
  areasOptions: { value: string; name: string }[];
  usersOptions: { id: number; nombre: string }[];
  token: string;
}

const validationSchema = Yup.object({
  name: Yup.string().required("El nombre del grupo es obligatorio"),
  area: Yup.string().required("Debe seleccionar un área"),
  users: Yup.array()
    .of(Yup.string())
    .min(1, "Debe seleccionar al menos un usuario"),
});

const initialValues = {
  name: "",
  area: "",
  users: [] as number[],
};

export default function ModalGroup({ open, handleClose, setReload, areasOptions, usersOptions, token }: IModalOptionsProps) {
  const theme = useTheme();
  const [openAlert, setOpenAlert] = React.useState(false);

  const handleSubmit = async (values: typeof initialValues) => {
    const payload = {
      ...values,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      const response = await createGroup(payload, token);
      console.log("✅ Grupo creado:", response.data);
      handleClose();
      setOpenAlert(true);
      if (setReload) {
        setReload((prev) => !prev);
      }
    } catch (error: any) {
      console.error("❌ Error al crear grupo:", error.response?.data || error.message);
    }
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Groups3Icon sx={{ fontSize: 40, color: theme.palette.text.primary }} />
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  Crea un nuevo grupo
                </Typography>
                <Typography variant="body2">para facilitar la opción de horarios</Typography>
              </Box>
            </Box>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, setFieldValue, errors, touched }) => (
              <Form>
                <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
                  <Box sx={{ mt: 1, width: '100%' }}>
                    <GrhTextField
                      name="name"
                      label="Nombre del grupo"
                      value={values.name}
                      onChange={handleChange}
                      error={touched.name && Boolean(errors.name)}
                      fullWidth
                    />
                  </Box>
                  <GrhCustomSelect
                    label="Área"
                    name="area"
                    options={areasOptions}
                    value={values.area}
                    onChange={(e) => setFieldValue("area", e.target.value)}
                    error={touched.area && Boolean(errors.area)}
                    fullWidth
                  />

                </Box>

                <Box sx={{ mt: 3 }}>
                  <MultipleSelectString
                    label="Usuarios del grupo"
                    name="users"
                    options={usersOptions}
                    value={values.users}
                    setFieldValue={setFieldValue}
                  />
                </Box>

                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
                  <GrhButton
                    type="submit"
                    startIcon={<LogoutIcon />}
                    label="Enviar solicitud"
                    variant="principal"
                    sx={{ width: "40%" }}
                  />
                </Box>
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
          Grupo creado exitosamente.
        </Alert>
      </Snackbar>
    </>
  );
}
