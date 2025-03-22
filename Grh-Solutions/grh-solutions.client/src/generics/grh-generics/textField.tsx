import React, { forwardRef } from 'react';
import { InputAdornment, TextField as MuiTextField, TextFieldVariants } from '@mui/material';
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
  placeholder?: string;
  startIcon?: React.ReactNode; // Add startIcon prop
  endIcon?: React.ReactNode;   // Add endIcon prop
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
    placeholder,
    startIcon,
    endIcon
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
      placeholder={placeholder}
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
      slotProps={{
        input:{
          startAdornment: startIcon && (
            <InputAdornment position="start">{startIcon}</InputAdornment>
          ),
          endAdornment: endIcon && (
            <InputAdornment position="end">{endIcon}</InputAdornment>
          )
        }
      }}
    />
  );
});

export default React.memo(GrhTextField); 
