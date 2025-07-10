import { Field, useFormikContext } from "formik";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid2,
  Button,
  Box,
  IconButton,
  Divider,
  Checkbox,
  FormControlLabel,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Cv } from "../../../../domain/models/Cv/cv.entities";
import GrhTextField from "../../../../generics/grh-generics/textField";
import GrhCustomSelect from "../../../../generics/grh-generics/inputSelect";
import dayjs, { Dayjs } from "dayjs";
import { DatePickerComponent } from "../../../../components/simpleDatePicker/simpleDatePicker";

export interface DisplayDataFields  {
    name: string;
    type: "string" | "date" | "boolean" | "option";
    size: {
      xs: number;
      md: number;
    };
    rows?: number;
    label?: string;
    options?: { name: string, value: string }[];
  }

export interface DisplayDataProps {
  expand: boolean;
  current: "formations" | "skills" | "lenguages" | "none";
  fields: DisplayDataFields[];
  defaultItem: any;
  title: string;
  handleChange: () => void;
}

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
  // Obtener el array actual
  const currentArray = (values[current] as any[]) || [];

  const handleAddItem = () => {
    const newArray = [
      ...currentArray,
      {
        defaultItem,
        index: currentArray.length as number | 0,
      },
    ];
    setFieldValue(current, newArray);
  };

  const handleRemoveItem = (index: number) => {
    const newArray = currentArray.filter((_, i) => i !== index);
    setFieldValue(current, newArray);
  };

  const handleItemChange = (index: number, fieldName: string, value: any) => {
    const newArray = [...currentArray];
    newArray[index] = {
      ...newArray[index],
      [fieldName]: value,
    };
    setFieldValue(current, newArray);
  };

  return (
    <Accordion
      expanded={expand}
      onChange={() => {
        handleChange();
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" sx={{ ml: 2, color: "text.secondary" }}>
          ({currentArray.length} elementos)
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          {/* Botón para agregar nuevo elemento */}
          <Box sx={{ mb: 2 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddItem}
              size="small"
            >
              Agregar {title.slice(0, -1)}
            </Button>
          </Box>

          {/* Lista de elementos existentes */}
          {currentArray.length === 0 ? (
            <Typography
              variant="body2"
              color={theme.palette.primary.contrastText}
              sx={{ textAlign: "center", py: 2 }}
            >
              No hay elementos agregados. Haz clic en "Agregar" para comenzar.
            </Typography>
          ) : (
            currentArray.map((item, index) => (
              <Box key={index} sx={{ mb: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography 
                    variant="subtitle1"               
                    color={theme.palette.primary.contrastText}
                  >
                    {title.slice(0, -1)} {index + 1}
                  </Typography>
                  <IconButton
                    onClick={() => handleRemoveItem(index)}
                    color="error"
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>

                <Grid2 container spacing={2}>
                  {fields.map((field) => (
                    <Grid2
                      key={`${index}-${field.name}`}
                      size={{
                        xs: field.size.xs,
                        md: field.size.md,
                      }}
                    >
                      {field.type == "date" && (
                        <DatePickerComponent
                          value={item[field.name]}
                           label={field.label || ""}
                           onChange={(value: Dayjs | null) => {
                            handleItemChange(index, field.name, value);
                          }}
                          disabled={(field.name == "endDate" && item["finished"])}                      

                        />
                      )} 
                      {(field.type == "option" && field.options) && (
                        <GrhCustomSelect
                          name={`${current}[${index}].${field.name}`}
                          label={field.name}
                          value={item[field.name] || ""}
                          onChange={(e) => {
                            handleItemChange(index, field.name, e.target.value);
                          }}
                          fullWidth
                          variant="outlined" 
                          options={field.options}
                        />
                      )}
                      {(field.type == "string") && (
                        <GrhTextField
                          name={`${current}[${index}].${field.name}`}
                          label={field.name}
                          value={item[field.name] || ""}
                          onChange={(e) => {
                            handleItemChange(index, field.name, e.target.value);
                          }}
                          fullWidth
                          variant="outlined"
                          type={field.type}
                          multirows
                          rows={field.rows}
                        />
                      )}
                      {field.type == "boolean" && (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={item[field.name] || false}
                              onChange={(e) => {
                                handleItemChange(
                                  index,
                                  field.name,
                                  e.target.checked
                                );
                              }}
                            />
                          }
                          label={field.label || field.name}
                        />
                      )}
                    </Grid2>
                  ))}
                </Grid2>

                {index < currentArray.length - 1 && <Divider sx={{ mt: 2 }} />}
              </Box>
            ))
          )}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};