import React, { useEffect, useState } from 'react';
import {
  Select,
  MenuItem,
  InputLabel,
  OutlinedInput,
  Box,
  Chip,
  FormControl,
  FormHelperText,
  SxProps,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';

interface Option {
  id: number;
  nombre: string;
}

interface SelectMultipleInputProps {
  label: string;
  name: string;
  options: Option[];
  value: number[];
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  error?: string;
  touched?: boolean;
  sx?: SxProps<Theme>;
  multiline?: boolean;
  maxSelections?: number;
  maxHeight?: string;
  helperText?: string;
  disabled?: boolean;
}

const MultipleSelect: React.FC<SelectMultipleInputProps> = ({
  label,
  name,
  options,
  value,
  setFieldValue,
  error,
  touched,
  sx,
  multiline = false,
  maxSelections,
  maxHeight = '100px',
  helperText,
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    setSelectedCount(value.length);
  }, [value]);

  const handleChange = (event: any) => {
    const {
      target: { value: selectedValues },
    } = event;
    const selectIds = Array.isArray(selectedValues) ? selectedValues.map(Number) : [];

    if (!maxSelections || selectIds.length <= maxSelections) {
      setFieldValue(name, selectIds);
    }
  };

  const handleDelete = (selectedValue: number) => {
    const newValue = value.filter((val) => val !== selectedValue);
    setFieldValue(name, newValue);
  };

  const handleSelectClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!disabled) {
      const isChipClick = (event.target as HTMLElement).closest('.MuiChip-root');
      if (!isChipClick) {
        setOpen(!open);
      }
    }
  };

  return (
    <Box sx={{ width: '100%', display: 'block', ...sx }}>
      <FormControl 
        error={!!error && touched} 
        fullWidth
        disabled={disabled}
        sx={{ 
          width: '100%', 
          display: 'block',
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused': {
              backgroundColor: "transparent",
              color: theme.palette.primary.contrastText,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.light,
                color: theme.palette.primary.contrastText,
                borderWidth: 2,
              },
            },
            '&:hover': {
              backgroundColor: "transparent",
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.light,
                color: theme.palette.primary.contrastText,

              },
            },
          },
          '& .MuiInputLabel-root': {
            color: theme.palette.primary.contrastText,
            '&.Mui-focused': {
              color: theme.palette.primary.contrastText,
            },
          },
        }}
      >
        <InputLabel id={`${name}-label`}>
          {label} {maxSelections && `(${selectedCount}/${maxSelections})`}
        </InputLabel>
        <Box onClick={handleSelectClick} sx={{ width: '100%' }}>
          <Select
            labelId={`${name}-label`}
            id={name}
            multiple
            value={value}
            open={open}
            onClose={() => setOpen(false)}
            input={<OutlinedInput label={`${label} ${maxSelections ? `(${selectedCount}/${maxSelections})` : ''}`} />}
            onChange={handleChange}
            sx={{ width: '100%', display: 'block' }}
            renderValue={(selected) => (
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: multiline ? 'wrap' : 'nowrap',
                  gap: 0.5,
                  whiteSpace: multiline ? 'normal' : 'nowrap',
                  maxHeight: multiline ? maxHeight : 'auto',
                  overflow: multiline ? 'auto' : 'hidden',
                  width: '100%',
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
                  '& .MuiInputBase-input': {
                    '&::-webkit-scrollbar': {
                      width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                      background: theme.palette.primary.light,
                      borderRadius: '4px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: '#888',
                      borderRadius: '4px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                      background: '#555',
                    },
                  },
                  '& .MuiInputBase-inputMultiline': {
                    overflowY: 'auto', // Hace visible la barra de desplazamiento
                  },
                }}
              >
                {selected.map((selectedValue) => {
                  const option = options.find((opt) => opt.id === selectedValue);
                  return option ? (
                    <Chip
                      key={selectedValue}
                      label={option.nombre}
                      onDelete={() => handleDelete(selectedValue)}
                      onMouseDown={(e) => e.stopPropagation()}
                      className="MuiChip-root"
                      sx={{
                        backgroundColor: theme.palette.primary.dark,
                        color: theme.palette.primary.contrastText,
                        '& .MuiChip-deleteIcon': {
                          color: theme.palette.primary.hover,
                          '&:hover': {
                            color: theme.palette.primary.father,
                          },
                        },
                      }}
                    />
                  ) : null;
                })}
              </Box>
            )}
            MenuProps={{
              PaperProps: {
                style: {
                  //width: '100%',
                  //maxWidth: 'none'
                }
              }
            }}
          >
            {options.length === 0 ? (
              <Box sx={{ p: 2, textAlign: 'center', width: '100%' }}>
                <Typography color="text.secondary">No options available</Typography>
              </Box>
            ) : (
              options.map((option) => (
                <MenuItem
                  key={option.id}
                  value={option.id}
                  disabled={maxSelections ? value.length >= maxSelections && !value.includes(option.id) : false}
                  sx={{
                    width: '100%',
                    '&.Mui-selected': {
                      backgroundColor:  theme.palette.primary.divider,
                    },
                    '&.Mui-selected:hover': {
                      backgroundColor: theme.palette.primary.hover,
                    },
                  }}
                >
                  {option.nombre}
                </MenuItem>
              ))
            )}
          </Select>
        </Box>
        {(error && touched) || helperText ? (
          <FormHelperText error={!!error && touched}>
            {(error && touched) ? error : helperText}
          </FormHelperText>
        ) : null}
      </FormControl>
    </Box>
  );
};

export default MultipleSelect;