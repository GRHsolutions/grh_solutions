import { Accordion, AccordionSummary, AccordionDetails, Typography, Avatar, Box, Select, MenuItem, Button, TextField, FormControl } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Form, Formik } from "formik";
import GrhTextField from "../../../generics/grh-generics/textField";
import { useState } from "react";

interface ResumeAccordionProps {
  onChange: (values: Record<string, string>) => void;
  formData: Record<string, string>; // Nuevo: Recibe los valores actuales
}

export default function ResumeAccordion({ onChange, formData }: ResumeAccordionProps) {
  const [image, setImage] = useState<string | null>(formData.foto || null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setImage(reader.result);
          onChange({ ...formData, foto: reader.result }); // Mantener valores anteriores
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const sections = [
    {
      title: "Información Personal",
      fields: [
        "nombre",
        "apellido",
        "direccion",
        { name: "tipoDocumento", label: "Tipo de Documento", type: "select", options: ["Cédula", "Pasaporte", "Otro"] },
        { name: "rh", label: "RH", type: "select", options: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"] }
      ]
    },
    { title: "Perfil", fields: ["ocupacion", "descripcion"] },
    { title: "Formación", fields: ["titulo", "institucion", { name: "fechaGraduacion", label: "Fecha de Graduación", type: "date" }] },
    { title: "Experiencia", fields: ["empresa", "cargo", "duracion"] },
    { title: "Habilidades", fields: ["habilidad", "nivel"] },
    { title: "Idiomas", fields: ["idioma", "nivel"] },
  ];

  return (
    <Box sx={{ maxHeight: "80vh", overflowY: "auto", p: 2 }}>
      {sections.map(({ title, fields }) => (
        <Accordion defaultExpanded={title === "Información Personal"} key={title}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight="bold">{title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Formik
              initialValues={fields.reduce<Record<string, string>>((acc, field) => {
                const fieldName = typeof field === "string" ? field : field.name;
                acc[fieldName] = formData[fieldName] || ""; // Mantener valores previos
                return acc;
              }, {})}
              onSubmit={() => {}}
            >
              {({ values, handleChange }) => (
                <Form
                  onChange={() => {
                    onChange({ ...formData, ...values }); // Fusiona los datos
                  }}
                >
                  <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 2 }}>
                    {title === "Información Personal" && (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2, gridColumn: "span 2" }}>
                        <Avatar src={image || undefined} sx={{ width: 80, height: 80 }} />
                        <Button variant="contained" component="label">
                          Subir Imagen
                          <input type="file" hidden accept="image/*" onChange={handleImageChange} />
                        </Button>
                      </Box>
                    )}

                    {fields.map((field) => {
                      const fieldName = typeof field === "string" ? field : field.name;

                      if (typeof field === "string") {
                        return (
                          <GrhTextField
                            key={fieldName}
                            name={fieldName}
                            label={fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                            value={values[fieldName] || ""}
                            onChange={handleChange}
                            fullWidth
                          />
                        );
                      }

                      if (field.type === "date") {
                        return (
                          <FormControl fullWidth key={fieldName}>
                            <TextField
                              name={fieldName}
                              type="date"
                              label={field.label || fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                              variant="outlined"
                              value={values[fieldName] || ""}
                              onChange={handleChange}
                              fullWidth
                            />
                          </FormControl>
                        );
                      }

                      if (field.type === "select" && "options" in field && Array.isArray(field.options)) {
                        return (
                          <FormControl fullWidth key={fieldName}>
                            <Select
                              name={fieldName}
                              value={values[fieldName] || ""}
                              onChange={handleChange}
                              displayEmpty
                            >
                              <MenuItem value="">
                                {field.label || "Seleccione"}
                              </MenuItem>
                              {field.options?.map((option) => (
                                <MenuItem key={option} value={option}>{option}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        );
                      }
                      return null;
                    })}
                  </Box>
                </Form>
              )}
            </Formik>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
