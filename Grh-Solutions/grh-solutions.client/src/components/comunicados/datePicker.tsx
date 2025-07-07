import React from "react";
import { Box, SxProps, useTheme } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export type DatePickerMode = "date" | "time" | "datetime";

interface GenericDatePickerProps {
  mode: DatePickerMode;
  label: string;
  value: Dayjs | null;
  onChange: (value: Dayjs | null) => void;
  title?: string;
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning";
  sx?: SxProps;
  fullWidth?: boolean;
}

const GenericDatePicker: React.FC<GenericDatePickerProps> = ({
  mode,
  label,
  value,
  onChange,
  sx,
  fullWidth = false,
}) => {
  const theme = useTheme();
  //   const getIcon = () => {
  //     switch (mode) {
  //       case "date":
  //         return <CalendarTodayIcon />;
  //       case "time":
  //         return <AccessTimeIcon />;
  //       case "datetime":
  //         return <EventIcon />;
  //       default:
  //         return <CalendarTodayIcon />;
  //     }
  //   };

  //   const getTitle = () => {
  //     if (title) return title;
  //     switch (mode) {
  //       case "date":
  //         return "Selector de Fecha";
  //       case "time":
  //         return "Selector de Hora";
  //       case "datetime":
  //         return "Selector de Fecha y Hora";
  //       default:
  //         return "Selector";
  //     }
  //   };

  //   const formatValue = (date: Dayjs | null) => {
  //     if (!date) return "Ninguna selección";

  //     switch (mode) {
  //       case "date":
  //         return date.format("DD/MM/YYYY");
  //       case "time":
  //         return date.format("HH:mm");
  //       case "datetime":
  //         return date.format("DD/MM/YYYY [a las] HH:mm");
  //       default:
  //         return date.format("DD/MM/YYYY");
  //     }
  //   };

  const renderPicker = () => {
    const commonProps = {
      label,
      value,
      onChange,
      sx: { width: "100%", mb: 3 },
      format:
        mode === "date"
          ? "DD/MM/YYYY"
          : mode === "time"
          ? "HH:mm"
          : "DD/MM/YYYY HH:mm",
    };

    switch (mode) {
      case "date":
        return <DatePicker {...commonProps}/>;
      case "time":
        return <TimePicker {...commonProps} />;
      case "datetime":
        return <DateTimePicker {...commonProps} />;
      default:
        return <DatePicker {...commonProps} />;
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <Box
        sx={{
          ...sx,
          p: 3,
          width: fullWidth ? "100%" : undefined,
          "& .MuiInputLabel-root": {
            color: theme.palette.primary.contrastText, // Color constante para el label
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: theme.palette.primary.contrastText, // Color constante para el label cuando está enfocado
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: theme.palette.primary.divider, // Color constante para el borde en estado normal
            },
            "&:hover fieldset": {
              borderColor: theme.palette.primary.dark, // Color constante para el borde al hacer hover
            },
            "&.Mui-focused fieldset": {
              borderColor: theme.palette.primary.hover, // Color constante para el borde cuando está enfocado
            },
          },
        }}
      >
        {renderPicker()}
      </Box>
    </LocalizationProvider>
  );
};

export default GenericDatePicker;
