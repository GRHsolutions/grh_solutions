import { Typography, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import { LoginService } from "../../../domain/services/login/login.service";
import { useAuth } from "../../../hooks/auth";
import GrhTextField from "../../../generics/grh-generics/textField";
import GrhButton from "../../../generics/grh-generics/button";
import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

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
  const initialValues = {
    nombre: "",
    correo: "",
    contraseña: "",
    confirmarContraseña: "",
  };
  const theme = useTheme();

  const handleSubmit = (values: { nombre: string; correo: string; contraseña: string }) => {
    LoginService.register(values.nombre, values.correo, values.contraseña).then((e) => {
      //login(e.token, e.usrName, e.photo, e.correo);
    });
  };

  const validationSchema = Yup.object({
    nombre: Yup.string().required("El nombre es obligatorio"),
    correo: Yup.string()
      .email("Correo electrónico no válido")
      .required("El correo electrónico es obligatorio"),
    contraseña: Yup.string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .matches(/[0-9]/, "La contraseña debe contener al menos un número")
      .matches(/[a-z]/, "La contraseña debe contener al menos una letra minúscula")
      .matches(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula")
      .matches(/[\W_]/, "La contraseña debe contener al menos un carácter especial")
      .required("La contraseña es obligatoria"),
    confirmarContraseña: Yup.string()
      .oneOf([Yup.ref('contraseña'), undefined], 'Las contraseñas deben coincidir')
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
                name="contraseña"
                label="Contraseña"
                placeholder="Super123*"
                value={values.contraseña}
                onChange={handleChange}
                autoComplete="off"
                type="password"
              />
              <GrhTextField
                name="confirmarContraseña"
                label="Confirmar Contraseña"
                placeholder="Super123*"
                value={values.confirmarContraseña}
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
                disabled={!isValid || !values.nombre || !values.correo || !values.contraseña || !values.confirmarContraseña}
              />
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
}