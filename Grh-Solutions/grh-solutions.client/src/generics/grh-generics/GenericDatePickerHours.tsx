import { useState, useEffect, useCallback, memo } from "react";
import { Box, FormHelperText, useTheme } from "@mui/material";
import {
  LocalizationProvider,
  DatePicker,
  DateTimePicker, // 👈 Importamos este
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/es";

interface GenericDatePickerHoursProps {
  name: string;
  value: Dayjs | null;
  onChange?: (date: Dayjs | null) => void;
  label: string;
  format?: string;
  disabled?: boolean;
  minDate?: Dayjs;
  maxDate?: Dayjs;
  isRequired?: boolean;
  sx?: any;
  type?: "date" | "datetime"; // 👈 Nueva prop
}

const GenericDatePickerHours = memo(
  ({
    value,
    onChange,
    label,
    format = "DD-MM-YYYY",
    disabled = false,
    minDate,
    maxDate,
    sx,
    isRequired = false,
    type = "date", // 👈 Por defecto solo fecha
  }: GenericDatePickerHoursProps) => {
    const [inputValue, setInputValue] = useState<Dayjs | null>(value || null);
    const [error, setError] = useState<string>("");
    const theme = useTheme();

    useEffect(() => {
      setInputValue(value);
    }, [value]);

    const handleDateChange = useCallback(
      (newValue: Dayjs | null) => {
        if (newValue && dayjs.isDayjs(newValue)) {
          if (
            (minDate && newValue.isBefore(minDate)) ||
            (maxDate && newValue.isAfter(maxDate))
          ) {
            setError("Fecha fuera de rango permitido.");
          } else {
            setError("");
            setInputValue(newValue);
            if (onChange) onChange(newValue);
          }
        } else {
          setError("Fecha inválida.");
        }
      },
      [onChange, minDate, maxDate]
    );

    const commonProps = {
      label: `${label} ${isRequired ? "*" : ""}`,
      value: inputValue,
      onChange: handleDateChange,
      disabled,
      format: type === "datetime" ? "DD-MM-YYYY HH:mm" : format,
      minDate,
      maxDate,
      sx: {
        ...sx,
        width: "100%",
        "& .MuiInputLabel-root": {
          color: theme.palette.primary.contrastText,
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: theme.palette.primary.contrastText,
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: theme.palette.primary.divider,
          },
          "&:hover fieldset": {
            borderColor: theme.palette.primary.dark,
          },
          "&.Mui-focused fieldset": {
            borderColor: theme.palette.primary.hover,
          },
        },
      },
    };

    return (
      <Box component="section" sx={{ paddingTop: "20px" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
          {type === "datetime" ? (
            <DateTimePicker {...commonProps} />
          ) : (
            <DatePicker {...commonProps} />
          )}
          {error && <FormHelperText error>{error}</FormHelperText>}
        </LocalizationProvider>
      </Box>
    );
  }
);

export default GenericDatePickerHours;
