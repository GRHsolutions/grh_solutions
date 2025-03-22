import React, { forwardRef } from 'react';
import { TextField as MuiTextField, TextFieldVariants } from '@mui/material';
import { SxProps, useTheme } from '@mui/material/styles';

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
}

const GrhTextField = forwardRef<HTMLInputElement, TextFieldProps>((
  {
    id,
    name,
    value,
    label,
    onChange,
    fullWidth = false,
    type = 'text',
    autoComplete,
    variant = 'outlined',
    sx = {},
    disabled = false,
  },
  ref
) => {
  const theme = useTheme();

  return (
    <MuiTextField
      id={id}
      name={name}
      label={label}
      variant={variant}
      inputRef={ref}
      value={value}
      onChange={onChange}
      fullWidth={fullWidth}
      disabled={disabled}
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
      type={type}
      autoComplete={autoComplete}
    />
  );
});

export default GrhTextField;
