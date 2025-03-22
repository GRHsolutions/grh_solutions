import { useState, useEffect, useCallback, memo } from "react";
import { Box, FormHelperText, useTheme } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/es";

interface GenericDatePickerProps {
  value: Dayjs | null;
  onChange?: (date: Dayjs | null) => void;
  label: string;
  format?: string;
  disabled?: boolean;
  minDate?: Dayjs;
  maxDate?: Dayjs;
  isRequired?: boolean;
  sx?: any;
}

const GenericDatePicker = memo(
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
  }: GenericDatePickerProps) => {
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
            if (onChange) {
              onChange(newValue);
            }
          }
        } else {
          setError("Fecha inválida.");
        }
      },
      [onChange, minDate, maxDate]
    );

    return (
      <Box component="section" sx={{ paddingTop: "20px" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
          <DatePicker
            label={`${label}  ${isRequired ? "*" : ""}`}
            value={inputValue}
            onChange={handleDateChange}
            disabled={disabled}
            format={format}
            minDate={minDate}
            maxDate={maxDate}
            sx={{
              ...sx,
              width: "100%",
              "& .MuiInputLabel-root": {
                color: theme.palette.primary.contrastText, // Color constante para el label
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: theme.palette.primary.contrastText, // Color constante para el label cuando está enfocado
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: theme.palette.primary.divider, // Color constante para el borde en estado normal
                },
                "&:hover fieldset": {
                  borderColor: theme.palette.primary.dark, // Color constante para el borde al hacer hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: theme.palette.primary.hover, // Color constante para el borde cuando está enfocado
                },
              },
            }}
          />
          {error && <FormHelperText error>{error}</FormHelperText>}
        </LocalizationProvider>
      </Box>
    );
  }
);

export default GenericDatePicker;
