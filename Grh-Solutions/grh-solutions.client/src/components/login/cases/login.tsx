import { Typography, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import { LoginService } from "../../../domain/services/login/login.service";
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

export default function Login({ onRegister }: LoginProps) {
  const initialValues = {
    correo: "",
    contraseña: "",
  };
  const theme = useTheme();
  const { login } = useAuth();

  const handleSubmit = (values: { correo: string; contraseña: string }) => {
    LoginService.login(values.correo, values.contraseña).then((e) => {
      login(e.token, e.usrName, e.photo, e.correo);
    });
  };

  // Validación de Yup
  const validationSchema = Yup.object({
    correo: Yup.string()
      .email("Correo electrónico no válido")
      .required("El correo electrónico es obligatorio"),
    contraseña: Yup.string()
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
                name="correo"
                label="Correo electrónico"
                placeholder="example@example.com"
                value={values.correo}
                onChange={handleChange}
                autoComplete="off"
              />
              <GrhTextField
                name="contraseña"
                label="Contraseña"
                placeholder="Super123*"
                value={values.contraseña}
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
                disabled={!isValid || !values.correo || !values.contraseña}
              />
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
}
