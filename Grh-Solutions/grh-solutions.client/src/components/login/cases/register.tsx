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
import dayjs, { Dayjs } from "dayjs";
import GenericDatePicker from "../../comunicados/datePicker";

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
  document: "",
  birthDate: dayjs(),
} as RegisterForm;

export default function Register({ onLogin }: RegisterProps) {
  const lgnService = new LoginService(new LoginRepository());
  const theme = useTheme();
  const [loading, setLoading] = React.useState(false);
  const [documentTypes, setDocumentTypes] = React.useState([]);
  const [birthDate, setBitchDate] = React.useState<Dayjs | null>(dayjs());

  useEffect(() => {
    getTypeDocuments()
      .then((response) => {
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
    document: Yup.string().required("Numero de documento requerido"),
    birthDate: Yup.mixed()
      .required("La fecha de nacimiento es obligatoria")
      .test("is-valid", "Fecha inválida", (value: any) =>
        dayjs(value).isValid()
      )
      .test("not-in-future", "La fecha no puede ser en el futuro", (value) => {
        return dayjs(value as Dayjs).isBefore(dayjs(), "day");
      }),
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
        const setValue = (fieldName: string, newVal: Dayjs | null) => {
          setFieldValue(fieldName, newVal);
        };

        React.useEffect(() => {
          setValue("birthDate", birthDate);
        }, [birthDate]);

        return (
          <Form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
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

              <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
                <GrhTextField
                  variant="standard"
                  name="firstName"
                  label="Primer Nombre"
                  value={values.firstName}
                  onChange={handleChange}
                  fullWidth
                />
                <GrhTextField
                  variant="standard"
                  name="middleName"
                  label="Segundo Nombre"
                  value={values.middleName}
                  onChange={handleChange}
                  fullWidth
                />
              </Box>

              <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
                <GrhTextField
                  variant="standard"
                  name="lastName"
                  label="Primer Apellido"
                  value={values.lastName}
                  onChange={handleChange}
                  fullWidth
                />
                <GrhTextField
                  variant="standard"
                  name="secondLastName"
                  label="Segundo Apellido"
                  value={values.secondLastName}
                  onChange={handleChange}
                  fullWidth
                />
              </Box>

              <GrhTextField
                name="email"
                label="Correo Electrónico"
                variant="standard"
                value={values.email}
                onChange={handleChange}
                fullWidth
              />

              <GrhTextField
                name="password"
                label="Contraseña"
                variant="standard"
                type="password"
                value={values.password}
                onChange={handleChange}
                fullWidth
              />

              <GrhTextField
                name="confirmPassword"
                label="Confirmar Contraseña"
                variant="standard"
                type="password"
                value={values.confirmPassword}
                onChange={handleChange}
                fullWidth
              />

              <GrhCustomSelect
                name="typeDocument"
                variant="standard"
                label="Tipo de Documento"
                value={values.typeDocument}
                onChange={(event) => {
                  setFieldValue("typeDocument", event.target.value);
                }}
                options={documentTypes}
                fullWidth
              />

              <GrhTextField
                name="document"
                label="Numero de documento"
                variant="standard"
                value={values.document}
                onChange={handleChange}
                fullWidth
              />

              <GenericDatePicker
                mode="date"
                label="Fecha de nacimiento"
                value={birthDate}
                onChange={(newVal) => {
                  setBitchDate(newVal as Dayjs);
                }}
                title="Cumpleaños"
                color="info"
                fullWidth={true}
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
                  //resetForm();
                }}
              />
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
}
