import {
  Box,
  Typography,
  Modal,
  IconButton,
  TextField,
  Snackbar,
  Alert,
  useTheme,
  InputLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import GrhButton from "../../../generics/grh-generics/button";
import EditIcon from "@mui/icons-material/Edit";
import { useAuth } from "../../../hooks/auth";
import { changePassword } from "../../../domain/services/usuario/usuario.service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  bgcolor: "background.paper",
  borderRadius: "15px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 2,
  border: "2px solid #000",
};

interface IModalChangePasswordProps {
  open: boolean;
  handleClose: () => void;
}

interface FormValues {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const validationSchema = Yup.object({
  oldPassword: Yup.string().required("La contraseña anterior es obligatoria"),
  newPassword: Yup.string()
    .min(8, "La nueva contraseña debe tener al menos 8 caracteres")
    .required("La nueva contraseña es obligatoria"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Las contraseñas no coinciden")
    .required("La confirmación es obligatoria"),
});

export default function ModalChangePassword({ open, handleClose }: IModalChangePasswordProps) {
  const theme = useTheme();
  const { logout, auth } = useAuth();
  const navigate = useNavigate();

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const initialValues: FormValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values: FormValues) => {
    const data = {
      currentPassword: values.oldPassword,
      newPassword: values.newPassword,
    };
    changePassword(data, auth.token).then((res) => {
      if (res.status === 200) {
        logout();
        navigate("/");
      } else {
        setAlertMessage(res.data.message);
        setOpenAlert(true);
      }
    });
  };

  return (
    <>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
        <Box sx={style}>
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              color: theme.palette.text.primary,
            }}
          >
            Cambiar contraseña
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              position: "absolute",
              top: 16,
              right: 16,
            }}
          >
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, handleChange, values }) => (
              <Form>
                <Box>
                  <InputLabel sx={{ mb: 0.5 }}>Contraseña anterior</InputLabel>
                  <TextField
                    name="oldPassword"
                    type="password"
                    fullWidth
                    variant="outlined"
                    value={values.oldPassword}
                    onChange={handleChange}
                    error={touched.oldPassword && Boolean(errors.oldPassword)}
                    helperText={touched.oldPassword && errors.oldPassword}
                  />
                </Box>

                <Box>
                  <InputLabel sx={{ mb: 0.5 }}>Digite su nueva contraseña</InputLabel>
                  <TextField
                    name="newPassword"
                    type="password"
                    fullWidth
                    variant="outlined"
                    value={values.newPassword}
                    onChange={handleChange}
                    error={touched.newPassword && Boolean(errors.newPassword)}
                    helperText={touched.newPassword && errors.newPassword}
                  />
                </Box>

                <Box>
                  <InputLabel sx={{ mb: 0.5 }}>Confirmar contraseña</InputLabel>
                  <TextField
                    name="confirmPassword"
                    type="password"
                    fullWidth
                    variant="outlined"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                    helperText={touched.confirmPassword && errors.confirmPassword}
                  />
                </Box>

                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", mt: 2, gap: 2 }}
                >
                  <GrhButton
                    startIcon={<EditIcon />}
                    label={"Editar"}
                    variant="principal"
                    sx={{ width: "30%" }}
                    id={"like"}
                    type="submit"
                  />
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>

      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={() => setOpenAlert(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpenAlert(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          <Typography variant="body1">
            <strong>{alertMessage}</strong>
          </Typography>
        </Alert>
      </Snackbar>
    </>
  );
}
