import { Box } from "@mui/material";
import { TabConfig, TabsCompo } from "../../../../../generics/tabs/tabs";
import { NewForm, News } from "../../../../../domain/models/news/news.entities";
import { Form, Formik } from "formik";
import { MainInfo } from "./parts/mainInfo";
import GrhButton from "../../../../../generics/grh-generics/button";
import AddIcon from "@mui/icons-material/Add";
import * as Yup from "yup";
import { JustImages } from "./parts/justImages";
import { DragNDropVariables } from "../../../../../generics/grh-generics/DragNDrop";
import { Survey } from "./parts/survey";
import React from "react";
import { useNews } from "../../../../../hooks/news";

interface TabsFormProps {
  initialValue: News | null;
  edit: boolean;
}

const validationSchema = Yup.object({
  type: Yup.string()
    .oneOf(
      [
        "simple-publication",
        "publication-with-images",
        "publication-with-survey",
      ],
      "Tipo de publicación no válido"
    )
    .required("El tipo de publicación es obligatorio"),
  title: Yup.string()
    .required("El título es obligatorio")
    .max(100, "El título no puede exceder los 250 caracteres"),
  description: Yup.string()
    .required("La descripción es obligatoria")
    .max(500, "La descripción no puede exceder los 1000 caracteres"),

  images: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("El nombre es obligatorio"),
        type: Yup.string()
          //.matches(/^image\/(jpeg|png|gif|webp)$/, "Formato de imagen no válido")
          .required("El tipo de imagen es obligatorio"),
        size: Yup.number()
          //.max(5 * 1024 * 1024, "El tamaño de la imagen no debe superar los 5MB")
          .required("El tamaño es obligatorio"),
        base64: Yup.string().required("La imagen en base64 es obligatoria"),
      })
    )
    .when("type", {
      is: "publication-with-images",
      then: (schema) =>
        schema
          .min(1, "Debe subir al menos una imagen")
          .required("Debe subir al menos una imagen"),
      otherwise: (schema) => schema.notRequired(),
    }),

  form: Yup.array()
    .of(Yup.string().required("Cada pregunta debe ser un texto válido"))
    .when("type", {
      is: "publication-with-survey",
      then: (schema) =>
        schema
          .min(1, "Debe haber al menos una pregunta")
          .required("El formulario es obligatorio"),
      otherwise: (schema) => schema.notRequired(),
    }),
});

export const TabsForm = ({ initialValue, edit }: TabsFormProps) => {
  const [loading, setLoading]= React.useState(false);
  const { handleCreate } = useNews();

  const handleSubmit = (nw: NewForm) => {
    console.info("USING FORM FROM = ", edit);
    setLoading(true);
    handleCreate(nw);
    setLoading(false);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <Formik
        initialValues={
          {
            type: initialValue?.type ?? "simple-publication",
            title: initialValue?.title ?? "",
            description: initialValue?.description ?? "",
            images: initialValue?.images ?? [],
          } as NewForm
        }
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, isValid, setFieldValue }) => {
          const changeImages = (name: string, image: DragNDropVariables[]) => {
            setFieldValue(name, image);
          };

          const tabs: TabConfig[] = [
            {
              value: "1",
              label: "Inicializacion",
              content: <MainInfo value={values} handleChange={handleChange} loading={loading}/>,
              disabled: false,
            },
            {
              value: "2",
              label: "Carusel de imagenes",
              content: (
                <JustImages values={values} changeImages={changeImages} loading={loading}/>
              ),
              disabled: values.type !== "publication-with-images",
            },
            {
              value: "3",
              label: "Encuesta",
              content: <Survey loading={loading}/>,
              disabled: values.type !== "publication-with-survey",
            },
          ];

          return (
            <Form>
              {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
              <TabsCompo tabs={tabs} />
              <GrhButton
                type="submit"
                variant="principal"
                startIcon={<AddIcon />}
                label="Subir"
                sx={{
                  padding: "5rem",
                  width: "5.5rem",
                }}
                disabled={!isValid || loading}
              />
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};
