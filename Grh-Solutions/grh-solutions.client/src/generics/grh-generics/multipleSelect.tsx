import React, { useEffect, useState } from "react";
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
  TextField,
} from "@mui/material";

interface SelectMultipleInputProps {
  label: string;
  name: string;
  options: Array<{ id: number; name: string }>;
  value: number[];
  setFieldValue: (field: string, value: number[]) => void;
  error?: string;
  touched?: boolean;
  sx?: SxProps<Theme>;
  multiline?: boolean;
  maxSelections?: number;
  maxHeight?: string;
  fullWidth?: boolean;
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
  fullWidth,
  multiline = false,
  maxSelections,
  maxHeight,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  
  const filteredOptions = options.filter(option =>
    option.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (event: any) => {
    const {
      target: { value: selectedValues },
    } = event;
    const selectIds = Array.isArray(selectedValues)
      ? selectedValues.map(Number)
      : [];

    if (!maxSelections || selectIds.length <= maxSelections) {
      setFieldValue(name, selectIds);
    }
  };

  const handleDelete = (selectedValue: number) => {
    const newValue = value.filter((val) => val !== selectedValue);
    setFieldValue(name, newValue);
  };

  useEffect(() => {
    if (value) {
      setFieldValue(name, value);
    }
  }, [value, name, setFieldValue]);

  return (
    <Box sx={{ ...sx, position: "relative", width: "100%" }}>
      <FormControl sx={{ width: "100%" }} error={!!error && touched}>
        <InputLabel id={`${name}-label`}>{label}</InputLabel>
        <Select
          labelId={`${name}-label`}
          id={name}
          multiple
          value={value}
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          input={<OutlinedInput label={label} />}
          onChange={handleChange}
          fullWidth={fullWidth}
          renderValue={(selected) => (
            <Box
              sx={{
                display: "flex",
                flexWrap: multiline ? "wrap" : "nowrap",
                gap: 0.5,
                whiteSpace: multiline ? "normal" : "nowrap",
                maxHeight: multiline ? maxHeight || "100px" : "auto",
                overflow: multiline ? "auto" : "visible",
              }}
            >
              {selected.map((selectedValue) => {
                const option = options.find((opt) => opt.id === selectedValue);
                return (
                  <Chip
                    key={selectedValue}
                    label={option ? option.name : selectedValue}
                    onDelete={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDelete(selectedValue)
                    }}
                  />
                );
              })}
            </Box>
          )}
        >
          <Box sx={{ padding: "8px" }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Buscar..."
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Box>
          {filteredOptions.map((option) => (
            <MenuItem
              key={option.id}
              value={option.id}
              disabled={maxSelections ? value.length >= maxSelections : false}
            >
              {option.name}
            </MenuItem>
          ))}
        </Select>
        {error && touched && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    </Box>
  );
};

export default MultipleSelect;
