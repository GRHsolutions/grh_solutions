import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  SelectChangeEvent,
  Box,
  useTheme,
} from "@mui/material";
import { Key } from "react";

interface Option<T = string> {
  value: T;
  name: string;
}

interface CustomSelectProps<T> {
  label: string;
  options: Option<T>[];
  required?: boolean;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  value: T | "";
  onChange: (event: SelectChangeEvent<T>) => void;
  onClear?: () => void;
  id?: string;
  name?: string;
  sx?: any;
  disabled?: boolean;
  variant?: any;
  fullWidth?: boolean
}

const GrhCustomSelect = <T extends string | number>({
  label,
  options,
  required = false,
  placeholder = "",
  error = false,
  helperText = "",
  value,
  onChange,
  id,
  name,
  sx,
  disabled,
  variant,
  fullWidth = false
}: CustomSelectProps<T>) => {
  const handleChange = (event: SelectChangeEvent<T>) => {
    onChange(event);
  };

  const theme = useTheme();

  return (
    <Box 
      sx={{ 
        paddingTop: "10px",
        position: "relative", 
        width: '100%', 
        display: 'block',
        borderColor: 'transparent',
        
        // Estilos para el Select principal
        '& .MuiOutlinedInput-root': {
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.primary.contrastText,
          borderColor: 'transparent',
          
          // Border normal
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.background,
            borderWidth: 1,
          },
          
          // Estado hover
          // '&:hover:not(.Mui-disabled)': {
          //   backgroundColor: theme.palette.primary.hover || theme.palette.action?.hover,
          //   '& .MuiOutlinedInput-notchedOutline': {
          //     borderColor: theme.palette.primary.contrastText,
          //   },
          // },
          
          // Estado focus
          '&.Mui-focused': {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.primary.contrastText,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.contrastText,
              borderWidth: 2,
            },
          },
          
          // Estado disabled
          '&.Mui-disabled': {
            backgroundColor: theme.palette.mode === 'dark' 
              ? theme.palette.grey[800] 
              : theme.palette.grey[100],
            color: theme.palette.primary.contrastText,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.grey[600],
            },
          },
          
          // Estado error
          '&.Mui-error': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.error.main,
            },
          },
        },
        
        // Estilos para el InputLabel
        '& .MuiInputLabel-root': {
          color: theme.palette.primary.contrastText,
          
          '&.Mui-focused': {
            color: theme.palette.primary.contrastText,
          },
          
          '&.Mui-error': {
            color: theme.palette.error.main,
          },
          
          '&.Mui-disabled': {
            color: theme.palette.text.disabled,
          },
        },
        
        // Estilos para los MenuItem
        '& .MuiMenuItem-root': {
          color: theme.palette.primary.contrastText,
          backgroundColor: 'transparent',
          
          '&:hover': {
            backgroundColor: theme.palette.primary.hover || theme.palette.action?.hover,
          },
          
          '&.Mui-selected': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            
            '&:hover': {
              backgroundColor: theme.palette.primary.hover || theme.palette.primary.dark,
            },
          },
          
          '&.Mui-disabled': {
            color: theme.palette.primary.contrastText,
            backgroundColor: 'transparent',
          },
          
          // Estilo para el placeholder
          '&[value="0"]': {
            color: theme.palette.primary.contrastText,
            fontStyle: 'italic',
          },
        },
        
        // Estilos para el dropdown paper
        '& .MuiPaper-root': {
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.palette.primary.boxShadow || theme.shadows[3],
          border: `1px solid ${theme.palette.divider}`,
        },
        
        // Estilos para el helper text
        '& .MuiFormHelperText-root': {
          color: theme.palette.text.secondary,
          
          '&.Mui-error': {
            color: theme.palette.error.main,
          },
        },
        
        // Estilos para el icono de dropdown
        '& .MuiSelect-icon': {
          color: theme.palette.text.secondary,
          
          '&.Mui-disabled': {
            color: theme.palette.text.disabled,
          },
        },
        
        ...sx 
      }}
    >
      <FormControl fullWidth={fullWidth} error={error} required={required}>
        <InputLabel sx={{
          color: theme.palette.primary.contrastText
        }}>{label}</InputLabel>

        <Select
          key={name}
          value={value === null ? "" : value}
          onChange={handleChange}
          displayEmpty
          id={id}
          label={label}
          name={name}
          disabled={options.length === 0 || disabled}
          variant={variant != null ? variant : "outlined"}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: theme.palette.background.paper,
                boxShadow: theme.palette.primary.boxShadow || theme.shadows[3],
                border: `1px solid ${theme.palette.divider}`,
                maxHeight: 300,
                '& .MuiMenuItem-root': {
                  color: theme.palette.primary.contrastText,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.hover || theme.palette.action?.hover,
                  },
                  '&.Mui-selected': {
                    backgroundColor: theme.palette.primary.boxShadow,
                    color: theme.palette.primary.contrastText,
                    '&:hover': {
                      backgroundColor: theme.palette.primary.hover || theme.palette.primary.dark,
                    },
                  },
                },
              },
            },
          }}
        >
          {placeholder !== "" && (
            <MenuItem value={0}>
              <em style={{ color: theme.palette.text.secondary }}>
                {placeholder.toUpperCase()}
              </em>
            </MenuItem>
          )}

          {options.map((option) => (
            <MenuItem
              key={option.value as Key}
              value={option.value}
              disabled={option.value === ""}
            >
              {option?.name?.toUpperCase()}
            </MenuItem>
          ))}
        </Select>
        
        {error && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </Box>
  );
};

export default GrhCustomSelect;