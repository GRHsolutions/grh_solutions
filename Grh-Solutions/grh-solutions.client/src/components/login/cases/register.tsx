import { Typography, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import GrhTextField from "../../../generics/grh-generics/textField";
import GrhButton from "../../../generics/grh-generics/button";
import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { LoginService } from "../../../domain/services/login/login.service";
import { LoginRepository } from "../../../infrastructure/repositories/usuario";
import { RegisterForm } from "../../../domain/models/usuario/login.entities";

interface RegisterProps {
  onLogin: () => void;
}

const styles = {
  link: {
    cursor: "pointer",
    color: "blue",
    textDecoration: "underline",
  } as React.CSSProperties,
};

export default function Register({ onLogin }: RegisterProps) {
  const lgnService = new LoginService(new LoginRepository());

  const initialValues = {
    nombre: "",
    correo: "",
    contrasena: "",
    confirmContrasena: "",
  } as RegisterForm;
  const theme = useTheme();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (values: RegisterForm) => {
    setLoading(true);
    lgnService
      .register(values)
      .then((e) => {
        if (
          e.code === "200" &&
          e.message === "Registro completado exitosamente"
        ) {
          onLogin();
          console.log(e);
        } else {
          console.error("Error en respuesta:", e);
          setLoading(false);
        }
      })
      .catch((ex) => {
        console.error("Error en catch:", ex);
        setLoading(false);
      });
  };

  const validationSchema = Yup.object({
    nombre: Yup.string().required("El nombre es obligatorio"),
    correo: Yup.string()
      .email("Correo electrónico no válido")
      .required("El correo electrónico es obligatorio"),
    contrasena: Yup.string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .matches(/[0-9]/, "Debe contener al menos un número")
      .matches(/[a-z]/, "Debe contener una letra minúscula")
      .matches(/[A-Z]/, "Debe contener una letra mayúscula")
      .matches(/[\W_]/, "Debe contener un carácter especial")
      .required("La contraseña es obligatoria"),
    confirmContrasena: Yup.string()
      .oneOf([Yup.ref("contrasena")], "Las contraseñas deben coincidir")
      .required("La confirmación de la contraseña es obligatoria"),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ values, handleChange, isValid }) => {
        return (
          <Form>
            <Box
              sx={{
                display: "grid",
                width: { xs: "100%", sm: "100%", md: "100%" },
                gap: "1rem",
                margin: "0 auto",
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
                Registro
              </Typography>
              <GrhTextField
                name="nombre"
                label="Nombre"
                placeholder="Tu nombre"
                value={values.nombre}
                onChange={handleChange}
                autoComplete="off"
              />
              <GrhTextField
                name="correo"
                label="Correo electrónico"
                placeholder="example@example.com"
                value={values.correo}
                onChange={handleChange}
                autoComplete="off"
              />
              <GrhTextField
                name="contrasena"
                label="Contraseña"
                placeholder="Super123*"
                value={values.contrasena}
                onChange={handleChange}
                autoComplete="off"
                type="password"
              />
              <GrhTextField
                name="confirmContrasena"
                label="Confirmar Contraseña"
                placeholder="Super123*"
                value={values.confirmContrasena}
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
                ¿Ya tienes una cuenta? Haz clic{" "}
                <label onClick={onLogin} style={styles.link}>
                  aquí
                </label>
              </Typography>
              <GrhButton
                type="submit"
                variant="principal"
                label="Registrar"
                disabled={!isValid}
              />
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
}
