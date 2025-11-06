import { Formik, useFormikContext } from "formik";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid2,
  Button,
  Box,
  IconButton,
  Checkbox,
  FormControlLabel,
  useTheme,
  Card,
  CardContent,
  CardActions,
  Chip,
  CardHeader,
  Theme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Cv } from "../../../../domain/models/Cv/cv.entities";
import GrhTextField from "../../../../generics/grh-generics/textField";
import GrhCustomSelect from "../../../../generics/grh-generics/inputSelect";
import dayjs, { Dayjs } from "dayjs";
import GenericDatePicker from "../../../../generics/grh-generics/inputDatePicker";
import React from "react";

export interface DisplayDataFields {
  name: string;
  type: "string" | "date" | "boolean" | "option";
  size: {
    xs: number;
    md: number;
  };
  rows?: number;
  label?: string;
  options?: { name: string; value: string }[];
}

export interface DisplayDataProps {
  expand: boolean;
  current: "formations" | "skills" | "lenguages" | "none";
  fields: DisplayDataFields[];
  defaultItem: any;
  title: string;
  handleChange: () => void;
}

export const getChipColor = (
  finished: boolean,
  level: string | undefined,
  theme: Theme
): string => {
  if (typeof finished === "boolean") {
    return finished ? theme.palette.success.light : theme.palette.warning.light;
  }

  const normalizedLevel = level?.toUpperCase() ?? "NONE";

  const colorMap: Record<string, string> = {
    PRINCIPIANTE: theme.palette.error.light,
    INTERMEDIO: theme.palette.info.light,
    BUENO: theme.palette.primary.light,
    ALTO: theme.palette.secondary.light,
    EXCELENTE: theme.palette.success.main,
    FLUIDO: theme.palette.success.main,
    A1: theme.palette.grey[300],
    A2: theme.palette.grey[400],
    B1: theme.palette.grey[500],
    B2: theme.palette.grey[600],
    C1: theme.palette.grey[700],
    C2: theme.palette.grey[800],
  };

  return colorMap[normalizedLevel] ?? theme.palette.grey[300]; // default
};

export const DisplayData = ({
  expand,
  handleChange,
  fields,
  current,
  title,
  defaultItem,
}: DisplayDataProps) => {
  const { values, setFieldValue } = useFormikContext<Cv>();
  const theme = useTheme();

  const currentArray = (values[current] as any[]) || [];
  const [editIndex, setEditIndex] = React.useState<number | null>(null);
  const [newItem, setNewItem] = React.useState<any | null>(null);

  const openForm = (item = defaultItem, index: number | null = null) => {
    setNewItem(item);
    setEditIndex(index);
  };

  const handleSaveItem = (itemToSave: any) => {
    const newArray = [...currentArray];

    if (editIndex !== null) {
      // Editing
      newArray[editIndex] = itemToSave;
    } else {
      // Adding
      newArray.push(itemToSave);
    }

    setFieldValue(current, newArray);
    handleCancelForm();
  };

  const handleCancelForm = () => {
    setNewItem(null);
    setEditIndex(null);
  };

  const handleRemoveItem = (index: number) => {
    const newArray = currentArray.filter((_, i) => i !== index);
    setFieldValue(current, newArray);
  };

  return (
    <Accordion expanded={expand} onChange={handleChange}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          {/* Botón para agregar nuevo elemento */}
          {!newItem && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => openForm()}
              size="small"
            >
              Agregar {title.slice(0, -1)}
            </Button>
          )}

          {/* Formulario de crear/editar item */}
          {newItem && (
            <Formik
              initialValues={newItem}
              onSubmit={(values) => handleSaveItem(values)}
            >
              {({ values, setFieldValue, handleSubmit }) => (
                <Box sx={{ mt: 2 }}>
                  <Grid2 container spacing={2}>
                    {fields.map((field, index) => (
                      <Grid2
                        key={`${field.name}-${index}`}
                        size={{
                          xs: field.size.xs,
                          md: field.size.md,
                        }}
                      >
                        {field.type === "date" && (
                          <GenericDatePicker
                            value={dayjs(values[field.name]) || null}
                            label={field.label || ""}
                            onChange={(value: Dayjs | null) =>
                              setFieldValue(field.name, value)
                            }
                            name={field.label || ""}
                          />
                        )}
                        {field.type === "option" && field.options && (
                          <GrhCustomSelect
                            name={field.name}
                            label={field.label || field.name}
                            value={values[field.name] || ""}
                            onChange={(e) =>
                              setFieldValue(field.name, e.target.value)
                            }
                            fullWidth
                            variant="outlined"
                            options={field.options}
                          />
                        )}
                        {field.type === "string" && (
                          <GrhTextField
                            name={field.name}
                            label={field.label || field.name}
                            value={values[field.name] || ""}
                            onChange={(e) =>
                              setFieldValue(field.name, e.target.value)
                            }
                            fullWidth
                            variant="outlined"
                            type="text"
                            rows={field.rows}
                            multirows
                          />
                        )}
                        {field.type === "boolean" && (
                          <FormControlLabel
                            control={
                              <Checkbox
                                sx={{
                                  color: theme.palette.primary.main,
                                  "&.Mui-checked": {
                                    color: theme.palette.success.main,
                                  },
                                }}
                                checked={values[field.name] || false}
                                onChange={(e) =>
                                  setFieldValue(field.name, e.target.checked)
                                }
                              />
                            }
                            label={field.label || field.name}
                          />
                        )}
                      </Grid2>
                    ))}
                  </Grid2>

                  <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleSubmit()}
                    >
                      {editIndex !== null
                        ? `Editar ${title.slice(0, -1)}`
                        : `Guardar ${title.slice(0, -1)}`}
                    </Button>

                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      startIcon={<CloseIcon />}
                      onClick={handleCancelForm}
                    >
                      Cancelar
                    </Button>
                  </Box>
                </Box>
              )}
            </Formik>
          )}

          {/* Lista de elementos existentes */}
          {currentArray.length === 0 ? (
            <Typography
              variant="body2"
              color={theme.palette.text.secondary}
              sx={{ textAlign: "center", py: 2 }}
            >
              No hay elementos agregados.
            </Typography>
          ) : (
            currentArray.map((item, index) => (
              <Card
                key={index}
                elevation={3}
                sx={{
                  mt: index == 0 ? 1 : 0,
                  mb: 2,
                  borderRadius: 2,
                }}
              >
                <CardHeader
                  title={item.tittle || item.name || "Sin título"}
                  // subheader={
                  //   item.level ||
                  //   (item.finished ? "Finalizado" : "En proceso") ||
                  //   ""
                  // }
                  action={
                    <Chip
                      label={item.level || (item.finished ? "Finalizado" : "En proceso")|| "none"}
                      sx={{
                        backgroundColor: getChipColor(
                          item.finished,
                          item.level,
                          theme
                        ),
                      }}
                      size="small"
                      variant="outlined"
                    />
                  }
                />
                <CardContent>
                  <Typography>{item.descroption || ""}</Typography>
                </CardContent>
                <CardActions>
                  <IconButton
                    sx={{
                      color: theme.palette.blue["400"],
                    }}
                    size="small"
                    onClick={() => openForm(item, index)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => handleRemoveItem(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            ))
          )}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
