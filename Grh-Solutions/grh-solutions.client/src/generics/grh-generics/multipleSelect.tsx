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
  fullWidth?: boolean;
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
  fullWidth = true,
  multiline = false,
  maxSelections,
  maxHeight = '100px',
  helperText,
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);

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
    <Box sx={{ width: fullWidth ? '100% !important' : 'auto', ...sx }}>
      <FormControl 
        error={!!error && touched} 
        fullWidth={fullWidth}
        disabled={disabled}
      >
        <InputLabel id={`${name}-label`}>
          {label} {maxSelections && `(${selectedCount}/${maxSelections})`}
        </InputLabel>
        <Box onClick={handleSelectClick}>
          <Select
            labelId={`${name}-label`}
            id={name}
            multiple
            value={value}
            open={open}
            onClose={() => setOpen(false)}
            input={<OutlinedInput label={`${label} ${maxSelections ? `(${selectedCount}/${maxSelections})` : ''}`} />}
            onChange={handleChange}
            renderValue={(selected) => (
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: multiline ? 'wrap' : 'nowrap',
                  gap: 0.5,
                  whiteSpace: multiline ? 'normal' : 'nowrap',
                  maxHeight: multiline ? maxHeight : 'auto',
                  overflow: multiline ? 'auto' : 'hidden',
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
                        backgroundColor: 'secondary.main',
                        color: 'white',
                        '& .MuiChip-deleteIcon': {
                          color: 'white',
                          '&:hover': {
                            color: 'error.light',
                          },
                        },
                      }}
                    />
                  ) : null;
                })}
              </Box>
            )}
          >
            {options.length === 0 ? (
              <Box sx={{ p: 2, textAlign: 'center' }}>
                <Typography color="text.secondary">No options available</Typography>
              </Box>
            ) : (
              options.map((option) => (
                <MenuItem
                  key={option.id}
                  value={option.id}
                  disabled={maxSelections ? value.length >= maxSelections && !value.includes(option.id) : false}
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: 'secondary.light',
                    },
                    '&.Mui-selected:hover': {
                      backgroundColor: 'secondary.main',
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