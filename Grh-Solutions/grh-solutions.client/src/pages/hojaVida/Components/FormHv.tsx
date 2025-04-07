import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Button, FormControl, MenuItem, Select, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import dayjs from "dayjs";
import { useState } from "react";
import GenericDatePicker from "../../../generics/grh-generics/inputDatePicker";
import GrhTextField from "../../../generics/grh-generics/textField";

interface ResumeAccordionProps {
  onChange: (values: Record<string, string>) => void;
  formData: Record<string, string>;
}

export default function ResumeAccordion({
  onChange,
  formData,
}: ResumeAccordionProps) {
  const [image, setImage] = useState<string | null>(formData.foto || null);
  const theme = useTheme();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setImage(reader.result);
          onChange({ ...formData, foto: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    > | { target: { name?: string; value: unknown } }
  ) => {
    const { name, value } = event.target;
    if (name) {
      onChange({ ...formData, [name]: value as string });
    } else {
      console.error("El campo 'name' no está definido en el evento.");
    }
  };

  const sections = [
    {
      title: "Información Personal",
      fields: [
        "Nombre",
        "Apellido",
        "Direccion",
        {
          name: "Tipo De Documento",
          label: "Tipo de Documento",
          type: "select",
          options: ["Cédula", "Pasaporte", "Otro"],
        },
        {
          name: "RH (Grupo sanguíneo)",
          label: "RH",
          type: "select",
          options: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"],
        },
      ],
    },
    { title: "Perfil", fields: ["Ocupacion", "Descripcion"] },
    {
      title: "Formación",
      fields: [
        "Titulo",
        "Institucion",
        { name: "Fecha De Graduacion", label: "Fecha de Graduación", type: "date" },
      ],
    },
    { title: "Experiencia", fields: ["Empresa", "Cargo", "Duracion"] },
    { title: "Habilidades", fields: ["Habilidad", "Nivel De Habilidad"] },
    { title: "Idiomas", fields: ["Idioma", "Nivel De Idioma"] },
  ];

  return (
    <Box sx={{ maxHeight: "80vh", overflowY: "auto", p: 2 }}>
      {sections.map(({ title, fields }) => (
        <Accordion
          defaultExpanded={title === "Información Personal"}
          key={title}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight="bold">{title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 2,
              }}
            >
              {title === "Información Personal" && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    gridColumn: "span 2",
                  }}
                >
                  <Avatar
                    src={image || undefined}
                    sx={{ width: 80, height: 80 }}
                  />
                  <Button variant="contained" component="label">
                    Subir Imagen
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </Button>
                </Box>
              )}

              {fields.map((field) => {
                const fieldName =
                  typeof field === "string" ? field : field.name;

                const inputStyles = {
                  backgroundColor: theme.palette.background.paper, 
                  "& .MuiInputBase-input": {
                    color: theme.palette.text.primary, 
                  },
                  "& .MuiInputLabel-root": {
                    color: theme.palette.text.primary,
                  },
                  "& .MuiOutlinedInput-root": {
                    borderColor: theme.palette.text.primary,
                    "&:hover fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: theme.palette.primary.main,
                      backgroundColor: theme.palette.background.paper,
                    },
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.text.primary,
                  },
                  "&:focus-within": {
                    backgroundColor: theme.palette.background.paper,
                  },
                  "& .MuiOutlinedInput-root.Mui-focused": {
                    backgroundColor: theme.palette.background.paper,
                  },
                };

                if (typeof field === "string") {
                  return (
                    <GrhTextField
                      key={fieldName}
                      name={fieldName} 
                      label={fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                      value={formData[fieldName] || ""}
                      onChange={handleInputChange}
                      fullWidth
                      sx={inputStyles}
                    />
                  );
                }

                if (field.type === "date") {
                  return (
                    <FormControl fullWidth key={fieldName}>
                      <GenericDatePicker
                        name={fieldName} // Aseguramos que el name se pase correctamente
                        label={field.label || fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                        value={formData[fieldName] ? dayjs(formData[fieldName]) : null} // Convertir a dayjs si es una cadena
                        onChange={(date) => {
                          if (fieldName) { // Validar que fieldName no sea undefined
                            onChange({
                              ...formData,
                              [fieldName]: date ? date.format("YYYY-MM-DD") : "", // Formatear la fecha o dejarla vacía
                            });
                          } else {
                            console.error("El campo 'fieldName' no está definido.");
                          }
                        }}
                        sx={inputStyles} // Aplicar los estilos dinámicos
                      />
                    </FormControl>
                  );
                }

                if (
                  field.type === "select" &&
                  "options" in field &&
                  Array.isArray(field.options)
                ) {
                  return (
                    <FormControl fullWidth key={fieldName}>
                      <Select
                        name={fieldName}  // Agregar name
                        value={formData[fieldName] || ""}
                        onChange={handleInputChange}
                        displayEmpty
                      >
                        <MenuItem value="">
                          {field.label || "Seleccione"}
                        </MenuItem>
                        {field.options?.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  );
                }
                return null;
              })}
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
