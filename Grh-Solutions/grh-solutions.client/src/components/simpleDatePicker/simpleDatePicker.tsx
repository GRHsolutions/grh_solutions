import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,
  Chip,
  Alert,
} from "@mui/material";
import { CalendarToday, Clear } from "@mui/icons-material";
import dayjs, { Dayjs } from "dayjs";

interface DatePickerComponentProps {
  label?: string;
  value?: Dayjs | null;
  onChange?: (value: Dayjs | null) => void;
  allowNull?: boolean;
  disabled?: boolean;
}

export const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
  label = "Select Date",
  value = null,
  onChange,
  allowNull = true,
  disabled = false
}) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(value);

  const handleDateChange = (newValue: Dayjs | null) => {
    //setError(null);
    setSelectedDate(newValue);
    onChange?.(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={selectedDate}
        onChange={handleDateChange}
        slotProps={{
          textField: {
            fullWidth: true,
          },
        }}
        disabled={disabled}
      />
    </LocalizationProvider>
  );
};
