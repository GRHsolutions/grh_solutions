import { Typography, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import { useAuth } from "../../../hooks/auth";
import GrhTextField from "../../../generics/grh-generics/textField";
import GrhButton from "../../../generics/grh-generics/button";
import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

interface LoginProps {
  onRegister: () => void;
}

const styles = {
  link: {
    cursor: "pointer",
    color: "blue",
    textDecoration: "underline", // Subrayado para enlaces
  } as React.CSSProperties,
};
const initialValues = {
  email: "",
  password: "",
};

export default function Login({ onRegister }: LoginProps) {

  const theme = useTheme();
  const { login } = useAuth();

  const handleSubmit = async (values: { email: string; password: string }) => {
    await login(values.email, values.password).then((res) => {
      if (res) {
        // Aquí puedes manejar la redirección o cualquier otra acción después de un inicio de sesión exitoso
        console.log("Inicio de sesión exitoso");
      } else {
        // Manejo de error en el inicio de sesión
        console.error("Error en el inicio de sesión");
      }
    })
      .catch((error) => {
        console.error("Error en el inicio de sesión:", error);
      })
  };

  // Validación de Yup
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
      ) // \W cubre todos los signos especiales
      .required("La contraseña es obligatoria"),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      style={undefined}
    >
      {({ values, handleChange, isValid }) => {
        return (
          <Form>
            <Box
              sx={{
                display: "grid",
                width: { xs: "100%", sm: "100%", md: "100%" }, // Ajuste de ancho responsivo
                gap: "1.5rem",
                fontFamily: theme.typography.fontFamily,
                color: theme.palette.primary.contrastText,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "1.5rem", sm: "2rem" },
                  textAlign: "center",
                }}
              >
                Inicio de Sesión
              </Typography>
              <GrhTextField
                name="email"
                label="Correo electrónico"
                placeholder="example@example.com"
                value={values.email}
                onChange={handleChange}
                autoComplete="off"
              />
              <GrhTextField
                name="password"
                label="Contraseña"
                placeholder="Super123*"
                value={values.password}
                onChange={handleChange}
                autoComplete="off"
                type="password"
              />
              <Typography
                sx={{
                  fontSize: { xs: "0.8rem", sm: "1rem" },
                  textAlign: "center",
                }}
              >
                ¿Has olvidado tu contraseña? Haz clic{" "}
                <label onClick={onRegister} style={styles.link}>
                  aquí
                </label>
              </Typography>
              <GrhButton
                type="submit"
                variant="principal"
                label="Ingresar"
                disabled={!isValid || !values.email || !values.password}
              />
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
}
