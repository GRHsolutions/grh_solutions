import { Typography, useTheme, Link } from "@mui/material";
import Box from "@mui/material/Box";
import { useAuth } from "../../../hooks/auth";
import GrhTextField from "../../../generics/grh-generics/textField";
import GrhButton from "../../../generics/grh-generics/button";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "../../../contexts/NotificationContext";
import React from "react";

interface LoginProps {
  onRegister: () => void;
}

const initialValues = {
  email: "",
  password: "",
};

export default function Login({ onRegister }: LoginProps) {
  const theme = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();
  const { addNotification } = useNotifications();
  const [loginIN, setLoginIn] = React.useState(false);

  const handleSubmit = async (values: { email: string; password: string }) => {
    setLoginIn(true);
    await login(values.email, values.password)
      .then(async (res) => {
        if (res.t == "SUCCESS-CRAETE-CV") {
          addNotification({
            title: res.m,
            color: "info",
            position: "top-right",
            duration: 4000,
          });
          navigate("/hv-user");
          //navigate("/");
        } else if (res.t == "SUCCESS") {
          addNotification({
            title: res.m,
            color: "success",
            position: "top-right",
            duration: 4000,
          });
          navigate("/");
        } else {
          addNotification({
            title: res.m,
            color: "error",
            position: "top-right",
            duration: 4000,
          });
        }
      })
      .catch((error) => {
        console.error("Error en el inicio de sesión:", error);
      })
      .finally(() => {
        setLoginIn(false);
      });
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Correo electrónico no válido")
      .required("El correo electrónico es obligatorio"),
    password: Yup.string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .matches(/[0-9]/, "La contraseña debe contener al menos un número")
      .matches(
        /[a-z]/,
        "La contraseña debe contener al menos una letra minúscula"
      )
      .matches(
        /[A-Z]/,
        "La contraseña debe contener al menos una letra mayúscula"
      )
      .matches(
        /[\W_]/,
        "La contraseña debe contener al menos un carácter especial"
      )
      .required("La contraseña es obligatoria"),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ values, handleChange, isValid, errors, touched }) => {
        return (
          <Form style={{ width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: 3,
                fontFamily: theme.typography.fontFamily,
              }}
            >
              <Box sx={{ textAlign: "center", mb: 2 }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: theme.palette.text.primary,
                    mb: 1,
                  }}
                >
                  Iniciar Sesión
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                  }}
                >
                  Ingresa tus credenciales para acceder
                </Typography>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                <GrhTextField
                  name="email"
                  label="Correo electrónico"
                  placeholder="ejemplo@correo.com"
                  value={values.email}
                  variant="standard"
                  onChange={handleChange}
                  autoComplete="email"
                  disabled={loginIN}
                  error={touched.email && Boolean(errors.email)}
                  fullWidth
                />

                <GrhTextField
                  name="password"
                  label="Contraseña"
                  placeholder="••••••••"
                  variant="standard"
                  value={values.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  type="password"
                  disabled={loginIN}
                  error={touched.password && Boolean(errors.password)}
                  fullWidth
                />
              </Box>

              <Box sx={{ textAlign: "center", mt: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  ¿Has olvidado tu contraseña?{" "}
                  <Link
                    component="button"
                    type="button"
                    onClick={() => {
                      onRegister();
                      console.log("Recuperar contraseña");
                    }}
                    sx={{
                      color: theme.palette.primary.link,
                      textDecoration: "none",
                      fontWeight: 500,
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Recuperar aquí
                  </Link>
                </Typography>
              </Box>

              <GrhButton
                type="submit"
                variant="principal"
                label="Iniciar Sesión"
                disabled={
                  !isValid || !values.email || !values.password || loginIN
                }
                fullWidth
                sx={{ mt: 2, py: 1.5 }}
              />
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
}
