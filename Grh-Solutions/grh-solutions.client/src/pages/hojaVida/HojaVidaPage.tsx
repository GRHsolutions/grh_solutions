import {
  Alert,
  Backdrop,
  Box,
  CircularProgress,
  Grid2,
  Typography,
  useTheme,
} from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import { CVRepository } from "../../infrastructure/repositories/cv/cv";
import { CvService } from "../../domain/services/cv/cv2.service";
import {
  Cv,
  Formation,
  Language,
  Skill,
} from "../../domain/models/Cv/cv.entities";
import { useNotifications } from "../../contexts/NotificationContext";
import * as Yup from "yup";
import dayjs from "dayjs";
import ResumeAccordion from "./Components/FormHv";
import GrhButton from "../../generics/grh-generics/button";
import CachedIcon from "@mui/icons-material/Cached";
import PreviewHv from "./Components/PreviewHv";
import { useNavigate } from "react-router-dom";

// En caso de usar date pickers que retornen objetos Dayjs
const dayjsSchema = Yup.mixed()
  .test("is-dayjs", "Fecha inválida", (value) => dayjs.isDayjs(value))
  .required("Campo requerido");

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Campo requerido"),
  middleName: Yup.string().nullable(),
  lastName: Yup.string().required("Campo requerido"),
  secondLastName: Yup.string().nullable(),
  mail: Yup.string().email("Correo inválido").required("Campo requerido"),
  phone: Yup.string().required("Campo requerido"),
  address: Yup.string().required("Campo requerido"),
  postal: Yup.string().required("Campo requerido"),
  city: Yup.string().required("Campo requerido"),
  birthDay: dayjsSchema,
  perfil: Yup.string().required("Campo requerido"),

  formations: Yup.array()
    .of(
      Yup.object().shape({
        tittle: Yup.string().required("Campo requerido"),
        school: Yup.string().required("Campo requerido"),
        city: Yup.string().required("Campo requerido"),
        startDate: dayjsSchema,
        endDate: dayjsSchema.nullable(),
        finished: Yup.boolean().required("Campo requerido"),
        descroption: Yup.string().required("Campo requerido"),
        index: Yup.number().required("Campo requerido"),
      })
    )
    .min(1, "Debe tener al menos una formación"),

  skills: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("Campo requerido"),
        level: Yup.mixed<
          "PRINCIPIANTE" | "INTERMEDIO" | "BUENO" | "ALTO" | "EXCELENTE"
        >()
          .oneOf(["PRINCIPIANTE", "INTERMEDIO", "BUENO", "ALTO", "EXCELENTE"])
          .required("Campo requerido"),
      })
    )
    .min(1, "Debe tener al menos una habilidad"),

  lenguages: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("Campo requerido"),
        level: Yup.mixed<
          | "PRINCIPIANTE"
          | "INTERMEDIO"
          | "BUENO"
          | "ALTO"
          | "FLUIDO"
          | "A1"
          | "A2"
          | "B1"
          | "B2"
          | "C1"
          | "C2"
        >()
          .oneOf([
            "PRINCIPIANTE",
            "INTERMEDIO",
            "BUENO",
            "ALTO",
            "FLUIDO",
            "A1",
            "A2",
            "B1",
            "B2",
            "C1",
            "C2",
          ])
          .required("Campo requerido"),
      })
    )
    .min(1, "Debe tener al menos un idioma"),
});

export const LANGUAGE_LEVELS: { name: string; value: string }[] = [
  { name: "Principiante", value: "PRINCIPIANTE" },
  { name: "Intermedio", value: "INTERMEDIO" },
  { name: "Bueno", value: "BUENO" },
  { name: "Alto", value: "ALTO" },
  { name: "Fluido", value: "FLUIDO" },
  { name: "A1", value: "A1" },
  { name: "A2", value: "A2" },
  { name: "B1", value: "B1" },
  { name: "B2", value: "B2" },
  { name: "C1", value: "C1" },
  { name: "C2", value: "C2" },
];

export const SKILL_LEVELS: { name: string; value: string }[] = [
  { name: "Principiante", value: "PRINCIPIANTE" },
  { name: "Intermedio", value: "INTERMEDIO" },
  { name: "Bueno", value: "BUENO" },
  { name: "Alto", value: "ALTO" },
  { name: "Excelente", value: "EXCELENTE" },
];

