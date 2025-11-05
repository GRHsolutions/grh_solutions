import React, { forwardRef } from "react";
import {
  Box,
  InputAdornment,
  TextField as MuiTextField,
  TextFieldVariants,
  Typography,
} from "@mui/material";
import { SxProps, useTheme } from "@mui/material/styles";

interface TextFieldProps {
  id?: string;
  name?: string;
  value?: string | number;
  label?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  fullWidth?: boolean;
  type?: React.HTMLInputTypeAttribute;
  autoComplete?: string;
  variant?: TextFieldVariants;
  sx?: SxProps;
  disabled?: boolean;
  placeholder?: string;
  startIcon?: React.ReactNode; // Add startIcon prop
  endIcon?: React.ReactNode; // Add endIcon prop
  error?: boolean; // Prop para indicar si hay error
  helperText?: string; // Prop para mostrar el mensaje de error
  multirows?: boolean;
  rows?: number;
  clickableAdornment?: {
    start?: () => void;
    end?: () => void;
  }; // Prop para indicar si el adornment es clickable
  numeric?: boolean;
  lenght?: number;
}

const GrhTextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      id,
      name,
      value,
      label,
      onChange,
      fullWidth = false,
      type = "text",
      autoComplete,
      variant = "outlined",
      sx = {},
      disabled = false,
      placeholder,
      startIcon,
      endIcon,
      error = false, // Recibimos el estado de error
      helperText, // Recibimos el mensaje de error
      clickableAdornment, // Recibimos la prop para adornos clickeables
      multirows,
      rows,
      lenght,
    },
    ref
  ) => {
    const theme = useTheme();
    const [count, setCount] = React.useState(0);

    // Función para manejar el clic en los adornos, asegurándonos de que no se ejecute inmediatamente.
    const handleStartAdornmentClick = () => {
      if (clickableAdornment?.start) {
        clickableAdornment.start();
      }
    };

    const handleEndAdornmentClick = () => {
      if (clickableAdornment?.end) {
        clickableAdornment.end();
      }
    };

    return (
      <Box sx={{ position: "relative", width: fullWidth ? "100%" : "auto" }}>
        <MuiTextField
          id={id}
          name={name}
          label={label}
          variant={variant}
          inputRef={ref}
          value={value}
          onChange={(e) => {
            if (lenght) {
              setCount(e.currentTarget.value.length);
            }
            if (onChange) {
              onChange(e);
            }
          }}
          fullWidth={fullWidth}
          disabled={disabled}
          placeholder={placeholder}
          multiline={multirows}
          rows={rows}
          sx={{
            ...sx,
            "& .MuiInputLabel-root": {
              color: theme.palette.primary.contrastText, // Color constante para el label
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: theme.palette.primary.contrastText, // Color constante para el label cuando está enfocado
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: theme.palette.primary.contrastText, // Color constante para el borde en estado normal
              },
              "&:hover fieldset": {
                borderColor: theme.palette.primary.contrastText, // Color constante para el borde al hacer hover
              },
              "&.Mui-focused fieldset": {
                borderColor: theme.palette.primary.contrastText, // Color constante para el borde cuando está enfocado
              },
            },
            "& .MuiInputBase-input": {
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-track": {
                background: theme.palette.primary.light,
                borderRadius: "4px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#888",
                borderRadius: "4px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: "#555",
              },
            },
            "& .MuiInputBase-inputMultiline": {
              overflowY: "auto", // Hace visible la barra de desplazamiento
            },
          }}
          type={type}
          autoComplete={autoComplete}
          slotProps={{
            htmlInput: { maxLength: lenght },
            inputLabel: {
              sx: {
                color: theme.palette.primary.contrastText,
                "&.Mui-focused": {
                  color: theme.palette.primary.contrastText,
                },
              },
            },
            input: {
              disableUnderline: true,
              startAdornment: startIcon && (
                <InputAdornment
                  onClick={handleStartAdornmentClick}
                  position="start"
                  style={{
                    cursor: clickableAdornment?.start ? "pointer" : "default",
                  }} // Cambiar cursor si es clickable
                >
                  {startIcon}
                </InputAdornment>
              ),
              endAdornment: endIcon && (
                <InputAdornment
                  onClick={handleEndAdornmentClick}
                  position="end"
                  style={{
                    cursor: clickableAdornment?.end ? "pointer" : "default",
                  }} // Cambiar cursor si es clickable
                >
                  {endIcon}
                </InputAdornment>
              ),
              sx: {
                "& .MuiInputBase-input": {
                  borderBottom: `1px solid ${
                    variant === "standard"
                      ? theme.palette.primary.contrastText
                      : "transparent"
                  }`,

                  "&:focus": {
                    "&": {
                      borderBottom: `1px solid ${
                        variant === "standard"
                          ? theme.palette.primary.contrastText
                          : "transparent"
                      }`,
                    },
                  },
                },
              },
            },
          }}
          error={error} // Activamos el error si la prop `error` es true
          helperText={helperText} // Mostramos el mensaje de error si existe
        />

        {/* Contador de caracteres */}
        {lenght && (
          <Typography
            variant="caption"
            sx={{
              position: "absolute",
              bottom: -20,
              right: 0,
              color: "text.secondary",
              fontSize: "0.75rem",
            }}
          >
            {count}/{lenght}
          </Typography>
        )}
      </Box>
    );
  }
);

export default GrhTextField;
