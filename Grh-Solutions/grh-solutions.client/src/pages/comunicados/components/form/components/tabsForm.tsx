import { Box } from "@mui/material";
import { TabConfig, TabsCompo } from "../../../../../generics/tabs/tabs";
import { News } from "../../../../../domain/models/news/news.entities";
import { Form, Formik } from "formik";
import { MainInfo } from "./parts/mainInfo";
import GrhButton from "../../../../../generics/grh-generics/button";
import AddIcon from '@mui/icons-material/Add';
import * as Yup from 'yup';

interface TabsFormProps {
  initialValue: News | null;
  edit: boolean;
}

const validationSchema = Yup.object({
  type: Yup.string()
    .oneOf(["simple-publication", "publication-with-images", "publication-with-survey"], "Tipo de publicación no válido")
    .required("El tipo de publicación es obligatorio"),
  title: Yup.string()
    .required("El título es obligatorio")
    .min(40, "El título debe tener al menos 40 caracteres")
    .max(250, "El título no puede exceder los 250 caracteres"),
  description: Yup.string()
    .required("La descripción es obligatoria")
    .min(250, "La descripción debe tener al menos 250 caracteres")
    .max(1000, "La descripción no puede exceder los 1000 caracteres"),

  images: Yup.array()
  .of(
    Yup.object().shape({
      name: Yup.string().required("El nombre es obligatorio"),
      type: Yup.string()
        .matches(/^image\/(jpeg|png|gif|webp)$/, "Formato de imagen no válido")
        .required("El tipo de imagen es obligatorio"),
      size: Yup.number()
        .max(5 * 1024 * 1024, "El tamaño de la imagen no debe superar los 5MB")
        .required("El tamaño es obligatorio"),
      base64: Yup.string().required("La imagen en base64 es obligatoria"),
    })
  )
  .min(1, "Debe subir al menos una imagen"),

  form: Yup.array()
    .of(Yup.string().required("Cada pregunta debe ser un texto válido"))
    .when("type", {
      is: "publication-with-survey",
      then: (schema) => schema.min(1, "Debe haber al menos una pregunta").required("El formulario es obligatorio"),
      otherwise: (schema) => schema.notRequired(),
    }),
});

export const TabsForm = ({ initialValue, edit }: TabsFormProps) => {
  const CreateNew = (nw: News) => {
    console.log(edit);
    console.log(nw);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <Formik
        initialValues={{
          type: initialValue?.type ?? "simple-publication",
          title: initialValue?.title ?? "",
          description: initialValue?.description ?? ""
        } as News}
        validationSchema={validationSchema}
        onSubmit={CreateNew}
      >
        {({ values, handleChange, isValid, setFieldValue }) => {
          const changeImages = (name: string, image: string[]) => {
            setFieldValue(name, image)
          }

          const tabs: TabConfig[] = [
            {
              value: "1",
              label: "Inicializacion",
              content: <MainInfo value={values} handleChange={handleChange}/>,
            },
            {
              value: "2",
              label: "Carusel de imagenes",
              content: <>Contenido Adicional</>,
            },
            {
              value: "3",
              label: "Encuesta",
              content: <>any</>,
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
                  padding: '5rem',
                  width: '5.5rem'
                }}
                disabled={!isValid}
              />
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};
