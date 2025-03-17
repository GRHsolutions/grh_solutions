import React from 'react';
import { TextField as MuiTextField, TextFieldVariants } from '@mui/material'; // Importa el TextField de MUI correctamente
import { SxProps, useTheme } from '@mui/material/styles'; // Para acceder al tema

interface TextFieldProps {
  id?: string;
  name?: string;
  ref?: React.RefObject<HTMLInputElement | null>;
  value?: string | number;
  label?: string;
  handleChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  fullWidth?: boolean;
  type?: React.HTMLInputTypeAttribute | undefined;
  autoComplete?: string;
  variant?: TextFieldVariants;
  sx?: SxProps;
}

const GrhTextField: React.FC<TextFieldProps> = ({
  id,
  name,
  ref,
  value,
  label,
  handleChange,
  fullWidth = false,
  type,
  autoComplete,
  variant,
  sx
}) => {
  const theme = useTheme(); // Accede al tema para usarlo en el componente

  return (
    <MuiTextField
      id={id}
      name={name}
      label={label}
      variant={variant}
      inputRef={ref} // Utiliza el ref que se pasa como prop
      value={value} // Asigna el valor que se pasa al componente
      onChange={handleChange} // Pasa la función handleChange
      fullWidth={fullWidth}
      sx={{
        ...sx,
        '& .MuiInputLabel-root': {
          color: theme.palette.primary.contrastText, // Color constante para el label
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: theme.palette.primary.contrastText, // Color constante para el label cuando está enfocado
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: theme.palette.primary.divider, // Color constante para el borde en estado normal
          },
          '&:hover fieldset': {
            borderColor: theme.palette.primary.dark, // Color constante para el borde al hacer hover
          },
          '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.hover, // Color constante para el borde cuando está enfocado
          },
        },
      }}
      type={type} // Asumiendo que es un campo de correo electrónico
      autoComplete={autoComplete}
    />
  );
};

export default GrhTextField;