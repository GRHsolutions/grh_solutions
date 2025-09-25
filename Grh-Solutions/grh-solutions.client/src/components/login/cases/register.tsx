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
import { useNotifications } from "../../../contexts/NotificationContext";
import PublishIcon from "@mui/icons-material/Publish";

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
  const { addNotification } = useNotifications();

  useEffect(() => {
    getTypeDocuments()
      .then((response) => {
        const optionMap = response.data.map((item: any) => ({
          value: item["_id"],
          name: item.name,
        }));
        setDocumentTypes(optionMap);
      })
      .catch((error: any) => {
        console.error("Error al obtener los tipos de documentos:", error);
      });
  }, []);

  const handleSubmit = async (values: RegisterForm) => {
    setLoading(true);
    await lgnService
      .register(values)
      .then((e) => {
        if (e) {
          onLogin();
          addNotification({
            title: "Cuenta creada excitosamente",
            color: "success",
            position: "top-right",
            duration: 4000,
          });
          setLoading(false);
        }
      })
      .catch((ex) => {
        console.error(ex);
        if (ex.duplicate) {
          addNotification({
            title: ex.message,
            color: "error",
            position: "top-right",
            duration: 4000,
          });
          setLoading(false);
          return;
        }

        addNotification({
          title: "Error al intentar crear la cuenta",
          color: "error",
          position: "top-right",
          duration: 4000,
        });
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
      validateOnMount={true}
    >
      {({
        values,
        handleChange,
        handleSubmit,
        // errors,
        // touched,
        isValid,
        setFieldValue,
        dirty,
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
                  onChange={(e) => {
                    // eliminamos todos los espacios
                    const noSpaces = e.target.value.replace(/\s/g, "");
                    // enviamos a formik el valor limpio
                    setFieldValue("firstName", noSpaces);
                  }}
                  fullWidth
                />
                <GrhTextField
                  variant="standard"
                  name="middleName"
                  label="Segundo Nombre"
                  value={values.middleName}
                  onChange={(e) => {
                    // eliminamos todos los espacios
                    const noSpaces = e.target.value.replace(/\s/g, "");
                    // enviamos a formik el valor limpio
                    setFieldValue("middleName", noSpaces);
                  }}
                  fullWidth
                />
              </Box>

              <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
                <GrhTextField
                  variant="standard"
                  name="lastName"
                  label="Primer Apellido"
                  value={values.lastName}
                  onChange={(e) => {
                    // eliminamos todos los espacios
                    const noSpaces = e.target.value.replace(/\s/g, "");
                    // enviamos a formik el valor limpio
                    setFieldValue("lastName", noSpaces);
                  }}
                  fullWidth
                />
                <GrhTextField
                  variant="standard"
                  name="secondLastName"
                  label="Segundo Apellido"
                  value={values.secondLastName}
                  onChange={(e) => {
                    // eliminamos todos los espacios
                    const noSpaces = e.target.value.replace(/\s/g, "");
                    // enviamos a formik el valor limpio
                    setFieldValue("secondLastName", noSpaces);
                  }}
                  fullWidth
                />
              </Box>

              <GrhTextField
                name="email"
                label="Correo Electrónico"
                variant="standard"
                value={values.email}
                onChange={(e) => {
                  // eliminamos todos los espacios
                  const noSpaces = e.target.value.replace(/\s/g, "");
                  // enviamos a formik el valor limpio
                  setFieldValue("email", noSpaces);
                }}
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
                numeric={true}
                onChange={(e) => {
                  // eliminamos todos los espacios
                  const onlyNumbers = e.target.value.replace(/[^0-9]/g, ""); // filtra todo menos 0-9
                  // enviamos a formik el valor limpio
                  setFieldValue("document", onlyNumbers);
                }}
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
                disabled={!isValid || !dirty || loading}
                startIcon={<PublishIcon />}
              />
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
}
