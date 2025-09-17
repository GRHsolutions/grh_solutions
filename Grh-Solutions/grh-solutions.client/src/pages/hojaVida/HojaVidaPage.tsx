import {
  Alert,
  Backdrop,
  Box,
  CircularProgress,
  Grid2,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import { CVRepository } from "../../infrastructure/repositories/cv/cv";
import { CvService } from "../../domain/services/cv/cv2.service";
import { Cv, LanguageLevel, SkillLevel } from "../../domain/models/Cv/cv.entities";
import { useNotifications } from "../../contexts/NotificationContext";
import * as Yup from "yup";
import dayjs from "dayjs";
import ResumeAccordion from "./Components/FormHv";
import GrhButton from "../../generics/grh-generics/button";
import CachedIcon from "@mui/icons-material/Cached";

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

export const SKILL_LEVELS: {name: string, value: string}[] = [
  { name: "Principiante", value: "PRINCIPIANTE" },
  { name: "Intermedio", value: "INTERMEDIO" },
  { name: "Bueno", value: "BUENO" },
  { name: "Alto", value: "ALTO" },
  {name: "Excelente", value: "EXCELENTE"},
];

export default function HojaVidaPage() {
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

  // Efecto para asegurar que la vista previa se actualice de inmediato
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
    <Grid2
      container
      width={"100%"}
      display={"flex"}
      overflow={"auto"}
      p={2}
    >
      <Backdrop open={loading != "none"}>
        <CircularProgress />
      </Backdrop>
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
              skills: [
                {
                  name: "",
                  level: "PRINCIPIANTE",
                },
              ],
              formations: [
                {
                  tittle: "",
                  school: "",
                  city: "",
                  startDate: dayjs(),
                  endDate: dayjs(),
                  finished: false,
                  descroption: "",
                  index: 0,
                },
              ],
              lenguages: [
                {
                  name: "",
                  level: "A1",
                },
              ],
              fromUser: "",
            } as Cv)
          }
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ values }) => {
            return (
              <Form style={{ width: "100%" }}>
                <Grid2 size={{ xs: 8, md: 6 }}>
                  <ResumeAccordion />
                </Grid2>

                <Grid2 size={{ xs: 4, md: 6 }}>
                  <pre>{JSON.stringify(values, null, 2)}</pre>
                </Grid2>
              </Form>
            );
          }}
        </Formik>
      )}

      {err != "none" && (
        <Grid2 size={12}>
          <Alert
            sx={{
              width: "98.4%",
            }}
            color={"error"}
          >
            <Box>
              {err == "fetch-obj" && (
                <Typography>Compilacion de objetos fallida</Typography>
              )}
            </Box>
            <Box width={"100%"}>
              <GrhButton
                startIcon={<CachedIcon />}
                label="Recargar"
                onClick={() => {
                  setReload(!reload);
                }}
              />
            </Box>
          </Alert>
        </Grid2>
      )}

      {/* <div
        style={{
          display: "flex",
          width: "80vw",
          height: "100%",
          border: "3px solid " + theme.palette.primary.boxShadow,
        }}
      >
        <div
          style={{
            width: "50%",
            backgroundColor: theme.palette.primary.light,
            boxShadow: theme.palette.primary.boxShadow,
            height: "100%",
            overflowY: "hidden",
          }}
        >
          <ResumeAccordion onChange={setFormData} formData={formData} />
        </div>

        {!usePhoneScreen && (
          <div
            style={{
              width: "50%",
              backgroundColor: theme.palette.primary.light,
              boxShadow: theme.palette.primary.boxShadow,
              height: "100%",
            }}
          >
            <PreviewHv data={formData} />
          </div>
        )}
      </div> */}
    </Grid2>
  );
}
