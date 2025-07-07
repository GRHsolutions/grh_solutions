import { Typography, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import GrhTextField from "../../../generics/grh-generics/textField";
import GrhButton from "../../../generics/grh-generics/button";
import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { LoginService } from "../../../domain/services/login/login.service";
import { LoginRepository } from "../../../infrastructure/repositories/usuario";
import { RegisterForm } from "../../../domain/models/usuario/login.entities";
import GrhCustomSelect from "../../../generics/grh-generics/inputSelect";
import { getTypeDocuments } from "../../../domain/services/typeDocument/typeDocument.service";

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

const initialValues = {
  firstName: "",
  middleName: "",
  lastName: "",
  secondLastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  typeDocument: "",
} as RegisterForm;

export default function Register({ onLogin }: RegisterProps) {
  const lgnService = new LoginService(new LoginRepository());
  const theme = useTheme();
  const [loading, setLoading] = React.useState(false);
  const [documentTypes, setDocumentTypes] = React.useState([]);

  useEffect(() => {
    getTypeDocuments()
      .then((response) => {
        console.log("Tipos de documentos obtenidos:", response.data); // Debug
        const optionMap = response.data.map((item: any) => ({
          value: item["_id"],
          name: item.name,
        }));
        setDocumentTypes(optionMap);
      })
      .catch((error) => {
        console.error("Error al obtener los tipos de documentos:", error);
      });
  }, []);

  const handleSubmit = (values: RegisterForm) => {
    console.log("Valores enviados:", values); // Debug
    setLoading(true);
    lgnService
      .register(values)
      .then((e) => {
        console.log("Respuesta del servidor:", e); // Debug
        if (e) {
          onLogin();
        }
      })
      .catch((ex) => {
        console.error("Error en catch:", ex);
        setLoading(false);
      });
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("El primer nombre es obligatorio"),
    middleName: Yup.string().notRequired(),
    lastName: Yup.string().required("El primer apellido es obligatorio"),
    secondLastName: Yup.string().notRequired(),
    email: Yup.string()
      .email("Correo no válido")
      .required("Correo obligatorio"),
    password: Yup.string()
      .min(8, "Mínimo 8 caracteres")
      .matches(/[0-9]/, "Debe contener al menos un número")
      .matches(/[a-z]/, "Debe contener una letra minúscula")
      .matches(/[A-Z]/, "Debe contener una letra mayúscula")
      .matches(/[\W_]/, "Debe contener un carácter especial")
      .required("Contraseña obligatoria"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
      .required("Confirmación obligatoria"),
    typeDocument: Yup.string().required("Tipo de documento obligatorio"),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      enableReinitialize={true}
    >
      {({
        values,
        handleChange,
        handleSubmit,
        resetForm,
        errors,
        touched,
        isValid,
        setFieldValue,
      }) => {
        return (
          <Form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "grid",
                width: "100%",
                height: "100%",
                gap: "1rem",
                fontFamily: theme.typography.fontFamily,
                color: theme.palette.primary.contrastText,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: "2rem",
                  textAlign: "center",
                  color: theme.palette.text.primary,
                }}
              >
                Registro
              </Typography>

              <Box sx={{ display: "flex", gap: 2 }}>
                <GrhTextField
                  name="firstName"
                  label="Primer Nombre"
                  value={values.firstName}
                  onChange={handleChange}
                  fullWidth
                  error={touched.firstName && Boolean(errors.firstName)}
                />
                <GrhTextField
                  name="middleName"
                  label="Segundo Nombre"
                  value={values.middleName}
                  onChange={handleChange}
                  fullWidth
                  error={touched.middleName && Boolean(errors.middleName)}
                />
              </Box>

              <Box sx={{ display: "flex", gap: 2 }}>
                <GrhTextField
                  name="lastName"
                  label="Primer Apellido"
                  value={values.lastName}
                  onChange={handleChange}
                  fullWidth
                  error={touched.lastName && Boolean(errors.lastName)}
                />
                <GrhTextField
                  name="secondLastName"
                  label="Segundo Apellido"
                  value={values.secondLastName}
                  onChange={handleChange}
                  fullWidth
                  error={
                    touched.secondLastName && Boolean(errors.secondLastName)
                  }
                />
              </Box>

              <GrhTextField
                name="email"
                label="Correo Electrónico"
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
              />

              <GrhTextField
                name="password"
                label="Contraseña"
                type="password"
                value={values.password}
                onChange={handleChange}
                error={touched.password && Boolean(errors.password)}
              />

              <GrhTextField
                name="confirmPassword"
                label="Confirmar Contraseña"
                type="password"
                value={values.confirmPassword}
                onChange={handleChange}
                error={
                  touched.confirmPassword && Boolean(errors.confirmPassword)
                }
              />

              <GrhCustomSelect
                name="typeDocument"
                label="Tipo de Documento"
                value={values.typeDocument}
                onChange={(event) => {
                  setFieldValue("typeDocument", event.target.value);
                }}
                options={documentTypes}
                error={touched.typeDocument && Boolean(errors.typeDocument)}
                fullWidth
              />

              <Typography
                sx={{
                  fontSize: "0.9rem",
                  textAlign: "center",
                  color: theme.palette.text.secondary,
                }}
              >
                ¿Ya tienes una cuenta? Haz clic{" "}
                <label
                  onClick={onLogin}
                  style={{
                    ...styles.link,
                    color: theme.palette.secondary.main,
                  }}
                >
                  aquí
                </label>
              </Typography>

              <GrhButton
                type="submit"
                variant="principal"
                label={loading ? "Registrando..." : "Registrar"}
                disabled={!isValid || loading}
                onClick={() => {
                  resetForm()
                }}
              />

              {/* <pre style={{ fontSize: "10px", whiteSpace: "pre-wrap" }}>
              {JSON.stringify({ values, errors, touched, isValid }, null, 2)}
            </pre> */}
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
}
