import React from "react";
import { SxProps, useTheme } from "@mui/material/styles"; 
import { Button } from "@mui/material";

interface GrhButtonProps {
  id?: string;
  name?: string;
  ref?: React.RefObject<HTMLButtonElement | null>;
  value?: string | number;
  label?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  fullWidth?: boolean;
  type?:  "button" | "reset" | "submit" | undefined;
  autoComplete?: string;
  variant?: "principal" | "secondary" | "tertiary" | "use-default";
  sx?: SxProps;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  p?: string | number;
}

const GrhButton: React.FC<GrhButtonProps> = ({
  id,
  name,
  type,
  ref,
  onClick,
  sx = {},
  label,
  startIcon,
  endIcon,
  variant = "use-default",
  p
}) => {
  const theme = useTheme(); // Accede al tema para usarlo en el componente

  const useVariant = (): SxProps => {
    switch (variant) {
      case "principal":
        return {
          ...sx,
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.secondary.contrastText,
          padding: p ?? theme.spacing(1),
          borderRadius: theme.shape.borderRadius,
          "&:hover": {
            backgroundColor: theme.palette.secondary.hover,
          },
        };
      case "secondary":
        return {
          ...sx,
          backgroundColor: "transparent",
          color: theme.palette.secondary.main,
          textDecoration: "outlined",
          padding: p ?? theme.spacing(0.5),
          borderRadius: theme.shape.borderRadius,
          "&:hover": {
            backgroundColor: theme.palette.primary.hover,
          },
        };
      case "tertiary":
        return {
          ...sx,
          border: '2px solid' + theme.palette.secondary.main,
          color: theme.palette.text.primary,
          padding: p ?? theme.spacing(0.5),
          borderRadius: theme.shape.borderRadius,
          "&:hover": {
            backgroundColor: theme.palette.primary.hover,
          },
        };
      case "use-default":
        return {
          ...sx,
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          padding: p ?? theme.spacing(0.5),
          borderRadius: theme.shape.borderRadius,
          "&:hover": {
            backgroundColor: theme.palette.primary.divider,
          },
        };
      default:
        return {...sx};
    }
  };

  return (
    <Button
      id={id}
      name={name}
      type={type}
      onClick={onClick}
      sx={{ 
        ...useVariant()
      }}
      ref={ref}
      startIcon={startIcon}
      endIcon={endIcon}
    >
      {label}
    </Button>
  );
};

export default GrhButton;