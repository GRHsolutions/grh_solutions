import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    FormHelperText,
    SelectChangeEvent,
    styled,
    Box,
  } from "@mui/material";
  import { Key } from "react";
  
  const StyledInputLabel = styled(InputLabel)({
    position: "relative",
    transform: "none",
    marginBottom: "-2px",
    marginLeft: "14px",
    fontSize: "12px",
  });
  
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
    /*onClear,*/ id,
    name,
    sx,
    disabled,
    variant,
  }: CustomSelectProps<T>) => {
    const handleChange = (event: SelectChangeEvent<T>) => {
      onChange(event);
    };
  
    return (
      <Box sx={{ paddingTop: "10px", position: "relative", ...sx }}>
        <FormControl fullWidth error={error} required={required}>
          {variant != null ? (
            <InputLabel>{label}</InputLabel>
          ) : (
            <StyledInputLabel>{label}</StyledInputLabel>
          )}
  
          <Select
            value={value === null ? "" : value}
            onChange={handleChange}
            displayEmpty
            id={id}
            name={name}
            disabled={options.length === 0 || disabled}
            variant={variant != null ? variant : "outlined"}
          >
            {placeholder == "" ? null :          
              <MenuItem value={0}>
                <em>{placeholder.toUpperCase()}</em>
              </MenuItem>
              }
  
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
  