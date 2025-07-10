import GrhTextField from "../../../generics/grh-generics/textField";
import { useFormikContext } from "formik";
import { Cv } from "../../../domain/models/Cv/cv.entities";
import { Grid2 } from "@mui/material";
import React from "react";
import { DisplayData, DisplayDataFields } from "./displayData/display";
import dayjs from "dayjs";
import { LANGUAGE_LEVELS, SKILL_LEVELS } from "../HojaVidaPage";

interface Field {
  name: string;
  type: "string" | "date" | "mail" | "array";
  size: {
    xs: number;
    md: number;
  };
  rows?: number;
  label?: string;
}

export default function ResumeAccordion() {
  const { values, setFieldValue } = useFormikContext<Cv>();
  const [current, setCurrent] = React.useState<
    "formations" | "skills" | "lenguages" | "none"
  >("none");

  const fields: Field[] = [
    {
      name: "firstName",
      type: "string",
      size: { xs: 12, md: 6 },
      label: "Primer nombre",
    },
    {
      name: "middleName",
      type: "string",
      size: { xs: 12, md: 6 },
      label: "Segundo nombre",
    },
    {
      name: "lastName",
      type: "string",
      size: { xs: 12, md: 6 },
      label: "Primer apellido",
    },
    {
      name: "secondLastName",
      type: "string",
      size: { xs: 12, md: 6 },
      label: "Segundo apellido",
    },
    { name: "mail", type: "mail", size: { xs: 12, md: 6 }, label: "Correo" },
    {
      name: "phone",
      type: "string",
      size: { xs: 12, md: 6 },
      label: "Telefono",
    },
    {
      name: "address",
      type: "string",
      size: { xs: 12, md: 12 },
      label: "Direccion",
    },
    {
      name: "postal",
      type: "string",
      size: { xs: 12, md: 6 },
      label: "Codigo postal",
    },
    { name: "city", type: "string", size: { xs: 12, md: 6 }, label: "Ciudad" },
    {
      name: "birthDay",
      type: "date",
      size: { xs: 12, md: 6 },
      label: "Primer nombre",
    },
    {
      name: "perfil",
      type: "string",
      size: { xs: 12, md: 12 },
      rows: 5,
      label: "Perfil",
    },
    { name: "formations", type: "array", size: { xs: 12, md: 12 } },
    { name: "skills", type: "array", size: { xs: 12, md: 12 } },
    { name: "lenguages", type: "array", size: { xs: 12, md: 12 } },
  ];

  const fieldFormations: DisplayDataFields[] = [
    {
      name: "tittle",
      label: "Titulo",
      type: "string",
      size: { xs: 12, md: 6 },
    },
    {
      name: "school",
      label: "Instituto",
      type: "string",
      size: { xs: 12, md: 6 },
    },
    {
      name: "city",
      label: "Ciudad",
      type: "string",
      size: { xs: 12, md: 12 },
    },
    {
      name: "startDate",
      label: "Fecha de inicio",
      type: "date",
      size: { xs: 6, md: 6 },
    },
    {
      name: "endDate",
      label: "Fecha de finalizacion",
      type: "date",
      size: { xs: 6, md: 6 },
    },
    {
      name: "finished",
      label: "Ha concluido?",
      type: "boolean",
      size: { xs: 12, md: 6 },
    },
    {
      name: "descroption",
      label: "Descripcion",
      type: "string",
      size: { xs: 12, md: 12 },
      rows: 4
    }
  ];

  const fieldSkills :DisplayDataFields[] = [
    {
      name: "name",
      label: "Nombre",
      type: "string",
      size: { xs: 12, md: 6 },
    },
    {
      name: "level",
      label: "Nivel de habilidad",
      type: "option",
      size: { xs: 12, md: 6 },
      options: SKILL_LEVELS
    },
  ] 

    const fieldLenguages :DisplayDataFields[] = [
    {
      name: "name",
      label: "Nombre",
      type: "string",
      size: { xs: 12, md: 6 },
    },
    {
      name: "level",
      label: "Nivel de lengua",
      type: "option",
      size: { xs: 12, md: 6 },
      options: LANGUAGE_LEVELS
    },
  ] 

  return (
    <Grid2 container spacing={2}>
      {fields.map((f, i) => {
        if (f.type === "array") {
          if (f.name === "formations") {
            return (
              <Grid2 size={{ xs: f.size.xs, md: f.size.md }}>
                <DisplayData
                  key={`${i}`}
                  expand={current == "formations"}
                  fields={fieldFormations}
                  handleChange={() => {
                    setCurrent("formations");
                  }}
                  current={current}
                  title={"Formacion"}
                  defaultItem={{
                    tittle: "",
                    school: "",
                    city: "",
                    startDate: dayjs().toDate(),
                    endDate: dayjs().toDate(),
                    finished: false,
                    descroption: "",
                    index: 0,
                  }}
                />
              </Grid2>
            );
          }
          if (f.name === "skills") {
            return (
              <Grid2 size={{ xs: f.size.xs, md: f.size.md }}>
                <DisplayData
                  key={`${i}`}
                  expand={current == "skills"}
                  fields={fieldSkills}
                  handleChange={() => {
                    setCurrent("skills");
                  }}
                  current={current}
                  title={"Habilidades"}
                  defaultItem={{
                    name: "",
                    level: "PRINCIPIANTE",
                    index: 0,
                  }}
                />
              </Grid2>
            );
          }
          if (f.name === "lenguages") {
            return (
              <Grid2 size={{ xs: f.size.xs, md: f.size.md }}>
                <DisplayData
                  key={`${i}`}
                  expand={current == "lenguages"}
                  fields={fieldLenguages}
                  handleChange={() => {
                    setCurrent("lenguages");
                  }}
                  current={current}
                  title={"Lenguajes"}
                  defaultItem={{
                    name: "",
                    level: "A1",
                    index: 0,
                  }}
                />
              </Grid2>
            );
          }
          return <Grid2 size={{ xs: f.size.xs, md: f.size.md }}></Grid2>;
        } // puedes manejar arrays aparte si deseas

        if (f.type === "string" || f.type === "mail") {
          return (
            <Grid2 size={{ xs: f.size.xs, md: f.size.md }}>
              <GrhTextField
                variant="standard"
                key={`${f.name} + ${i}`}
                name={f.name}
                label={f.name}
                value={(values as any)[f.name]}
                onChange={(e) => {
                  setFieldValue(f.name, e.target.value);
                }}
                fullWidth
                multirows={f.rows != undefined && f.rows > 0}
                rows={f.rows}
              />
            </Grid2>
          );
        }
      })}
    </Grid2>
  );
}
