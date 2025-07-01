import { Typography, useTheme, MenuItem } from "@mui/material";
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
  const [_loading, setLoading] = React.useState(false);
  const [documentTypes, setDocumentTypes] = React.useState([]);

  const handleSubmit = (values: RegisterForm) => {
    setLoading(true);
    lgnService
      .register(values)
      .then((e) => {
        if (e.code === "200" && e.message === "Registro completado exitosamente") {
          onLogin();
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


  useEffect(() => {
    getTypeDocuments()
      .then((response) => {
        const optionMao = response.data.map((item: any) => ({ value: item.id, name: item.name }));
        setDocumentTypes(optionMao);
      })
      .catch((error) => {
        console.error("Error al obtener los tipos de documentos:", error);
      });
  }, []);
  const validationSchema = Yup.object({
    firstName: Yup.string().required("El primer nombre es obligatorio"),
    middleName: Yup.string(),
    lastName: Yup.string().required("El primer apellido es obligatorio"),
    secondLastName: Yup.string(),
    email: Yup.string().email("Correo no válido").required("Correo obligatorio"),
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
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
      {({ values, handleChange, isValid }) => (
        <Form>
          <Box
            sx={{
              display: "grid",
              width: "100%",
              gap: "1rem",
              fontFamily: theme.typography.fontFamily,
              color: theme.palette.primary.contrastText,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontWeight: "bold", fontSize: "2rem", textAlign: "center" }}>
              Registro
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <GrhTextField name="firstName" label="Primer Nombre" value={values.firstName} onChange={handleChange} fullWidth />
              <GrhTextField name="middleName" label="Segundo Nombre" value={values.middleName} onChange={handleChange} fullWidth />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <GrhTextField name="lastName" label="Primer Apellido" value={values.lastName} onChange={handleChange} />
              <GrhTextField name="secondLastName" label="Segundo Apellido" value={values.secondLastName} onChange={handleChange} />
            </Box>

            <GrhTextField name="email" label="Correo Electrónico" value={values.email} onChange={handleChange} />
            <GrhTextField name="password" label="Contraseña" type="password" value={values.password} onChange={handleChange} />
            <GrhTextField name="confirmPassword" label="Confirmar Contraseña" type="password" value={values.confirmPassword} onChange={handleChange} />

            <GrhCustomSelect
              name="typeDocument"
              label="Tipo de Documento"
              value={values.typeDocument}
              onChange={handleChange}
              options={documentTypes}
            />

            <Typography sx={{ fontSize: "0.9rem", textAlign: "center" }}>
              ¿Ya tienes una cuenta? Haz clic{" "}
              <label onClick={onLogin} style={styles.link}>
                aquí
              </label>
            </Typography>

            <GrhButton type="submit" variant="principal" label="Registrar" disabled={!isValid} />
          </Box>
        </Form>
      )}
    </Formik>
  );
}