export default function HojaVidaPage() {
  const theme = useTheme();
  const [currntCv, setCurrentCv] = React.useState<Cv | null>();
  const [loading, setLoading] = React.useState<
    "fetch-obj" | "fetch-submit" | "none"
  >("none");
  const service = new CvService(new CVRepository());
  const { addNotification } = useNotifications();
  const [err, setErr] = React.useState<"fetch-obj" | "fetch-submit" | "none">(
    "none"
  );
  const [reload, setReload] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchItem = async () => {
      setLoading("fetch-obj");
      await service
        .getMyCv()
        .then((res) => {
          setCurrentCv(res);
          setLoading("none");
        })
        .catch((err) => {
          console.log(err);
          setErr("fetch-obj");
          setLoading("none");
          addNotification({
            color: "error",
            position: "top-right",
            title: "Hubo un error al intentar traer la hoja de vida",
            duration: 4000,
          });
        });
    };
    fetchItem();
  }, [reload]);

  const handleSubmit = async (entity: Cv) => {
    setLoading("fetch-submit");
    await service
      .submit(entity)
      .then((e) => {
        if (e.data) {
          addNotification({
            title: e.message,
            color: "success",
            position: "top-right",
            duration: 4000,
          });
          navigate("/");
        }
      })
      .catch((r) => {
        if (r.message) {
          setErr("fetch-submit");
          addNotification({
            title: r.message,
            color: "error",
            position: "top-right",
            duration: 4000,
          });
        }
      });
  };

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      height="90vh"
      sx={{ overflow: "hidden" }}
    >
      {loading != "none" && (
        <Backdrop open={true}>
          <CircularProgress />
        </Backdrop>
      )}

      {loading == "none" && err == "none" && (
        <Formik
          initialValues={
            currntCv ||
            ({
              _id: "",
              firstName: "",
              secondLastName: "",
              lastName: "",
              middleName: "",
              mail: "",
              phone: "",
              address: "",
              postal: "",
              city: "",
              birthDay: dayjs(),
              perfil: "",
              skills: [] as Skill[],
              formations: [] as Formation[],
              lenguages: [] as Language[],
              fromUser: "",
            } as Cv)
          }
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ values, handleSubmit }) => (
            <Form
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                flex: 1,
                minHeight: 0,
              }}
              onSubmit={handleSubmit}
            >
              {/* Área con las dos columnas */}
              <Box
                sx={{
                  flex: 1,
                  p: 2,
                  overflow: "hidden",
                  minHeight: 0,
                }}
              >
                <Grid2 container spacing={2} sx={{ height: "100%" }}>
                  {/* Columna izquierda con scroll independiente */}
                  <Grid2
                    size={{ xs: 12, md: 6 }}
                    sx={{
                      height: "100%",
                      overflowY: "auto",
                      "&::-webkit-scrollbar": {
                        width: "8px",
                      },
                      "&::-webkit-scrollbar-track": {
                        background: `${theme.palette.primary.light}`,
                        borderRadius: "4px",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        background: "#888",
                        borderRadius: "4px",
                      },
                      "&::-webkit-scrollbar-thumb:hover": {
                        background: "#555",
                      },
                    }}
                  >
                    <ResumeAccordion />
                  </Grid2>

                  {/* Columna derecha con scroll independiente */}
                  <Grid2
                    size={{ xs: 12, md: 6 }}
                    sx={{
                      height: "100%",
                      overflowY: "auto",
                      "&::-webkit-scrollbar": {
                        width: "8px",
                      },
                      "&::-webkit-scrollbar-track": {
                        background: `${theme.palette.primary.light}`,
                        borderRadius: "4px",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        background: "#888",
                        borderRadius: "4px",
                      },
                      "&::-webkit-scrollbar-thumb:hover": {
                        background: "#555",
                      },
                    }}
                  >
                    <pre style={{ whiteSpace: "pre-wrap" }}>
                      {JSON.stringify(values, null, 2)}
                    </pre>
                  </Grid2>
                </Grid2>
              </Box>

              {/* Footer fijo en la parte inferior */}
              <Box
                display={"flex"}
                p={2}
                justifyContent="flex-end"
                gap={2}
                alignItems="center"
                borderTop={`1px solid ${theme.palette.primary.divider}`}
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  flexShrink: 0,
                }}
              >
                <GrhButton
                  variant="secondary"
                  label="Cancelar"
                  onClick={() => navigate("/")}
                />
                <GrhButton variant="principal" type="submit" label="Subir" />
              </Box>
            </Form>
          )}
        </Formik>
      )}

      {err != "none" && (
        <Box sx={{ p: 2 }}>
          <Alert
            sx={{
              width: "100%",
            }}
            color="error"
          >
            <Box>
              {err == "fetch-obj" && (
                <Typography>Compilacion de objetos fallida</Typography>
              )}
            </Box>
            <Box width="100%">
              <GrhButton
                startIcon={<CachedIcon />}
                label="Recargar"
                onClick={() => setReload(!reload)}
              />
            </Box>
          </Alert>
        </Box>
      )}
    </Box>
  );
}
